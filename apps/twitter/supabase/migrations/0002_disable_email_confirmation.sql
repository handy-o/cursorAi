-- Disable email confirmation for development/testing
-- This migration disables email confirmation requirements

-- Update auth configuration to disable email confirmation
-- Note: This affects the auth.users table behavior

-- Disable email confirmation requirement
UPDATE auth.config 
SET 
  email_confirmation_enabled = false,
  email_change_confirmation_enabled = false
WHERE id = 'auth';

-- If the above doesn't work, try alternative approach:
-- Create a function to handle email confirmation bypass
CREATE OR REPLACE FUNCTION auth.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Automatically confirm email for new users
  UPDATE auth.users 
  SET 
    email_confirmed_at = NOW(),
    confirmed_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-confirm emails
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION auth.handle_new_user();

-- Alternative: Update existing unconfirmed users
UPDATE auth.users 
SET 
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT SELECT, INSERT, UPDATE ON auth.users TO service_role;
GRANT SELECT ON auth.config TO service_role;

-- Add comment
COMMENT ON FUNCTION auth.handle_new_user() IS 'Automatically confirms email for new users during development';

