-- Add Vimeo URLs to existing lessons
-- This script updates the lessons table with protected Vimeo video URLs

-- First, let's see the current structure
-- SELECT * FROM lessons ORDER BY module_id, sort_order;

-- Example: Update lesson 1 with Vimeo URL (replace with actual video IDs when provided)
-- UPDATE lessons 
-- SET video_url = 'https://vimeo.com/PROTECTED_VIDEO_ID_1'
-- WHERE id = 1;

-- Example: Update lesson 2 with Vimeo URL
-- UPDATE lessons 
-- SET video_url = 'https://vimeo.com/PROTECTED_VIDEO_ID_2'
-- WHERE id = 2;

-- For now, let's add some placeholder URLs for testing
-- These should be replaced with actual protected Vimeo URLs when provided by Stefanie

-- Update Stoffwechselkur course lessons (assuming they exist)
-- Note: These are placeholder URLs - replace with actual protected Vimeo URLs
UPDATE lessons 
SET video_url = 'https://vimeo.com/PLACEHOLDER_VIDEO_ID_1'
WHERE module_id IN (
  SELECT m.id FROM modules m 
  JOIN courses c ON m.course_id = c.id 
  WHERE c.slug = 'stoffwechselkur-ebook'
) AND sort_order = 1;

UPDATE lessons 
SET video_url = 'https://vimeo.com/PLACEHOLDER_VIDEO_ID_2'
WHERE module_id IN (
  SELECT m.id FROM modules m 
  JOIN courses c ON m.course_id = c.id 
  WHERE c.slug = 'stoffwechselkur-ebook'
) AND sort_order = 2;

-- Show updated lessons
SELECT 
  l.id,
  l.title,
  l.video_url,
  c.slug as course_slug,
  m.title as module_title,
  l.sort_order
FROM lessons l
JOIN modules m ON l.module_id = m.id
JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-ebook'
ORDER BY m.sort_order, l.sort_order;
