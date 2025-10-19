-- 이메일 확인 비활성화 (개발용)
-- Supabase 대시보드에서도 설정 가능: Authentication > Settings > Email Confirmation

-- 또는 RLS 정책을 수정하여 이메일 미확인 사용자도 로그인 가능하게 만들기
-- 이 방법은 보안상 권장하지 않지만 개발 단계에서는 사용 가능

-- 기존 profiles 정책 삭제 후 재생성
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- 이메일 확인 여부와 관계없이 사용자가 자신의 프로필에 접근할 수 있도록 수정
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

