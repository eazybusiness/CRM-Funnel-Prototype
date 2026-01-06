import { requireAuth, getUserContentAccess } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await requireAuth(req);
    const content = await getUserContentAccess(user.id);

    return res.status(200).json(content);

  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
