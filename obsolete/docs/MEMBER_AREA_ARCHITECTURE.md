# Member Area Architecture - Password-Protected Content Access

## Overview

Passwortgeschützter Bereich für gekaufte Kurse und Inhalte mit automatischer Zugriffskontrolle basierend auf PayPal-Zahlungsstatus.

---

## Access Control Logic

```
User Login
    ↓
Check Email in DB
    ↓
Has Purchase? → Query purchases table
    ↓
├─ YES (status: 'completed') → Access to purchased content
├─ NO → Access only to freebies
└─ PENDING → Show "Payment pending" message
```

---

## Database Schema Extensions

### New Table: `users`
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_users_reset_token ON users(reset_token);
```

### Update Table: `purchases`
```sql
-- Add user_id reference
ALTER TABLE purchases ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Add content access fields
ALTER TABLE purchases ADD COLUMN content_access JSONB DEFAULT '[]';
-- Example: ["course_minimalismus", "course_bewusstsein", "product_starter_kit"]

CREATE INDEX idx_purchases_user_id ON purchases(user_id);
```

### New Table: `content_items`
```sql
CREATE TABLE content_items (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL, -- e.g., "course_minimalismus"
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type VARCHAR(50) NOT NULL, -- 'course', 'product', 'freebie'
  price DECIMAL(10,2),
  access_level VARCHAR(50) NOT NULL, -- 'free', 'paid'
  content_data JSONB, -- Course modules, product files, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_content_items_slug ON content_items(slug);
CREATE INDEX idx_content_items_access_level ON content_items(access_level);
```

### New Table: `user_content_access`
```sql
CREATE TABLE user_content_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content_item_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP, -- NULL for lifetime access
  UNIQUE(user_id, content_item_id)
);

CREATE INDEX idx_user_content_access_user_id ON user_content_access(user_id);
CREATE INDEX idx_user_content_access_content_item_id ON user_content_access(content_item_id);
```

---

## Authentication Flow

### 1. Registration (After Purchase)
```
PayPal Payment Completed
    ↓
POST /api/payment/capture-order
    ↓
Check if user exists (by email)
    ↓
├─ NO → Create user account
│       ├─ Generate random password
│       ├─ Hash password (bcrypt)
│       ├─ Send "Account Created" email with login link
│       └─ Insert into users table
│
└─ YES → Link purchase to existing user
    ↓
Grant content access
    ├─ Insert into user_content_access
    └─ Send "New Content Available" email
```

### 2. Login Flow
```
User visits /login
    ↓
Enter email + password
    ↓
POST /api/auth/login
    ↓
Verify credentials (bcrypt.compare)
    ↓
├─ VALID → Create session
│          ├─ Generate JWT token
│          ├─ Set httpOnly cookie
│          └─ Redirect to /member/dashboard
│
└─ INVALID → Show error message
```

### 3. Password Reset Flow
```
User clicks "Forgot Password"
    ↓
Enter email
    ↓
POST /api/auth/request-reset
    ↓
Generate reset token (crypto.randomBytes)
    ↓
Save token + expiry in DB (valid 1 hour)
    ↓
Send reset email with link
    ↓
User clicks link → /reset-password?token=xyz
    ↓
Enter new password
    ↓
POST /api/auth/reset-password
    ↓
Verify token + expiry
    ↓
Update password hash
    ↓
Redirect to /login
```

---

## API Routes

### Authentication

#### `POST /api/auth/register`
**Purpose:** Manual registration (optional, mainly auto-created after purchase)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "Max Mustermann"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Account created. Please check your email to verify.",
  "user_id": 123
}
```

---

#### `POST /api/auth/login`
**Purpose:** User login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 123,
    "email": "user@example.com",
    "name": "Max Mustermann"
  }
}
```

**Sets Cookie:** `auth_token` (httpOnly, secure, sameSite)

---

#### `POST /api/auth/logout`
**Purpose:** User logout

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Clears Cookie:** `auth_token`

---

#### `GET /api/auth/me`
**Purpose:** Get current user info (requires auth)

**Response:**
```json
{
  "user": {
    "id": 123,
    "email": "user@example.com",
    "name": "Max Mustermann",
    "has_purchases": true
  }
}
```

---

#### `POST /api/auth/request-reset`
**Purpose:** Request password reset

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reset email sent if account exists"
}
```

---

#### `POST /api/auth/reset-password`
**Purpose:** Reset password with token

