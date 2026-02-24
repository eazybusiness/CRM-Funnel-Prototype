-- Add demo content to courses for testing
-- This script adds placeholder video URLs and PDF links to existing courses

-- Update Course 1: "Der Einstieg in ein leichtes Leben" (Videokurs)
-- Assuming course_id = 1

-- First, check if modules exist, if not create them
INSERT INTO modules (course_id, title, description, order_index)
VALUES 
  (1, 'Modul 1: Loslassen beginnen', 'Einführung in die Kunst des Loslassens', 1),
  (1, 'Modul 2: Ballast erkennen', 'Wie du erkennst, was dich belastet', 2),
  (1, 'Modul 3: Leichtigkeit leben', 'Praktische Schritte zu mehr Leichtigkeit', 3)
ON CONFLICT DO NOTHING;

-- Get module IDs (assuming they are 1, 2, 3 if this is first time running)
-- Add lessons with demo YouTube URLs (using unlisted placeholder)

-- Modul 1 Lessons
INSERT INTO lessons (module_id, title, description, order_index, video_url, duration_minutes, resources)
VALUES 
  (1, 'Lektion 1: Warum Loslassen?', 'Die Bedeutung von Loslassen verstehen', 1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 15, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}'),
  (1, 'Lektion 2: Erste Schritte', 'Wie du anfängst loszulassen', 2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 20, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}')
ON CONFLICT DO NOTHING;

-- Modul 2 Lessons
INSERT INTO lessons (module_id, title, description, order_index, video_url, duration_minutes, resources)
VALUES 
  (2, 'Lektion 1: Ballast identifizieren', 'Was belastet dich wirklich?', 1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 18, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}'),
  (2, 'Lektion 2: Prioritäten setzen', 'Was ist dir wichtig?', 2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 22, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}')
ON CONFLICT DO NOTHING;

-- Modul 3 Lessons
INSERT INTO lessons (module_id, title, description, order_index, video_url, duration_minutes, resources)
VALUES 
  (3, 'Lektion 1: Routinen entwickeln', 'Tägliche Praktiken für Leichtigkeit', 1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 25, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}'),
  (3, 'Lektion 2: Dranbleiben', 'Langfristig leicht leben', 2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 20, '{"pdf": "/demo-content/course-1-modul-1-workbook.pdf"}')
ON CONFLICT DO NOTHING;

-- Update Course 2: "Reset für Körper und Geist: Die Stoffwechselkur" (Ebook)
-- Assuming course_id = 2

-- Add module for ebook course
INSERT INTO modules (course_id, title, description, order_index)
VALUES 
  (2, 'Stoffwechselkur Komplett-Guide', 'Vollständiger Leitfaden zur Stoffwechselkur', 1)
ON CONFLICT DO NOTHING;

-- Add lesson with PDF resource (ebook courses might not have videos)
INSERT INTO lessons (module_id, title, description, order_index, video_url, duration_minutes, resources)
VALUES 
  (4, 'Stoffwechselkur Ebook', 'Kompletter Guide als PDF', 1, NULL, NULL, '{"pdf": "/demo-content/course-2-stoffwechselkur-guide.pdf", "type": "ebook"}')
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT 
  c.title as course_title,
  m.title as module_title,
  l.title as lesson_title,
  l.video_url,
  l.resources
FROM courses c
LEFT JOIN modules m ON c.id = m.course_id
LEFT JOIN lessons l ON m.id = l.module_id
WHERE c.id IN (1, 2)
ORDER BY c.id, m.order_index, l.order_index;
