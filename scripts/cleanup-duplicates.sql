-- Cleanup duplicate modules and lessons from repeated script runs
-- Run this to restore exactly 3 modules and 11 lessons for stoffwechselkur-video

-- Step 1: Check how many modules we have (should be 3, likely 9)
SELECT sort_order, COUNT(*) as count
FROM modules m
JOIN courses c ON m.course_id = c.id
WHERE c.slug = 'stoffwechselkur-video'
GROUP BY sort_order
ORDER BY sort_order;

-- Step 2: Delete lessons that belong to duplicate modules
-- Keep only lessons whose module_id is the MINIMUM id per sort_order
DELETE FROM lessons
WHERE module_id IN (
  SELECT m.id
  FROM modules m
  JOIN courses c ON m.course_id = c.id
  WHERE c.slug = 'stoffwechselkur-video'
    AND m.id NOT IN (
      SELECT MIN(m2.id)
      FROM modules m2
      JOIN courses c2 ON m2.course_id = c2.id
      WHERE c2.slug = 'stoffwechselkur-video'
      GROUP BY m2.sort_order
    )
);

-- Step 3: Delete the duplicate modules (keep only the minimum id per sort_order)
DELETE FROM modules
WHERE id IN (
  SELECT m.id
  FROM modules m
  JOIN courses c ON m.course_id = c.id
  WHERE c.slug = 'stoffwechselkur-video'
    AND m.id NOT IN (
      SELECT MIN(m2.id)
      FROM modules m2
      JOIN courses c2 ON m2.course_id = c2.id
      WHERE c2.slug = 'stoffwechselkur-video'
      GROUP BY m2.sort_order
    )
);

-- Step 4: Verify — should show exactly 3 modules x 11 lessons = 33... 
-- Wait no: after cleanup we should have 3 modules but each may have 11 lessons 
-- because all lesson INSERTs used module_id of the FIRST (kept) module.
-- So we need to also deduplicate lessons within each module by sort_order.

-- Check lesson counts per module
SELECT m.sort_order, m.title, COUNT(l.id) as lesson_count
FROM modules m
JOIN courses c ON m.course_id = c.id
LEFT JOIN lessons l ON l.module_id = m.id
WHERE c.slug = 'stoffwechselkur-video'
GROUP BY m.id, m.sort_order, m.title
ORDER BY m.sort_order;

-- Step 5: Deduplicate lessons within each module (keep min id per sort_order per module)
DELETE FROM lessons
WHERE id NOT IN (
  SELECT MIN(l.id)
  FROM lessons l
  JOIN modules m ON l.module_id = m.id
  JOIN courses c ON m.course_id = c.id
  WHERE c.slug = 'stoffwechselkur-video'
  GROUP BY l.module_id, l.sort_order
);

-- Step 6: Final verification — should show 11 rows total
SELECT 
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
