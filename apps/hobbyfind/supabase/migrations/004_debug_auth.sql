-- 인증 관련 디버깅을 위한 쿼리들

-- 1. auth.users 테이블 확인 (관리자 권한 필요)
-- SELECT * FROM auth.users;

-- 2. profiles 테이블 확인
SELECT * FROM public.profiles;

-- 3. RLS 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('profiles', 'hobbies', 'wishlists', 'reservations');

-- 4. 이메일 확인 상태 확인을 위한 함수 (개발용)
CREATE OR REPLACE FUNCTION public.get_user_auth_info(user_email TEXT)
RETURNS TABLE(
  id UUID,
  email TEXT,
  email_confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.email_confirmed_at,
    u.created_at,
    u.last_sign_in_at
  FROM auth.users u
  WHERE u.email = user_email;
END;
$$;

-- 5. 사용자 확인 함수 실행 예시
-- SELECT * FROM public.get_user_auth_info('your-email@example.com');

-- 6. 이메일 확인을 강제로 완료하는 함수 (개발용 - 신중하게 사용)
CREATE OR REPLACE FUNCTION public.confirm_user_email(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE email = user_email AND email_confirmed_at IS NULL;
  
  RETURN FOUND;
END;
$$;

-- 7. 특정 사용자의 이메일 확인 강제 완료 (개발용)
-- SELECT public.confirm_user_email('your-email@example.com');


