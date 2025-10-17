-- 이메일 확인 문제 해결을 위한 임시 마이그레이션

-- 1. 해당 사용자의 이메일을 강제로 확인 처리
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'dding@ddong.com' AND email_confirmed_at IS NULL;

-- 2. 모든 미확인 사용자의 이메일을 확인 처리 (개발용)
-- 주의: 프로덕션에서는 사용하지 마세요!
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- 3. 확인된 사용자 목록 조회
SELECT 
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'dding@ddong.com';
