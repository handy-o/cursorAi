-- 003~005 마이그레이션 롤백 및 새로운 구조로 변경

-- 1. 기존 트리거와 함수 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. profiles 테이블 구조 변경 (비밀번호 필드 추가)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP WITH TIME ZONE;

-- 3. 기존 RLS 정책 삭제
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- 4. 새로운 RLS 정책 생성 (이메일 확인 없이)
CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create profile" ON public.profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- 5. 비밀번호 해싱 함수 생성
CREATE OR REPLACE FUNCTION public.hash_password(password TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf'));
END;
$$;

-- 6. 비밀번호 검증 함수 생성
CREATE OR REPLACE FUNCTION public.verify_password(password TEXT, hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN hash = crypt(password, hash);
END;
$$;

-- 7. 회원가입 함수 생성
CREATE OR REPLACE FUNCTION public.signup_user(
  user_email TEXT,
  user_password TEXT,
  user_name TEXT DEFAULT NULL,
  user_phone TEXT DEFAULT NULL
)
RETURNS TABLE(
  user_id UUID,
  success BOOLEAN,
  message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  hashed_password TEXT;
BEGIN
  -- 이메일 중복 체크
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = user_email) THEN
    RETURN QUERY SELECT NULL::UUID, false, '이미 존재하는 이메일입니다.';
    RETURN;
  END IF;

  -- UUID 생성
  new_user_id := gen_random_uuid();
  
  -- 비밀번호 해싱
  hashed_password := public.hash_password(user_password);
  
  -- 프로필 생성
  INSERT INTO public.profiles (
    id,
    email,
    name,
    phone,
    password_hash,
    email_verified,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    user_email,
    COALESCE(user_name, split_part(user_email, '@', 1)),
    user_phone,
    hashed_password,
    false,
    NOW(),
    NOW()
  );
  
  RETURN QUERY SELECT new_user_id, true, '회원가입이 완료되었습니다.';
END;
$$;

-- 8. 로그인 함수 생성
CREATE OR REPLACE FUNCTION public.login_user(
  user_email TEXT,
  user_password TEXT
)
RETURNS TABLE(
  user_id UUID,
  success BOOLEAN,
  message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- 사용자 조회
  SELECT id, password_hash, name, email
  INTO user_record
  FROM public.profiles
  WHERE email = user_email;
  
  -- 사용자가 존재하지 않는 경우
  IF user_record.id IS NULL THEN
    RETURN QUERY SELECT NULL::UUID, false, '존재하지 않는 이메일입니다.';
    RETURN;
  END IF;
  
  -- 비밀번호 검증
  IF NOT public.verify_password(user_password, user_record.password_hash) THEN
    RETURN QUERY SELECT NULL::UUID, false, '비밀번호가 올바르지 않습니다.';
    RETURN;
  END IF;
  
  RETURN QUERY SELECT user_record.id, true, '로그인 성공';
END;
$$;

-- 9. 이메일 확인 함수 생성 (선택사항)
CREATE OR REPLACE FUNCTION public.verify_email(
  user_email TEXT,
  token TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET email_verified = true,
      verification_token = NULL,
      updated_at = NOW()
  WHERE email = user_email 
    AND verification_token = token
    AND email_verified = false;
  
  RETURN FOUND;
END;
$$;

-- 10. 비밀번호 재설정 함수 생성
CREATE OR REPLACE FUNCTION public.request_password_reset(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  reset_token TEXT;
BEGIN
  -- 토큰 생성
  reset_token := encode(gen_random_bytes(32), 'hex');
  
  -- 토큰 저장 (1시간 유효)
  UPDATE public.profiles
  SET password_reset_token = reset_token,
      password_reset_expires = NOW() + INTERVAL '1 hour',
      updated_at = NOW()
  WHERE email = user_email;
  
  RETURN FOUND;
END;
$$;

-- 11. 비밀번호 재설정 실행 함수
CREATE OR REPLACE FUNCTION public.reset_password(
  user_email TEXT,
  token TEXT,
  new_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET password_hash = public.hash_password(new_password),
      password_reset_token = NULL,
      password_reset_expires = NULL,
      updated_at = NOW()
  WHERE email = user_email 
    AND password_reset_token = token
    AND password_reset_expires > NOW();
  
  RETURN FOUND;
END;
$$;


