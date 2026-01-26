# Vercel Postgres Database Setup - Complete Guide

## 🎯 Current Status
The code is ready for a database, but the database itself needs to be created in Vercel.

---

## ⚡ Step-by-Step Setup (10 minutes)

### 1. Go to Vercel Storage
1. Open: https://vercel.com/
2. Select your project: `CRM-Funnel-Prototype`
3. In the project menu, click **"Storage"**
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Click **"Continue"**

### 2. Configure Database
- **Database Name:** `crm-funnel-db` (or any name you prefer)
- **Region:** Choose the closest to your users (e.g., Frankfurt)
- Click **"Create Database"**

### 3. Get Connection Details
After creation, you'll see:
- **Database URL** (this is your password/connection string)
- **.env.local** button - click this to copy the environment variables

### 4. Add Environment Variables to Your Project
1. In your project, go to **"Settings"** → **"Environment Variables"**
2. Add these variables (you got them from step 3):

```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
```

3. Click **"Save"**

### 5. Run Database Setup Script
1. Go back to **Storage** → Your Database
2. Click **"Query"** (tab at the top)
3. Copy and paste this entire script:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  video_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
  paypal_payment_id VARCHAR(255),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);
```

4. Click **"Execute"**

### 6. Add Demo Data (Optional)
Same Query tab, paste and run:

```sql
-- Insert demo course
INSERT INTO courses (title, description, slug, price, is_published) VALUES
('Minimalismus-Grundlagen', 'Lerne die Grundlagen des Minimalismus', 'minimalismus-grundlagen', 49.00, true)
ON CONFLICT (slug) DO NOTHING;

-- Get course ID
-- (You'll see it in the results)

-- Insert demo modules
INSERT INTO modules (course_id, title, sort_order) VALUES
(1, 'Einführung', 1),
(1, 'Praktische Übungen', 2),
(1, 'Nachhaltigkeit', 3)
ON CONFLICT DO NOTHING;

-- Insert demo lessons
INSERT INTO lessons (module_id, title, content, sort_order) VALUES
(1, 'Was ist Minimalismus?', 'Willkommen zum ersten Kurs...', 1),
(1, 'Die Vorteile', 'Minimalismus hat viele Vorteile...', 2),
(2, 'Aufräumen Schritt 1', 'Fangen wir mit dem Kleiderschrank an...', 1),
(2, 'Digitaler Minimalismus', 'Jetzt räumen wir auch digital auf...', 2),
(3, 'Nachhaltig leben', 'Minimalismus und Nachhaltigkeit...', 1),
(3, 'Dein Weg weiter', 'Wie du weitermachst...', 2)
ON CONFLICT DO NOTHING;
```

---

## 🔐 Remote Connection (Optional)

If you want to connect with a database tool:

### Connection Details:
- **Host:** In your Vercel database dashboard
- **Database:** Same as database name
- **User:** In connection string
- **Password:** In connection string
- **Port:** 5432
- **SSL Mode:** require

### Using TablePlus/PGAdmin:
1. Copy the **POSTGRES_URL_NON_POOLING** from Vercel
2. Parse it:
   - Format: `postgres://user:password@host:port/database`
3. Use these details in your database tool

---

## ✅ Verification

After setup, test registration:
1. Go to: https://crm-funnel-prototype.vercel.app/register
2. Create a test account
3. If successful → Database is working!

---

## 🚨 Troubleshooting

### "Database not found"
- Make sure you've selected the right project in Vercel
- Storage tab should show your database

### "Connection refused"
- Check environment variables are added to project
- Wait 2-3 minutes after adding them

### "Table does not exist"
- Make sure you ran the setup script in Query tab
- Check for any error messages

---

## 📞 Need Help?

If you're stuck:
1. Take a screenshot of your Storage tab
2. Check if you see a database listed
3. Verify environment variables are in project settings

The database should appear under Storage once created!
