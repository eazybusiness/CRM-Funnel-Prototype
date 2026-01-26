# Database Connection Troubleshooting

## 🚨 Registration Still Not Working

Let's verify the database connection step by step.

---

## 1. Check Environment Variables

Make sure these are in your Vercel project settings:

1. Go to: https://vercel.com/
2. Your project → **Settings** → **Environment Variables**
3. You should have:
   ```
   POSTGRES_URL=postgres://[user]:[pass]@[host]/[dbname]
   POSTGRES_PRISMA_URL=postgres://[user]:[pass]@[host]/[dbname]?pgbouncer=true
   POSTGRES_URL_NON_POOLING=postgres://[user]:[pass]@[host]/[dbname]
   ```

4. **Important:** Click the gear icon → "Edit Environments" → Make sure they're set to **Production**, **Preview**, **Development**

---

## 2. Test Database Connection

Create a test file to verify connection:

Create `/pages/api/test-db.js`:

```javascript
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
    
    res.status(200).json({
      connected: true,
      time: result.rows[0].current_time,
      version: result.rows[0].version,
      tables: tables.rows.map(row => row.table_name)
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      connected: false, 
      error: error.message 
    });
  }
}
```

Then visit: `https://crm-funnel-prototype.vercel.app/api/test-db`

---

## 3. Check Vercel Logs

1. Vercel Dashboard → Your project → **Functions** tab
2. Find `/api/auth/register` in the logs
3. Look for error messages

---

## 4. Common Issues & Solutions

### Issue: "Database not found"
**Solution:** Make sure you've added the database to the correct project

### Issue: "Connection refused"
**Solution:** 
- Check environment variables are in Production
- Wait 2-3 minutes after adding them
- Redeploy: Vercel → Deployments → Redeploy

### Issue: "Table does not exist"
**Solution:** Run the table creation script again

### Issue: "Permission denied"
**Solution:** Check the database URL has correct username/password

---

## 5. Quick Fix - Redeploy

After adding environment variables:

1. Go to Vercel → Your project → **Deployments**
2. Click the three dots on latest deployment
3. Click **Redeploy**

This forces Vercel to use the new environment variables.

---

## 6. Alternative: Check .env.local

If you're testing locally, make sure `.env.local` has:

```env
POSTGRES_URL=your_actual_database_url_here
POSTGRES_PRISMA_URL=your_actual_database_url_here?pgbouncer=true
POSTGRES_URL_NON_POOLING=your_actual_database_url_here
```

---

## 📋 Debug Steps

1. ✅ Database created in Vercel/Neon
2. ✅ Tables created with SQL script
3. ✅ Environment variables added to project
4. ✅ Environment variables set to Production/Preview/Development
5. ✅ Project redeployed
6. ✅ Test `/api/test-db` endpoint
7. ✅ Check Vercel function logs

---

## 🎯 What to Do Now

1. First, create the test API file above
2. Visit `/api/test-db` to see if database connects
3. If it connects, the issue is in registration code
4. If it doesn't connect, the issue is environment variables

Let me know what `/api/test-db` returns!
