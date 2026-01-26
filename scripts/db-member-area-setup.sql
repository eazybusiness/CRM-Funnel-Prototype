-- Member Area Database Setup
-- Run this script in Vercel Postgres SQL Editor

-- 1. Create users table
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

-- 2. Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content_type VARCHAR(50) NOT NULL, -- 'course', 'product', 'freebie'
  price DECIMAL(10,2),
  access_level VARCHAR(50) NOT NULL, -- 'free', 'paid'
  content_data JSONB, -- Course modules, product files, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create user_content_access table
CREATE TABLE IF NOT EXISTS user_content_access (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content_item_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE SET NULL,
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP, -- NULL for lifetime access
  UNIQUE(user_id, content_item_id)
);

-- 4. Update purchases table to link to users
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
CREATE INDEX IF NOT EXISTS idx_content_items_slug ON content_items(slug);
CREATE INDEX IF NOT EXISTS idx_content_items_access_level ON content_items(access_level);
CREATE INDEX IF NOT EXISTS idx_user_content_access_user_id ON user_content_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_content_access_content_item_id ON user_content_access(content_item_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);

-- 6. Insert sample content items
INSERT INTO content_items (slug, title, description, content_type, access_level, price, content_data)
VALUES 
  (
    'freebie_minimalismus_guide',
    'Minimalismus Starter Guide',
    'Kostenloser Einstiegsguide in die Welt des Minimalismus',
    'freebie',
    'free',
    0.00,
    '{"type": "pdf", "url": "/downloads/minimalismus-guide.pdf", "pages": 15}'
  ),
  (
    'course_minimalismus_basics',
    'Kurs: Minimalismus Basics',
    'Lerne die Grundlagen des bewussten Minimalismus in 6 Wochen',
    'course',
    'paid',
    49.00,
    '{
      "modules": [
        {
          "id": 1,
          "title": "Modul 1: Einführung in den Minimalismus",
          "lessons": [
            {"id": 1, "title": "Was ist Minimalismus?", "duration": "15:30", "video_url": ""},
            {"id": 2, "title": "Warum Minimalismus?", "duration": "12:45", "video_url": ""}
          ]
        },
        {
          "id": 2,
          "title": "Modul 2: Ausmisten & Loslassen",
          "lessons": [
            {"id": 3, "title": "Die KonMari-Methode", "duration": "18:20", "video_url": ""},
            {"id": 4, "title": "Emotionale Bindungen lösen", "duration": "14:15", "video_url": ""}
          ]
        }
      ]
    }'
  ),
  (
    'course_bewusstsein',
    'Kurs: Bewusster Konsum',
    'Entwickle ein nachhaltiges Konsumverhalten',
    'course',
    'paid',
    59.00,
    '{
      "modules": [
        {
          "id": 1,
          "title": "Modul 1: Konsumverhalten verstehen",
          "lessons": [
            {"id": 1, "title": "Psychologie des Kaufens", "duration": "16:40", "video_url": ""},
            {"id": 2, "title": "Bedürfnisse vs. Wünsche", "duration": "13:25", "video_url": ""}
          ]
        }
      ]
    }'
  ),
  (
    'product_starter_kit',
    'Minimalismus Starter Kit',
    'Komplettes Set für deinen Start in den Minimalismus',
    'product',
    'paid',
    29.00,
    '{
      "items": [
        {"name": "Checkliste: 30-Tage-Challenge", "type": "pdf", "url": ""},
        {"name": "Workbook: Meine Werte", "type": "pdf", "url": ""},
        {"name": "Template: Capsule Wardrobe", "type": "pdf", "url": ""}
      ]
    }'
  )
ON CONFLICT (slug) DO NOTHING;

-- 7. Verification query (run after setup to check)
-- SELECT 'users' as table_name, COUNT(*) as count FROM users
-- UNION ALL
-- SELECT 'content_items', COUNT(*) FROM content_items
-- UNION ALL
-- SELECT 'user_content_access', COUNT(*) FROM user_content_access
-- UNION ALL
-- SELECT 'purchases', COUNT(*) FROM purchases;
