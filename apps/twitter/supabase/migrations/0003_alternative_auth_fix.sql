-- Alternative approach: Force confirm all users and disable email confirmation
-- This is a more direct approach for development

-- Method 1: Update all existing users to be confirmed
UPDATE auth.users 
SET 
  email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
  confirmed_at = COALESCE(confirmed_at, NOW())
WHERE email_confirmed_at IS NULL OR confirmed_at IS NULL;

-- Method 2: Create a policy to allow unconfirmed users to sign in
-- (This might be needed if the above doesn't work)

-- Method 3: Update auth configuration directly
-- Note: This might require superuser privileges
DO $$
BEGIN
  -- Try to update auth settings
  BEGIN
    UPDATE auth.config 
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || 
        '{"email_confirmation_enabled": false}'::jsonb
    WHERE id = 'auth';
  EXCEPTION
    WHEN OTHERS THEN
      -- If direct update fails, log the error but continue
      RAISE NOTICE 'Could not update auth.config directly: %', SQLERRM;
  END;
END $$;

-- Method 4: Create a view for easier user management
CREATE OR REPLACE VIEW auth.users_confirmed AS
SELECT 
  id,
  email,
  email_confirmed_at,
  confirmed_at,
  created_at,
  updated_at,
  CASE 
    WHEN email_confirmed_at IS NOT NULL AND confirmed_at IS NOT NULL 
    THEN 'confirmed' 
    ELSE 'unconfirmed' 
  END as status
FROM auth.users;

-- Grant access to the view
GRANT SELECT ON auth.users_confirmed TO service_role;

-- Add comment
COMMENT ON VIEW auth.users_confirmed IS 'View showing user confirmation status for debugging';

