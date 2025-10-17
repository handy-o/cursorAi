-- Create realAccount table for authentication
CREATE TABLE IF NOT EXISTS public."realAccount" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for username lookup (used for login)
CREATE INDEX IF NOT EXISTS idx_real_account_username ON public."realAccount"(username);

-- Create index for email lookup
CREATE INDEX IF NOT EXISTS idx_real_account_email ON public."realAccount"(email);

-- Create index for active accounts
CREATE INDEX IF NOT EXISTS idx_real_account_is_active ON public."realAccount"(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_real_account_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_real_account_updated_at
  BEFORE UPDATE ON public."realAccount"
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_real_account_updated_at();

-- Enable Row Level Security
ALTER TABLE public."realAccount" ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow service role to read all accounts (for authentication)
CREATE POLICY "Allow service role to read all accounts"
  ON public."realAccount"
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy: Allow authenticated users to read their own account
CREATE POLICY "Allow users to read their own account"
  ON public."realAccount"
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policy: Allow service role to insert accounts
CREATE POLICY "Allow service role to insert accounts"
  ON public."realAccount"
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy: Allow users to update their own account
CREATE POLICY "Allow users to update their own account"
  ON public."realAccount"
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Create policy: Allow users to delete their own account
CREATE POLICY "Allow users to delete their own account"
  ON public."realAccount"
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Add comments for documentation
COMMENT ON TABLE public."realAccount" IS '실제 사용자 인증 정보를 저장하는 테이블';
COMMENT ON COLUMN public."realAccount".id IS '사용자 고유 식별자';
COMMENT ON COLUMN public."realAccount".username IS '로그인용 사용자 아이디 (중복 불가)';
COMMENT ON COLUMN public."realAccount".password IS 'bcrypt로 해시화된 비밀번호';
COMMENT ON COLUMN public."realAccount".name IS '사용자 이름';
COMMENT ON COLUMN public."realAccount".email IS '사용자 이메일 (중복 불가)';
COMMENT ON COLUMN public."realAccount".is_active IS '계정 활성화 상태';
COMMENT ON COLUMN public."realAccount".created_at IS '계정 생성 일시';
COMMENT ON COLUMN public."realAccount".updated_at IS '계정 수정 일시';

-- Insert test accounts
-- Note: Passwords are bcrypt hashed (10 rounds)
-- admin / admin1234 -> bcrypt hash generated and verified
-- user / user1234 -> bcrypt hash generated and verified
INSERT INTO public."realAccount" (username, password, name, email) VALUES
  ('admin', '$2b$10$bjmtQEjz9AoeZl8GfbiPEuojHAMu1KRAm2uYpcIdsysG6tgHFQFsa', '관리자', 'admin@example.com'),
  ('user', '$2b$10$Gtf7CJhp5kmmIwkeKXubYu8zZFAdLk.bhBQruUjRzj4CzINgy/x6m', '일반사용자', 'user@example.com');

