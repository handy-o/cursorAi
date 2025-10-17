-- Simple fix: Just confirm all existing users and create a trigger for new users
-- This is the most reliable approach for development

-- Step 1: Confirm all existing users (confirmed_at is auto-generated, so we only update email_confirmed_at)
UPDATE auth.users 
SET 
  email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Step 2: Create a simple trigger for future users
CREATE OR REPLACE FUNCTION public.auto_confirm_new_user()
RETURNS trigger AS $$
BEGIN
  -- Auto-confirm any new user (confirmed_at is auto-generated)
  UPDATE auth.users 
  SET 
    email_confirmed_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Create the trigger
DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;
CREATE TRIGGER auto_confirm_user_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.auto_confirm_new_user();

-- Step 4: Grant permissions
GRANT USAGE ON SCHEMA public TO service_role;
GRANT EXECUTE ON FUNCTION public.auto_confirm_new_user() TO service_role;

-- Add comment
COMMENT ON FUNCTION public.auto_confirm_new_user() IS 'Automatically confirms new users for development purposes';
