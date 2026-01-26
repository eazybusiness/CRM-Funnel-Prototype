-- Migration Script: Add first_name and last_name to users table
-- Run this in Vercel Postgres SQL Editor

-- Add new columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Update existing records (if any) to set updated_at
UPDATE users SET updated_at = NOW() WHERE updated_at IS NULL;

-- If you have existing records with 'name' column, you can split them:
-- UPDATE users SET 
--   first_name = SPLIT_PART(name, ' ', 1),
--   last_name = SPLIT_PART(name, ' ', 2)
-- WHERE name IS NOT NULL AND first_name IS NULL;
