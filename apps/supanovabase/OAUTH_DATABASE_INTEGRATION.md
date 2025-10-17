# OAuth 데이터베이스 통합 가이드

## 🎯 개요

`realAccount` 테이블이 OAuth 소셜 로그인(카카오, 구글, 네이버 등)을 완벽하게 지원하도록 확장되었습니다.

## ✅ 변경 사항

### 1. 데이터베이스 스키마 확장

**Migration 파일**: `supabase/migrations/0002_add_oauth_support_to_real_account.sql`

#### 추가된 컬럼

| 컬럼명 | 타입 | 설명 | 기본값 |
|--------|------|------|--------|
| `provider` | TEXT | 인증 제공자 (credentials, kakao, google, naver) | 'credentials' |
| `provider_account_id` | TEXT | OAuth 제공자의 사용자 고유 ID | NULL |
| `profile_image_url` | TEXT | 사용자 프로필 이미지 URL | NULL |

#### 변경된 컬럼

- `password`: `NOT NULL` → `NULL` (OAuth 사용자는 비밀번호 불필요)

#### 제약 조건

```sql
-- OAuth 계정 검증
CHECK (
  (provider = 'credentials' AND password IS NOT NULL) OR
  (provider != 'credentials' AND provider_account_id IS NOT NULL)
)

-- 제공자별 고유성 보장
UNIQUE INDEX ON (provider, provider_account_id)
```

### 2. 데이터베이스 함수

#### `upsert_oauth_account`

OAuth 사용자를 안전하게 생성하거나 업데이트하는 함수입니다.

**사용법:**

```sql
SELECT upsert_oauth_account(
  p_email := 'user@kakao.com',
  p_name := '홍길동',
  p_provider := 'kakao',
  p_provider_account_id := '1234567890',
  p_profile_image_url := 'https://example.com/image.jpg'
);
```

**동작 방식:**

1. `provider` + `provider_account_id`로 기존 사용자 확인
2. 존재하면 → 정보 업데이트 (이메일, 이름, 프로필 이미지)
3. 없으면 → 새 계정 생성
4. 사용자 UUID 반환

**특징:**

- ✅ 자동으로 고유한 username 생성 (`kakao_1234567890`)
- ✅ 중복 가입 방지
- ✅ 트랜잭션 안전성 보장
- ✅ Service role 권한으로 실행 (RLS 우회)

### 3. 뷰 (View)

#### `oauth_accounts`

OAuth로 가입한 계정만 조회하는 편의 뷰입니다.

```sql
SELECT * FROM oauth_accounts WHERE provider = 'kakao';
```

## 📊 데이터베이스 구조

### realAccount 테이블 (확장 후)

```sql
CREATE TABLE public."realAccount" (
  -- 기본 정보
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  
  -- 인증 정보
  password TEXT,                    -- NULL 허용 (OAuth용)
  provider TEXT DEFAULT 'credentials',
  provider_account_id TEXT,
  profile_image_url TEXT,
  
  -- 상태 및 메타데이터
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 인덱스

```sql
-- 기존
CREATE INDEX idx_real_account_username ON realAccount(username);
CREATE INDEX idx_real_account_email ON realAccount(email);
CREATE INDEX idx_real_account_is_active ON realAccount(is_active);

-- 새로 추가
CREATE INDEX idx_real_account_provider ON realAccount(provider);
CREATE UNIQUE INDEX idx_real_account_provider_account 
  ON realAccount(provider, provider_account_id) 
  WHERE provider_account_id IS NOT NULL;
```

## 🔧 Migration 적용 방법

### 1. Supabase 대시보드에서 실행

1. [Supabase 대시보드](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **SQL Editor** 메뉴 클릭
4. `supabase/migrations/0002_add_oauth_support_to_real_account.sql` 파일 열기
5. 전체 내용 복사
6. SQL Editor에 붙여넣기
7. **Run** 버튼 클릭

### 2. 실행 확인

```sql
-- 테이블 구조 확인
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'realAccount'
ORDER BY ordinal_position;

-- 함수 확인
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'upsert_oauth_account';

-- 테스트 계정 확인
SELECT username, provider, provider_account_id 
FROM "realAccount" 
WHERE provider != 'credentials';
```

## 💻 코드 통합

### Next-Auth 설정 (`lib/auth.ts`)

```typescript
import { createPureClient } from "@/src/lib/supabase/server";

// signIn 콜백에서 자동으로 DB 함수 호출
async signIn({ user, account, profile }) {
  if (account?.provider === 'kakao') {
    const supabase = await createPureClient();
    
    const { data, error } = await supabase
      .rpc('upsert_oauth_account', {
        p_email: user.email!,
        p_name: user.name || '카카오 사용자',
        p_provider: 'kakao',
        p_provider_account_id: account.providerAccountId,
        p_profile_image_url: user.image,
      });

    if (error) {
      console.error('Failed to upsert OAuth account:', error);
      return false;
    }

    user.id = data; // DB에서 반환된 UUID 사용
  }
  return true;
}
```

### TypeScript 타입 정의 (`src/types/auth.ts`)

```typescript
export type AuthProvider = 'credentials' | 'kakao' | 'google' | 'naver';

