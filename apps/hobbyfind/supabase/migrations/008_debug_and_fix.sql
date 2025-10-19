-- 인증 시스템 문제 디버깅 및 수정

-- 1. 현재 상황 확인
-- auth.users 테이블 확인
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
ORDER BY created_at DESC;

-- profiles 테이블 확인  
SELECT 
  id,
  email,
  name,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- 2. profiles 테이블의 foreign key constraint 확인
SELECT 
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'profiles';

-- 3. 문제 해결: profiles 테이블의 foreign key constraint 제거
-- (커스텀 인증에서는 auth.users와 독립적으로 관리)
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 4. 커스텀 회원가입 함수 수정 (UUID 자동 생성)
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
  -- 이메일 중복 체크 (profiles 테이블에서만)
  IF EXISTS (SELECT 1 FROM public.profiles WHERE email = user_email) THEN
    RETURN QUERY SELECT NULL::UUID, false, '이미 존재하는 이메일입니다.';
    RETURN;
  END IF;

  -- UUID 생성
  new_user_id := gen_random_uuid();
  
  -- 비밀번호 해싱
  hashed_password := public.hash_password(user_password);
  
  -- 프로필 생성 (auth.users와 독립적으로)
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
    true, -- 개발용으로 이메일 확인 자동 완료
    NOW(),
    NOW()
  );
  
  RETURN QUERY SELECT new_user_id, true, '회원가입이 완료되었습니다.';
END;
$$;

-- 5. 기존 auth.users 사용자를 profiles 테이블로 마이그레이션 (선택사항)
-- 이 부분은 기존 사용자의 비밀번호를 profiles 테이블로 옮기고 싶을 때 사용
/*
INSERT INTO public.profiles (
  id,
  email,
  name,
  password_hash,
  email_verified,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
  'migrated_user' as password_hash, -- 기존 사용자는 별도 처리 필요
  COALESCE(email_confirmed_at IS NOT NULL, false) as email_verified,
  created_at,
  updated_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
*/


