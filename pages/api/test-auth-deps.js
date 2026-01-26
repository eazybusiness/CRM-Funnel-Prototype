export default function handler(req, res) {
  const authInfo = {
    hasNextAuth: true,
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'Not Set',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  };

  // Test bcrypt import
  try {
    const bcrypt = require('bcryptjs');
    authInfo.bcryptLoaded = 'Yes';
  } catch (e) {
    authInfo.bcryptLoaded = 'Error: ' + e.message;
  }

  // Test db import
  try {
    const { query } = require('../../../lib/db');
    authInfo.dbLoaded = 'Yes';
  } catch (e) {
    authInfo.dbLoaded = 'Error: ' + e.message;
  }

  res.status(200).json(authInfo);
}
