export default function handler(req, res) {
  const envVars = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'NOT SET',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET'
  };

  res.status(200).json(envVars);
}
