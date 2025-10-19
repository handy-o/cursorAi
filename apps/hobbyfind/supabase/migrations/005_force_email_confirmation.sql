-- 개발 환경에서 이메일 확인을 우회하는 방법

-- 방법 1: 모든 사용자의 이메일을 강제로 확인된 상태로 만들기
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- 방법 2: 특정 이메일만 확인된 상태로 만들기 (위 쿼리가 작동하지 않을 경우)
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW()
-- WHERE email = 'your-email@example.com' AND email_confirmed_at IS NULL;

-- 방법 3: 새로 생성되는 사용자의 이메일을 자동으로 확인된 상태로 만들기
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  
  -- 이메일을 자동으로 확인된 상태로 만들기
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id AND email_confirmed_at IS NULL;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 기존 트리거 삭제 후 재생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


