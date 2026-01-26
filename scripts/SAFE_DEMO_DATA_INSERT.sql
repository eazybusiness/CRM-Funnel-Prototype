-- Safe Demo Data Insertion - Handles existing data

-- First, let's check what's already in the courses table
SELECT * FROM courses;

-- Clear any existing demo data to avoid conflicts
DELETE FROM lessons WHERE module_id IN (
  SELECT id FROM modules WHERE course_id IN (
    SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'
  )
);

DELETE FROM modules WHERE course_id IN (
  SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'
);

DELETE FROM courses WHERE slug = 'minimalismus-grundlagen';

-- Now insert fresh demo data
INSERT INTO courses (title, description, slug, price, is_published) VALUES
('Minimalismus-Grundlagen', 'Lerne die Grundlagen des Minimalismus', 'minimalismus-grundlagen', 49.00, true)
RETURNING id;

-- Insert modules with the actual course ID
INSERT INTO modules (course_id, title, sort_order) 
SELECT id, title, sort_order FROM (
  VALUES 
    ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Einführung', 1),
    ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Praktische Übungen', 2),
    ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Nachhaltigkeit', 3)
) AS t(course_id, title, sort_order)
RETURNING id, title;

-- Insert lessons
INSERT INTO lessons (module_id, title, content, sort_order)
SELECT m.id, l.title, l.content, l.sort_order
FROM modules m
CROSS JOIN (VALUES
  ('Einführung', 'Was ist Minimalismus?', 'Willkommen zum ersten Kurs über Minimalismus. Hier lernst du die Grundlagen.', 1),
  ('Einführung', 'Die Vorteile', 'Minimalismus hat viele Vorteile für dein Leben.', 2),
  ('Praktische Übungen', 'Aufräumen Schritt 1', 'Fangen wir mit dem Kleiderschrank an.', 1),
  ('Praktische Übungen', 'Digitaler Minimalismus', 'Jetzt räumen wir auch digital auf.', 2),
  ('Nachhaltigkeit', 'Nachhaltig leben', 'Minimalismus und Nachhaltigkeit gehören zusammen.', 1),
  ('Nachhaltigkeit', 'Dein Weg weiter', 'Wie du nach dem Kurs weitermachst.', 2)
) AS l(module_title, title, content, sort_order)
WHERE m.title = l.module_title
AND m.course_id = (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen')
ORDER BY m.sort_order, l.sort_order;

-- Verify the data was inserted
SELECT 
  c.title as course_title,
  m.title as module_title,
  l.title as lesson_title,
  l.sort_order
FROM courses c
JOIN modules m ON c.id = m.course_id
JOIN lessons l ON m.id = l.module_id
WHERE c.slug = 'minimalismus-grundlagen'
ORDER BY m.sort_order, l.sort_order;
