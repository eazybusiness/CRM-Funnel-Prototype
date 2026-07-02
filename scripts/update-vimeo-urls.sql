-- Update Vimeo URLs for Stoffwechselkur Video-Kurs
-- Two URLs changed (hashes removed): lesson 1.1 and Abschluss

UPDATE lessons SET video_url = 'https://vimeo.com/1198043715'
WHERE video_url = 'https://vimeo.com/1198043715/3a4e4cfe9b';

UPDATE lessons SET video_url = 'https://vimeo.com/1201347287'
WHERE video_url = 'https://vimeo.com/1201347287/f59726c8ef';

-- Verify all 11 URLs are correct
SELECT m.sort_order as modul, l.sort_order as lektion, l.title, l.video_url
FROM courses c
JOIN modules m ON c.id = m.course_id
JOIN lessons l ON m.id = l.module_id
WHERE c.slug = 'stoffwechselkur-video'
ORDER BY m.sort_order, l.sort_order;
