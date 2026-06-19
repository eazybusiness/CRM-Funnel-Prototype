-- Insert or update Stoffwechsel E-Book as a course-like product
-- Run this in your Neon/Vercel Postgres SQL editor

INSERT INTO courses (title, description, slug, price, is_active, created_at, updated_at)
VALUES (
  'Stoffwechselkur (E-Book)',
  'E-Book: Reset für Körper und Geist – Die Stoffwechselkur',
  'stoffwechselkur-ebook',
  29.00,
  true,
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Optional: ensure a minimal module/lesson structure if you want it to appear as a course (not required for direct download)
-- INSERT INTO modules (course_id, title, description, sort_order, created_at)
-- VALUES ((SELECT id FROM courses WHERE slug = 'stoffwechselkur-ebook'), 'E-Book', 'Download', 0, NOW())
-- ON CONFLICT DO NOTHING;
