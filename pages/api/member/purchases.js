import { requireAuth } from '../../../lib/auth';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req);

    const purchases = await sql`
      SELECT id, product_name, amount, currency, status, created_at
      FROM purchases
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;

    return res.status(200).json({
      purchases: purchases.rows
    });

  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
