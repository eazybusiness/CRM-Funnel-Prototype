-- Update course prices to correct values
UPDATE courses SET price = 14.99 WHERE slug = 'stoffwechselkur-ebook';
UPDATE courses SET price = 59.00 WHERE slug = 'stoffwechselkur-video';

-- Verify
SELECT slug, title, price FROM courses ORDER BY id;
