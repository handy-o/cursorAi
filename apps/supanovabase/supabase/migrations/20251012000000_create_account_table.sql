-- Create account table
CREATE TABLE IF NOT EXISTS public.account (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nickname TEXT UNIQUE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for email lookup
CREATE INDEX IF NOT EXISTS idx_account_email ON public.account(email);

-- Create index for nickname lookup
CREATE INDEX IF NOT EXISTS idx_account_nickname ON public.account(nickname);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.account
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow everyone to read account (including anonymous users)
CREATE POLICY "Allow all users to read account"
  ON public.account
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert account"
  ON public.account
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their own account"
  ON public.account
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Allow authenticated users to delete their own account"
  ON public.account
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Add comments for documentation
COMMENT ON TABLE public.account IS '사용자 계정 정보를 저장하는 테이블';
COMMENT ON COLUMN public.account.id IS '사용자 고유 식별자';
COMMENT ON COLUMN public.account.name IS '사용자 이름';
COMMENT ON COLUMN public.account.nickname IS '사용자 닉네임 (중복 불가)';
COMMENT ON COLUMN public.account.gender IS '사용자 성별 (male, female, other)';
COMMENT ON COLUMN public.account.email IS '사용자 이메일 (중복 불가)';
COMMENT ON COLUMN public.account.birth_date IS '사용자 생년월일';
COMMENT ON COLUMN public.account.created_at IS '계정 생성 일시';
COMMENT ON COLUMN public.account.updated_at IS '계정 수정 일시';

