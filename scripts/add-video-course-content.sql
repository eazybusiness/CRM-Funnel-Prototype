-- STEP 0: Run this first to confirm actual column names in live DB
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'lessons' 
ORDER BY ordinal_position;

-- Also check courses and modules while we're at it:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'courses' ORDER BY ordinal_position;
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'modules' ORDER BY ordinal_position;

-- =====================================================================
-- Add Video Course Content - Stoffwechselkur Video Course
-- This script creates the complete video course structure with 3 modules and 11 videos

-- First, let's create the video course if it doesn't exist
INSERT INTO courses (title, description, slug, price, is_published, created_at, updated_at) 
VALUES (
  'Stoffwechselkur Video-Kurs',
  'Umfassender Video-Kurs für deine Stoffwechselkur mit 11 Lektionen in 3 Modulen',
  'stoffwechselkur-video',
  97.00,
  true,
  NOW(),
  NOW()
) 
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  updated_at = NOW()
RETURNING id as video_course_id;

-- Get the course ID
-- Note: In a real deployment, you would use the returned ID from the above query
-- For now, let's assume it's the next available ID or we can look it up

-- Create Module 1: Grundlagen
INSERT INTO modules (course_id, title, description, sort_order, created_at, updated_at) 
SELECT 
  c.id,
  'Modul 1: Grundlagen',
  'Die Grundlagen der Stoffwechselkur verstehen und umsetzen',
  1,
  NOW(),
  NOW()
FROM courses c 
WHERE c.slug = 'stoffwechselkur-video'
ON CONFLICT DO NOTHING
RETURNING id as module1_id;

-- Create Module 2: Umsetzung
INSERT INTO modules (course_id, title, description, sort_order, created_at, updated_at) 
SELECT 
  c.id,
  'Modul 2: Umsetzung',
  'Praktische Umsetzung der Stoffwechselkur im Alltag',
  2,
  NOW(),
  NOW()
FROM courses c 
WHERE c.slug = 'stoffwechselkur-video'
ON CONFLICT DO NOTHING
RETURNING id as module2_id;

-- Create Module 3: Nachhaltigkeit
INSERT INTO modules (course_id, title, description, sort_order, created_at, updated_at) 
SELECT 
  c.id,
  'Modul 3: Nachhaltigkeit',
  'Langfristige Erfolge und Aufrechterhaltung deiner Ergebnisse',
  3,
  NOW(),
  NOW()
FROM courses c 
WHERE c.slug = 'stoffwechselkur-video'
ON CONFLICT DO NOTHING
RETURNING id as module3_id;

-- Add lessons for each module with Vimeo URLs
-- Live DB columns: module_id, title, content, video_url, sort_order, created_at, updated_at

-- Module 1 Lessons (4 videos including the free preview)
INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '1.0 Einführung und Vorschau', 'https://vimeo.com/1201351155', 0, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 1;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '1.1 Was ist die Stoffwechselkur?', 'https://vimeo.com/1198043715/3a4e4cfe9b', 1, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 1;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '1.2 Vorbereitung auf die Kur', 'https://vimeo.com/1200692921', 2, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 1;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '1.3 Die ersten Schritte', 'https://vimeo.com/1200363004', 3, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 1;

-- Module 2 Lessons (3 videos)
INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '2.1 Ernährung während der Kur', 'https://vimeo.com/1199753614', 1, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 2;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '2.2 Bewegung und Aktivität', 'https://vimeo.com/1200703298', 2, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 2;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '2.3 Umgang mit Herausforderungen', 'https://vimeo.com/1200720213', 3, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 2;

-- Module 3 Lessons (4 videos incl. Abschluss)
INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '3.1 Erfolge messen und feiern', 'https://vimeo.com/1199794591', 1, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 3;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '3.2 Nach der Kur - Was nun?', 'https://vimeo.com/1200360445', 2, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 3;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, '3.3 Langfristige Lebensstiländerung', 'https://vimeo.com/1200749962', 3, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 3;

INSERT INTO lessons (module_id, title, video_url, sort_order, created_at, updated_at)
SELECT m.id, 'Abschluss: Dein Weg geht weiter', 'https://vimeo.com/1201347287/f59726c8ef', 4, NOW(), NOW()
FROM modules m JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video' AND m.sort_order = 3;

-- Show the created structure
SELECT 
  c.title as course_title,
  m.title as module_title,
  m.sort_order as module_order,
  l.title as lesson_title,
  l.sort_order as lesson_order,
  l.video_url
FROM courses c
JOIN modules m ON c.id = m.course_id
JOIN lessons l ON m.id = l.module_id
WHERE c.slug = 'stoffwechselkur-video'
ORDER BY m.sort_order, l.sort_order;
