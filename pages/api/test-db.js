import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT NOW() as current_time, version() as version`;
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    // Check if users table has the right columns
    let usersTableOK = false;
    try {
      const columns = await sql`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND table_schema = 'public'
        ORDER BY ordinal_position
      `;
      usersTableOK = columns.rows.length > 0;
    } catch (e) {
      usersTableOK = false;
    }
    
    res.status(200).json({
      connected: true,
      time: result.rows[0].current_time,
      version: result.rows[0].version.split(' ')[0],
      tables: tables.rows.map(row => row.table_name),
      usersTableOK,
      message: usersTableOK ? 'Database looks good!' : 'Users table might need to be checked'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      connected: false, 
      error: error.message,
      hint: 'Check if POSTGRES_URL is set correctly in environment variables'
    });
  }
}
