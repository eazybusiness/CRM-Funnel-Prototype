# Database Setup Script - Run this in Neon/Vercel

## 🎯 Next Steps (5 minutes)

### 1. Open Database Query Interface
1. Go to your database provider (Neon/Vercel)
2. Find your database
3. Click on **"Query"** or **"SQL Editor"**

### 2. Run This Complete Setup Script

Copy and paste this entire script into the query editor:

```sql
-- =====================================
-- CRM Funnel Database Setup
-- =====================================

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

-- Insert demo course (for testing)
INSERT INTO courses (title, description, slug, price, is_published) VALUES
('Minimalismus-Grundlagen', 'Lerne die Grundlagen des Minimalismus', 'minimalismus-grundlagen', 49.00, true)
ON CONFLICT (slug) DO NOTHING;

-- Get the demo course ID
DO $$
DECLARE
  course_id INTEGER;
  module_id_1 INTEGER;
  module_id_2 INTEGER;
  module_id_3 INTEGER;
BEGIN
  SELECT id INTO course_id FROM courses WHERE slug = 'minimalismus-grundlagen';
  
  IF course_id IS NOT NULL THEN
    -- Insert demo modules
    INSERT INTO modules (course_id, title, sort_order) VALUES
    (course_id, 'Einführung', 1),
    (course_id, 'Praktische Übungen', 2),
    (course_id, 'Nachhaltigkeit', 3)
    ON CONFLICT DO NOTHING;
    
    -- Get module IDs
    SELECT id INTO module_id_1 FROM modules WHERE course_id = course_id AND title = 'Einführung' LIMIT 1;
    SELECT id INTO module_id_2 FROM modules WHERE course_id = course_id AND title = 'Praktische Übungen' LIMIT 1;
    SELECT id INTO module_id_3 FROM modules WHERE course_id = course_id AND title = 'Nachhaltigkeit' LIMIT 1;
    
    -- Insert demo lessons
    INSERT INTO lessons (module_id, title, content, sort_order) VALUES
    (module_id_1, 'Was ist Minimalismus?', 'Willkommen zum ersten Kurs über Minimalismus. Hier lernst du die Grundlagen.', 1),
    (module_id_1, 'Die Vorteile', 'Minimalismus hat viele Vorteile für dein Leben.', 2),
    (module_id_2, 'Aufräumen Schritt 1', 'Fangen wir mit dem Kleiderschrank an.', 1),
    (module_id_2, 'Digitaler Minimalismus', 'Jetzt räumen wir auch digital auf.', 2),
    (module_id_3, 'Nachhaltig leben', 'Minimalismus und Nachhaltigkeit gehören zusammen.', 1),
    (module_id_3, 'Dein Weg weiter', 'Wie du nach dem Kurs weitermachst.', 2)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '==========================================';
  RAISE NOTICE 'Database setup completed successfully!';
  RAISE NOTICE 'Tables created: users, courses, modules, lessons, enrollments, user_progress';
  RAISE NOTICE 'Demo course added: Minimalismus-Grundlagen';
  RAISE NOTICE '==========================================';
END $$;
```

### 3. Execute the Script
- Click **"Run"** or **"Execute"**
- You should see a success message

### 4. Test Registration
1. Wait 2 minutes for deployment to update
2. Go to: https://crm-funnel-prototype.vercel.app/register
3. Create a test account
4. Should work now! ✅

---

## 🔍 Verify Everything Works

### Check Tables Were Created:
Run this query to verify:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see:
- courses
- enrollments
- lessons
- modules
- user_progress
- users

### Check Demo Data:
```sql
SELECT COUNT(*) as course_count FROM courses;
SELECT COUNT(*) as user_count FROM users;
```

---

## ✅ All Done!

Your database is now ready with:
- ✅ All tables created
- ✅ Demo course loaded
- ✅ Registration should work
- ✅ Login should work
- ✅ Member area should work

---

## 🚨 If Something Goes Wrong

1. **Check .env file** has the correct database URL
2. **Wait 2-3 minutes** after adding env vars
3. **Check for error messages** in the query results
4. **Try redeploying** in Vercel if needed

---

**That's it! Your CRM Funnel now has a working database!** 🎉