export interface RealAccount {
  id: string;
  username: string;
  password: string | null;
  name: string;
  email: string;
  provider: AuthProvider;
  provider_account_id: string | null;
  profile_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

## 📝 사용 예시

### 1. 카카오 로그인 사용자 조회

```typescript
const supabase = await createPureClient();

const { data: kakaoUsers } = await supabase
  .from('realAccount')
  .select('*')
  .eq('provider', 'kakao')
  .eq('is_active', true);
```

### 2. 특정 OAuth 사용자 조회

```typescript
const { data: user } = await supabase
  .from('realAccount')
  .select('*')
  .eq('provider', 'kakao')
  .eq('provider_account_id', '1234567890')
  .single();
```

### 3. 사용자 프로필 이미지 업데이트

```typescript
const { error } = await supabase
  .from('realAccount')
  .update({ 
    profile_image_url: 'https://new-image-url.com/profile.jpg' 
  })
  .eq('id', userId);
```

### 4. OAuth 계정 통계

```sql
-- 제공자별 사용자 수
SELECT 
  provider,
  COUNT(*) as user_count
FROM "realAccount"
GROUP BY provider;

-- 활성 OAuth 사용자
SELECT 
  provider,
  COUNT(*) as active_users
FROM "realAccount"
WHERE is_active = true AND provider != 'credentials'
GROUP BY provider;
```

## 🔒 보안 고려사항

### RLS (Row Level Security) 정책

기존 정책을 그대로 유지하며, 추가로:

```sql
-- Service role은 모든 OAuth 계정 관리 가능
CREATE POLICY "Allow service role to manage OAuth accounts"
  ON public."realAccount"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

### 데이터 검증

- ✅ 이메일 형식 검증 (기존 CHECK 제약 조건)
- ✅ Provider + provider_account_id 고유성 보장
- ✅ Credentials 계정은 반드시 password 필요
- ✅ OAuth 계정은 반드시 provider_account_id 필요

## 🚀 다중 OAuth 제공자 지원

이 구조는 여러 OAuth 제공자를 쉽게 추가할 수 있도록 설계되었습니다.

### Google 로그인 추가

```typescript
// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";

providers: [
  // ... 기존 프로바이더
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
],

// signIn 콜백 확장
if (account?.provider === 'google') {
  await supabase.rpc('upsert_oauth_account', {
    p_email: user.email!,
    p_name: user.name!,
    p_provider: 'google',
    p_provider_account_id: account.providerAccountId,
    p_profile_image_url: user.image,
  });
}
```

### Naver 로그인 추가

```typescript
import NaverProvider from "next-auth/providers/naver";

providers: [
  // ... 기존 프로바이더
  NaverProvider({
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  }),
],
```

## 📊 데이터 예시

### Credentials 계정

```json
{
  "id": "uuid-1",
  "username": "admin",
  "password": "$2b$10$hashedpassword",
  "name": "관리자",
  "email": "admin@example.com",
  "provider": "credentials",
  "provider_account_id": null,
  "profile_image_url": null,
  "is_active": true
}
```

### Kakao 계정

```json
{
  "id": "uuid-2",
  "username": "kakao_1234567890",
  "password": null,
  "name": "홍길동",
  "email": "hong@kakao.com",
  "provider": "kakao",
  "provider_account_id": "1234567890",
  "profile_image_url": "https://k.kakaocdn.net/.../profile.jpg",
  "is_active": true
}
```

## 🐛 문제 해결

### Migration 실행 실패

**오류**: `relation "realAccount" does not exist`

**해결**: 먼저 `0001_create_real_account_table.sql` migration을 실행하세요.

### Unique constraint 위반

**오류**: `duplicate key value violates unique constraint`

**원인**: 같은 제공자의 같은 사용자가 이미 존재

**해결**: `upsert_oauth_account` 함수는 자동으로 처리하므로 이 함수를 사용하세요.

### RLS 정책 오류

**오류**: `new row violates row-level security policy`

**해결**: Service role key를 사용하는지 확인하세요.

```typescript
// 올바른 방법
const supabase = await createPureClient(); // service_role 사용
```

## 🔄 롤백

Migration을 되돌리려면:

```sql
-- 함수 삭제
DROP FUNCTION IF EXISTS public.upsert_oauth_account;

-- 뷰 삭제
DROP VIEW IF EXISTS public.oauth_accounts;

-- 제약 조건 삭제
ALTER TABLE public."realAccount" 
  DROP CONSTRAINT IF EXISTS check_oauth_account;

-- 인덱스 삭제
DROP INDEX IF EXISTS idx_real_account_provider_account;
DROP INDEX IF EXISTS idx_real_account_provider;

-- 컬럼 삭제
ALTER TABLE public."realAccount" 
  DROP COLUMN IF EXISTS provider,
  DROP COLUMN IF EXISTS provider_account_id,
  DROP COLUMN IF EXISTS profile_image_url;

-- password를 다시 NOT NULL로 변경 (주의: 기존 OAuth 사용자가 있으면 실패)
ALTER TABLE public."realAccount" 
  ALTER COLUMN password SET NOT NULL;
```

## 📚 관련 문서

- [카카오 OAuth 설정 가이드](./KAKAO_OAUTH_SETUP.md)
- [카카오 로그인 빠른 시작](./KAKAO_AUTH_QUICKSTART.md)
- [인증 시스템 전체 가이드](./AUTHENTICATION.md)
- [프로젝트 README](./README.md)

## ✨ 다음 단계

1. ✅ Migration 적용
2. ✅ 카카오 로그인 테스트
3. 🔜 Google 로그인 추가
4. 🔜 Naver 로그인 추가
5. 🔜 사용자 프로필 페이지 구현
6. 🔜 계정 연동 기능 추가

---

**마지막 업데이트**: 2025-10-12  
**버전**: 1.0.0  
**Migration 파일**: `0002_add_oauth_support_to_real_account.sql`


