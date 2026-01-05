import { requireAuth } from '../../../lib/auth';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req);

    const purchases = await sql`
      SELECT COUNT(*) as count
      FROM purchases
      WHERE user_id = ${user.id}
      AND status = 'completed'
    `;

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasPurchases: parseInt(purchases.rows[0].count) > 0
      }
    });

  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
