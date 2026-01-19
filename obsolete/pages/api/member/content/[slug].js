import { requireAuth, checkContentAccess } from '../../../../lib/auth';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req);
    const { slug } = req.query;

    const accessCheck = await checkContentAccess(user.id, slug);

    if (!accessCheck.hasAccess) {
      return res.status(403).json({ 
        error: 'Access denied',
        reason: accessCheck.reason 
      });
    }

    const content = await sql`
      SELECT id, slug, title, description, content_type, content_data
      FROM content_items
      WHERE slug = ${slug}
    `;

    if (!content.rows[0]) {
      return res.status(404).json({ error: 'Content not found' });
    }

    return res.status(200).json({
      ...content.rows[0],
      accessType: accessCheck.accessType
    });

  } catch (error) {
    console.error('Content access error:', error);
    return res.status(401).json({ error: error.message });
  }
}
