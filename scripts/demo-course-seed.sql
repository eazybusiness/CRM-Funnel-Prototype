-- Demo seed data for Extra 1 course platform
-- Insert a demo course with modules and lessons

INSERT INTO courses (title, description, slug, price, is_active, created_at, updated_at)
VALUES (
  'Minimalismus Grundlagen',
  'Lerne die Grundlagen des minimalistischen Lebens und schaffe mehr Raum für das Wesentliche.',
  'minimalismus-grundlagen',
  49.00,
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

-- Modules
INSERT INTO modules (course_id, title, description, sort_order, created_at, updated_at)
VALUES
  ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Einführung', 'Grundlagen des Minimalismus', 0, NOW(), NOW()),
  ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Loslassen & Klarheit', 'Mehr Fokus im Alltag', 1, NOW(), NOW()),
  ((SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), 'Umsetzung', 'Schritt-für-Schritt Praxis', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Lessons
INSERT INTO lessons (module_id, title, description, video_url, pdf_url, duration_minutes, is_free, sort_order, created_at, updated_at)
VALUES
  ((SELECT id FROM modules WHERE title = 'Einführung' AND course_id = (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen') LIMIT 1),
    'Was ist Minimalismus?',
    'Eine Einführung in die Philosophie des Minimalismus.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    NULL,
    12,
    true,
    0,
    NOW(),
    NOW()
  ),
  ((SELECT id FROM modules WHERE title = 'Einführung' AND course_id = (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen') LIMIT 1),
    'Dein Warum definieren',
    'Warum möchtest du bewusster leben?',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/courses/minimalismus-grundlagen/worksheet-warum.pdf',
    15,
    false,
    1,
    NOW(),
    NOW()
  ),
  ((SELECT id FROM modules WHERE title = 'Loslassen & Klarheit' AND course_id = (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen') LIMIT 1),
    'Entrümpeln leicht gemacht',
    'Praktische Tipps für den Start.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '/courses/minimalismus-grundlagen/checkliste-entruempeln.pdf',
    18,
    false,
    0,
    NOW(),
    NOW()
  ),
  ((SELECT id FROM modules WHERE title = 'Umsetzung' AND course_id = (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen') LIMIT 1),
    'Routinen etablieren',
    'Neue Gewohnheiten nachhaltig integrieren.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    NULL,
    20,
    false,
    0,
    NOW(),
    NOW()
  )
ON CONFLICT DO NOTHING;

-- Optional: create a demo enrollment for user_id 1
-- INSERT INTO enrollments (user_id, course_id, enrolled_at, is_active)
-- VALUES (1, (SELECT id FROM courses WHERE slug = 'minimalismus-grundlagen'), NOW(), true)
-- ON CONFLICT DO NOTHING;
