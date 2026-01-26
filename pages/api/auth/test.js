import NextAuth from 'next-auth'

export default function handler(req, res) {
  res.status(200).json({ 
    message: 'NextAuth is loading',
    nextAuthVersion: NextAuth.version || 'unknown',
    method: req.method
  });
}
