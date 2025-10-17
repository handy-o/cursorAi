-- Migration: Add OAuth support to realAccount table
-- Date: 2025-10-12
-- Description: Extend realAccount table to support OAuth providers like Kakao

-- Step 1: Make password nullable (OAuth users don't need passwords)
ALTER TABLE public."realAccount" 
  ALTER COLUMN password DROP NOT NULL;

-- Step 2: Add OAuth provider columns
ALTER TABLE public."realAccount" 
  ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'credentials',
  ADD COLUMN IF NOT EXISTS provider_account_id TEXT,
  ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Step 3: Add unique constraint for provider + provider_account_id combination
-- This allows same email with different providers
CREATE UNIQUE INDEX IF NOT EXISTS idx_real_account_provider_account 
  ON public."realAccount"(provider, provider_account_id) 
  WHERE provider_account_id IS NOT NULL;

-- Step 4: Add index for provider lookup
CREATE INDEX IF NOT EXISTS idx_real_account_provider 
  ON public."realAccount"(provider);

-- Step 5: Add check constraint for OAuth accounts
-- OAuth accounts must have provider_account_id
ALTER TABLE public."realAccount"
  ADD CONSTRAINT check_oauth_account 
  CHECK (
    (provider = 'credentials' AND password IS NOT NULL) OR
    (provider != 'credentials' AND provider_account_id IS NOT NULL)
  );

-- Step 6: Update existing accounts to have 'credentials' provider
UPDATE public."realAccount"
  SET provider = 'credentials'
  WHERE provider IS NULL OR provider = 'credentials';

-- Step 7: Add comments for new columns
COMMENT ON COLUMN public."realAccount".provider IS '인증 제공자 (credentials, kakao, google, naver 등)';
COMMENT ON COLUMN public."realAccount".provider_account_id IS 'OAuth 제공자의 사용자 고유 ID';
COMMENT ON COLUMN public."realAccount".profile_image_url IS '사용자 프로필 이미지 URL';

-- Step 8: Create view for OAuth accounts
CREATE OR REPLACE VIEW public."oauth_accounts" AS
SELECT 
  id,
  username,
  name,
  email,
  provider,
  provider_account_id,
  profile_image_url,
  is_active,
  created_at,
  updated_at
FROM public."realAccount"
WHERE provider != 'credentials';

COMMENT ON VIEW public."oauth_accounts" IS 'OAuth 로그인 계정만 조회하는 뷰';

-- Step 9: Create function to safely insert OAuth user
CREATE OR REPLACE FUNCTION public.upsert_oauth_account(
  p_email TEXT,
  p_name TEXT,
  p_provider TEXT,
  p_provider_account_id TEXT,
  p_profile_image_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_username TEXT;
BEGIN
  -- Check if user already exists with this provider
  SELECT id INTO v_user_id
  FROM public."realAccount"
  WHERE provider = p_provider 
    AND provider_account_id = p_provider_account_id;
  
  IF v_user_id IS NOT NULL THEN
    -- Update existing user
    UPDATE public."realAccount"
    SET 
      name = COALESCE(p_name, name),
      email = COALESCE(p_email, email),
      profile_image_url = COALESCE(p_profile_image_url, profile_image_url),
      updated_at = NOW()
    WHERE id = v_user_id;
    
    RETURN v_user_id;
  ELSE
    -- Create new user
    -- Generate unique username
    v_username := LOWER(p_provider) || '_' || p_provider_account_id;
    
    INSERT INTO public."realAccount" (
      username,
      email,
      name,
      provider,
      provider_account_id,
      profile_image_url,
      password,
      is_active
    ) VALUES (
      v_username,
      p_email,
      p_name,
      p_provider,
      p_provider_account_id,
      p_profile_image_url,
      NULL,
      true
    )
    RETURNING id INTO v_user_id;
    
    RETURN v_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.upsert_oauth_account IS 'OAuth 사용자를 안전하게 생성하거나 업데이트하는 함수';

-- Step 10: Grant execute permission to service_role
GRANT EXECUTE ON FUNCTION public.upsert_oauth_account TO service_role;

-- Step 11: Create policy for service role to manage OAuth accounts
CREATE POLICY "Allow service role to manage OAuth accounts"
  ON public."realAccount"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 12: Add sample Kakao test account (optional for testing)
-- Note: This is just for testing purposes
-- In production, accounts will be created automatically on first login
DO $$
BEGIN
  -- Only insert if not exists
  IF NOT EXISTS (
    SELECT 1 FROM public."realAccount" 
    WHERE provider = 'kakao' AND provider_account_id = '9999999999'
  ) THEN
    INSERT INTO public."realAccount" (
      username,
      email,
      name,
      provider,
      provider_account_id,
      password,
      is_active
    ) VALUES (
      'kakao_9999999999',
      'kakao_test@kakao.com',
      '카카오 테스트',
      'kakao',
      '9999999999',
      NULL,
      true
    );
  END IF;
END $$;