**Request:**
```json
{
  "token": "reset_token_xyz",
  "new_password": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

### Content Access

#### `GET /api/member/content`
**Purpose:** Get all content user has access to (requires auth)

**Response:**
```json
{
  "free_content": [
    {
      "id": 1,
      "slug": "freebie_guide",
      "title": "Minimalismus Starter Guide",
      "type": "freebie"
    }
  ],
  "paid_content": [
    {
      "id": 2,
      "slug": "course_minimalismus",
      "title": "Kurs: Minimalismus Basics",
      "type": "course",
      "purchased_at": "2024-01-05T12:00:00Z"
    }
  ]
}
```

---

#### `GET /api/member/content/[slug]`
**Purpose:** Get specific content item (requires auth + access)

**Response:**
```json
{
  "id": 2,
  "slug": "course_minimalismus",
  "title": "Kurs: Minimalismus Basics",
  "description": "Lerne die Grundlagen des Minimalismus",
  "modules": [
    {
      "id": 1,
      "title": "Modul 1: Einführung",
      "lessons": [
        {
          "id": 1,
          "title": "Was ist Minimalismus?",
          "video_url": "https://...",
          "duration": "15:30"
        }
      ]
    }
  ]
}
```

---

#### `POST /api/member/check-access`
**Purpose:** Check if user has access to specific content

**Request:**
```json
{
  "content_slug": "course_minimalismus"
}
```

**Response:**
```json
{
  "has_access": true,
  "access_type": "paid",
  "granted_at": "2024-01-05T12:00:00Z"
}
```

---

## Frontend Pages

### Public Pages (No Auth Required)

#### `/login`
- Email + Password form
- "Forgot Password?" link
- "Don't have an account? Purchase a course" link

#### `/reset-password?token=xyz`
- New password form
- Token validation

---

### Protected Pages (Auth Required)

#### `/member/dashboard`
- Welcome message
- List of purchased content
- List of free content
- Account settings link

#### `/member/content/[slug]`
- Content viewer (course modules, product files, etc.)
- Access control: Check `user_content_access` table
- If no access: Show "Purchase required" message

#### `/member/account`
- User profile
- Change password
- Purchase history
- Logout button

---

## Middleware: `lib/auth.js`

```javascript
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export async function requireAuth(req) {
  const token = req.cookies.auth_token;
  
  if (!token) {
    throw new Error('Not authenticated');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function checkContentAccess(userId, contentSlug) {
  // Check if content is free
  const content = await sql`
    SELECT * FROM content_items WHERE slug = ${contentSlug}
  `;
  
  if (content.rows[0]?.access_level === 'free') {
    return true;
  }
  
  // Check if user has purchased access
  const access = await sql`
    SELECT * FROM user_content_access
    WHERE user_id = ${userId}
    AND content_item_id = (
      SELECT id FROM content_items WHERE slug = ${contentSlug}
    )
    AND (expires_at IS NULL OR expires_at > NOW())
  `;
  
  return access.rows.length > 0;
}
```

---

## Security Considerations

### 1. Password Security
- **Hashing:** bcrypt with salt rounds = 10
- **Minimum Requirements:** 8 characters, 1 uppercase, 1 number
- **Storage:** Never store plain text passwords

### 2. JWT Tokens
- **Secret:** Strong random string in environment variable
- **Expiry:** 7 days (configurable)
- **Storage:** httpOnly cookies (not localStorage)
- **Refresh:** Optional refresh token mechanism

### 3. Session Management
- **Cookie Flags:** httpOnly, secure (HTTPS only), sameSite=strict
- **Token Rotation:** New token on sensitive actions
- **Logout:** Clear cookie + blacklist token (optional)

### 4. DSGVO Compliance
- **Data Minimization:** Only store necessary user data
- **Right to Access:** API endpoint to export user data
- **Right to Deletion:** API endpoint to delete account
- **Consent:** Checkbox during registration

---

## Content Access Matrix

| User Status | Free Content | Paid Content (Courses) | Paid Content (Products) |
|-------------|--------------|------------------------|-------------------------|
| **Not Logged In** | ❌ No | ❌ No | ❌ No |
| **Logged In (No Purchase)** | ✅ Yes | ❌ No | ❌ No |
| **Logged In (Purchased Course)** | ✅ Yes | ✅ Yes (specific course) | ❌ No |
| **Logged In (Purchased Product)** | ✅ Yes | ❌ No | ✅ Yes (specific product) |
| **Logged In (Purchased Both)** | ✅ Yes | ✅ Yes | ✅ Yes |

---

## PayPal Integration Updates

### Updated: `/api/payment/capture-order`

```javascript
export default async function handler(req, res) {
  // ... existing PayPal capture logic ...
  
  // After successful payment:
  const { email, name } = payerInfo;
  
  // 1. Check if user exists
  let user = await sql`SELECT * FROM users WHERE email = ${email}`;
  
  if (user.rows.length === 0) {
    // 2. Create user account
    const tempPassword = generateRandomPassword();
    const passwordHash = await bcrypt.hash(tempPassword, 10);
    
    user = await sql`
      INSERT INTO users (email, name, password_hash, email_verified)
      VALUES (${email}, ${name}, ${passwordHash}, true)
      RETURNING *
    `;
    
    // 3. Send welcome email with login credentials
    await sendWelcomeEmail(email, tempPassword);
  }
  
  // 4. Create purchase record
  const purchase = await sql`
    INSERT INTO purchases (user_id, paypal_order_id, product_name, amount, status)
    VALUES (${user.rows[0].id}, ${orderId}, ${productName}, ${amount}, 'completed')
    RETURNING *
  `;
  
  // 5. Grant content access
  const contentItem = await sql`
    SELECT id FROM content_items WHERE slug = ${productSlug}
  `;
  
  await sql`
    INSERT INTO user_content_access (user_id, content_item_id, purchase_id)
    VALUES (${user.rows[0].id}, ${contentItem.rows[0].id}, ${purchase.rows[0].id})
  `;
  
  // 6. Send "Content Available" email
  await sendContentAccessEmail(email, productName);
  
  return res.status(200).json({ success: true });
}
```

---

## Email Templates

### 1. Account Created Email
**Subject:** Dein Zugang zu [Product Name] ist bereit!

```
Hallo [Name],

vielen Dank für deinen Kauf von [Product Name]!

Dein Account wurde automatisch erstellt:
E-Mail: [email]
Temporäres Passwort: [temp_password]

Bitte ändere dein Passwort nach dem ersten Login:
→ [APP_URL]/login

Deine Inhalte warten auf dich:
→ [APP_URL]/member/dashboard

Bei Fragen stehen wir dir gerne zur Verfügung.

Viel Erfolg!
Dein Team
```

### 2. Password Reset Email
**Subject:** Passwort zurücksetzen

```
Hallo [Name],

du hast eine Passwort-Zurücksetzung angefordert.

Klicke auf diesen Link (gültig für 1 Stunde):
→ [APP_URL]/reset-password?token=[token]

Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.

Dein Team
```

---

## Testing Checklist

### Authentication Tests
- [ ] Register new user
- [ ] Login with correct credentials
- [ ] Login with wrong credentials
- [ ] Logout
- [ ] Request password reset
- [ ] Reset password with valid token
- [ ] Reset password with expired token

### Access Control Tests
- [ ] Access free content (logged in)
- [ ] Access free content (not logged in) → Redirect to login
- [ ] Access paid content (no purchase) → Show "Purchase required"
- [ ] Access paid content (with purchase) → Show content
- [ ] Access expired content (if applicable)

### Purchase Flow Tests
- [ ] Complete PayPal payment
- [ ] Verify user account created
- [ ] Verify content access granted
- [ ] Verify welcome email sent
- [ ] Login with auto-generated password
- [ ] Access purchased content

---

## Environment Variables

```bash
# JWT
JWT_SECRET="your_very_long_random_secret_key_here"
JWT_EXPIRES_IN="7d"

# Password Reset
RESET_TOKEN_EXPIRES_HOURS=1

# Email (for sending credentials)
EMAIL_FROM="noreply@yourdomain.com"
```

---

## Migration Script

```sql
-- Run this to add member area tables

-- 1. Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP
);

-- 2. Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type VARCHAR(50) NOT NULL,
  price DECIMAL(10,2),
  access_level VARCHAR(50) NOT NULL,
  content_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create user_content_access table
CREATE TABLE IF NOT EXISTS user_content_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content_item_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  UNIQUE(user_id, content_item_id)
);

-- 4. Update purchases table
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);

-- 5. Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_content_items_slug ON content_items(slug);
CREATE INDEX IF NOT EXISTS idx_user_content_access_user_id ON user_content_access(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- 6. Insert sample free content
INSERT INTO content_items (slug, title, description, content_type, access_level, price)
VALUES 
  ('freebie_guide', 'Minimalismus Starter Guide', 'Kostenloser Einstiegsguide', 'freebie', 'free', 0.00)
ON CONFLICT (slug) DO NOTHING;
```

---

## Cost Estimate

**Additional Development Time:**
- Database schema + migrations: 1 hour
- Authentication API routes: 3 hours
- Protected pages (login, dashboard, content viewer): 3 hours
- Middleware + access control: 2 hours
- Email templates: 1 hour
- Testing: 2 hours

**Total:** 12 hours × 33€/hour = **396€**

**Combined with base project:** 495€ + 396€ = **891€**

---

## Next Steps

1. Create database migration script
2. Implement authentication API routes
3. Create login/register pages
4. Build member dashboard
5. Create content viewer pages
6. Test complete flow
7. Document for client
