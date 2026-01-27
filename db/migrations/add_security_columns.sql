-- Add security columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS failed_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(locked_until) WHERE locked_until IS NOT NULL;
