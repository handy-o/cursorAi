-- 기존 사용자 정보 수동 업데이트

-- 1. dding@ddong.com 계정 정보 업데이트
UPDATE public.profiles
SET 
  password_hash = crypt('123123', gen_salt('bf')), -- 비밀번호: 123123을 해시화
  phone = '01012341234',
  email_verified = true,
  updated_at = NOW()
WHERE email = 'dding@ddong.com';

-- 2. 업데이트 결과 확인
SELECT 
  id,
  email,
  name,
  phone,
  password_hash IS NOT NULL as has_password,
  email_verified,
  created_at,
  updated_at
FROM public.profiles
WHERE email = 'dding@ddong.com';

-- 3. 비밀번호 검증 테스트 (선택사항)
-- SELECT verify_password('123123', password_hash) as password_valid
-- FROM public.profiles
-- WHERE email = 'dding@ddong.com';

