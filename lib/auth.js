import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function generateRandomPassword(length = 12) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function getUserById(userId) {
  const result = await sql`
    SELECT id, email, name, created_at, last_login, email_verified
    FROM users
    WHERE id = ${userId}
  `;
  return result.rows[0] || null;
}

export async function getUserByEmail(email) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  return result.rows[0] || null;
}

export async function createUser(email, password, name = null) {
  const passwordHash = await hashPassword(password);
  const result = await sql`
    INSERT INTO users (email, password_hash, name, email_verified)
    VALUES (${email}, ${passwordHash}, ${name}, true)
    RETURNING id, email, name, created_at
  `;
  return result.rows[0];
}

export async function requireAuth(req) {
  const token = req.cookies?.auth_token;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    throw new Error('Invalid token');
  }
  
  const user = await getUserById(decoded.userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}

export async function checkContentAccess(userId, contentSlug) {
  const content = await sql`
    SELECT * FROM content_items WHERE slug = ${contentSlug}
  `;
  
  if (!content.rows[0]) {
    return { hasAccess: false, reason: 'Content not found' };
  }
  
  if (content.rows[0].access_level === 'free') {
    return { hasAccess: true, accessType: 'free' };
  }
  
  const access = await sql`
    SELECT uca.*, ci.title, ci.content_type
    FROM user_content_access uca
    JOIN content_items ci ON uca.content_item_id = ci.id
    WHERE uca.user_id = ${userId}
    AND ci.slug = ${contentSlug}
    AND (uca.expires_at IS NULL OR uca.expires_at > NOW())
  `;
  
  if (access.rows.length > 0) {
    return { 
      hasAccess: true, 
      accessType: 'paid',
      grantedAt: access.rows[0].granted_at
    };
  }
  
  return { hasAccess: false, reason: 'Purchase required' };
}

export async function getUserContentAccess(userId) {
  const freeContent = await sql`
    SELECT id, slug, title, description, content_type
    FROM content_items
    WHERE access_level = 'free'
    ORDER BY created_at DESC
  `;
  
  const paidContent = await sql`
    SELECT ci.id, ci.slug, ci.title, ci.description, ci.content_type, 
           uca.granted_at, uca.expires_at
    FROM content_items ci
    JOIN user_content_access uca ON ci.id = uca.content_item_id
    WHERE uca.user_id = ${userId}
    AND (uca.expires_at IS NULL OR uca.expires_at > NOW())
    ORDER BY uca.granted_at DESC
  `;
  
  return {
    freeContent: freeContent.rows,
    paidContent: paidContent.rows
  };
}

export async function grantContentAccess(userId, contentSlug, purchaseId = null) {
  const content = await sql`
    SELECT id FROM content_items WHERE slug = ${contentSlug}
  `;
  
  if (!content.rows[0]) {
    throw new Error('Content not found');
  }
  
  const result = await sql`
    INSERT INTO user_content_access (user_id, content_item_id, purchase_id)
    VALUES (${userId}, ${content.rows[0].id}, ${purchaseId})
    ON CONFLICT (user_id, content_item_id) DO NOTHING
    RETURNING *
  `;
  
  return result.rows[0];
}

export async function updateLastLogin(userId) {
  await sql`
    UPDATE users
    SET last_login = NOW()
    WHERE id = ${userId}
  `;
}

export async function saveResetToken(email, token) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  
  await sql`
    UPDATE users
    SET reset_token = ${token},
        reset_token_expires = ${expiresAt.toISOString()}
    WHERE email = ${email}
  `;
}

export async function verifyResetToken(token) {
  const result = await sql`
    SELECT id, email, reset_token_expires
    FROM users
    WHERE reset_token = ${token}
    AND reset_token_expires > NOW()
  `;
  
  return result.rows[0] || null;
}

export async function resetPassword(userId, newPassword) {
  const passwordHash = await hashPassword(newPassword);
  
  await sql`
    UPDATE users
    SET password_hash = ${passwordHash},
        reset_token = NULL,
        reset_token_expires = NULL
    WHERE id = ${userId}
  `;
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', 'auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
}
