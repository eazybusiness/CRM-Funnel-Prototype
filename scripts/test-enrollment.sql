-- Give test access to Stoffwechselkur Video-Kurs for np@hiplus.de (user id 2)
-- Check what columns enrollments table has first
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'enrollments' 
ORDER BY ordinal_position;

-- Then run the insert (adjust columns if needed based on above result):
INSERT INTO enrollments (user_id, course_id, enrolled_at, is_active)
SELECT 2, c.id, NOW(), true
FROM courses c
WHERE c.slug = 'stoffwechselkur-video'
ON CONFLICT DO NOTHING;

-- Verify
SELECT u.email, c.title, e.created_at
FROM enrollments e
JOIN users u ON e.user_id = u.id
JOIN courses c ON e.course_id = c.id
WHERE u.id = 2;
