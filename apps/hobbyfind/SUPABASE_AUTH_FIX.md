# Supabase 인증 설정 수정 가이드

## "Email logins are disabled" 에러 해결

### 1. Supabase 대시보드 설정 확인

**Authentication** → **Settings** → **Auth Providers**에서:

1. **Email** 섹션 확인:
   - ✅ **"Enable email confirmations"**: 체크 해제 (이미 완료)
   - ✅ **"Enable email signup"**: **체크 활성화** (중요!)
   - ✅ **"Enable email login"**: **체크 활성화** (중요!)

2. **Password** 섹션 확인:
   - ✅ **"Enable password authentication"**: **체크 활성화** (중요!)

### 2. 추가 확인사항

**Authentication** → **Settings** → **General**에서:
- ✅ **"Enable signup"**: 체크 활성화
- ✅ **"Enable email change"**: 체크 활성화 (선택사항)

### 3. RLS 정책 확인

현재 profiles 테이블의 RLS 정책이 올바른지 확인:

```sql
-- profiles 테이블 RLS 정책 확인
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';
```

### 4. 테스트용 사용자 생성

SQL Editor에서 테스트용 사용자 생성:

```sql
-- 테스트용 사용자 생성 (개발용)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

### 5. 환경 변수 재확인

`.env.local` 파일 확인:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 6. 브라우저 캐시 클리어

- 개발자 도구 → Network 탭 → "Disable cache" 체크
- 또는 시크릿 모드에서 테스트

## 문제 해결 순서

1. ✅ **Authentication Settings** 확인 및 수정
2. ✅ **Email signup/login** 활성화
3. ✅ **Password authentication** 활성화
4. ✅ **환경 변수** 재확인
5. ✅ **새 계정으로 회원가입** 테스트
6. ✅ **로그인** 테스트

## 주의사항

- 설정 변경 후 몇 분 정도 기다려야 적용될 수 있음
- 브라우저 캐시 문제일 수 있으니 시크릿 모드에서 테스트
- Supabase 대시보드에서 실시간으로 설정 상태 확인 가능

