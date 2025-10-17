# Authentication Setup Guide

## 설정 완료 항목

로그인 시스템이 테스트 계정에서 Supabase 데이터베이스 인증으로 성공적으로 마이그레이션되었습니다.

## 변경 사항

### 1. 데이터베이스 Migration 생성 ✅

**파일**: `/supabase/migrations/0001_create_real_account_table.sql`

- `realAccount` 테이블 생성
- bcrypt 해시 비밀번호 저장
- Row Level Security (RLS) 정책 설정
- 테스트 계정 2개 자동 생성

### 2. 인증 로직 수정 ✅

**파일**: `/lib/auth.ts`

- Supabase 데이터베이스에서 계정 조회
- bcrypt를 사용한 비밀번호 검증
- 보안이 강화된 인증 플로우

### 3. UI 업데이트 ✅

**파일**: `/app/auth/login-idpw/page.tsx`

- 테스트 계정 안내 문구 제거
- 일반 로그인 안내로 변경

### 4. 의존성 추가 ✅

- `bcryptjs`: 비밀번호 해싱 및 검증

## 다음 단계

### 1. Migration 적용

Supabase 대시보드에서 다음 작업을 수행하세요:

1. Supabase 프로젝트 대시보드 접속
2. SQL Editor 메뉴 선택
3. `/supabase/migrations/0001_create_real_account_table.sql` 파일 내용 복사
4. SQL Editor에 붙여넣기
5. 실행 (Run) 버튼 클릭

### 2. 환경 변수 확인

`.env.local` 파일에 다음 환경 변수가 설정되어 있는지 확인:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Next-Auth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. 테스트

Migration 적용 후 다음 계정으로 로그인 테스트:

- **관리자 계정**: `admin` / `admin1234`
- **일반 사용자**: `user` / `user1234`

## 테이블 스키마

```sql
CREATE TABLE public."realAccount" (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT,                        -- bcrypt 해시 (OAuth는 NULL)
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  provider TEXT DEFAULT 'credentials',  -- 인증 제공자
  provider_account_id TEXT,             -- OAuth 제공자 ID
  profile_image_url TEXT,               -- 프로필 이미지
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### OAuth 지원

`0002_add_oauth_support_to_real_account.sql` migration을 통해 소셜 로그인을 지원합니다.

**자세한 내용**: [OAUTH_DATABASE_INTEGRATION.md](./OAUTH_DATABASE_INTEGRATION.md)

## 새 계정 추가 방법

Supabase SQL Editor에서:

```sql
INSERT INTO public."realAccount" (username, password, name, email) 
VALUES (
  'newusername', 
  '$2a$10$...bcrypt_hashed_password...', 
  '사용자 이름', 
  'email@example.com'
);
```

비밀번호 해시 생성은 다음 Node.js 코드를 사용:

```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('your-password', 10);
console.log(hash);
```

## 보안 고려사항

- ✅ 비밀번호는 bcrypt (10 rounds)로 해시화
- ✅ Service role key는 서버 사이드에서만 사용
- ✅ RLS 정책으로 데이터 접근 제어
- ✅ JWT 세션 전략 사용
- ✅ 계정 활성화 상태 확인 (`is_active`)

## 문제 해결

### 로그인 실패

1. Migration이 정상적으로 적용되었는지 확인
2. Supabase 대시보드에서 `realAccount` 테이블 확인
3. 환경 변수 설정 확인
4. 브라우저 개발자 도구 콘솔에서 에러 확인

### 데이터베이스 연결 오류

1. `SUPABASE_SERVICE_ROLE_KEY` 확인
2. Supabase 프로젝트가 활성 상태인지 확인
3. RLS 정책이 올바르게 설정되었는지 확인

## 추가 참고 사항

자세한 가이드라인은 `.cursor/rules/auth.mdc` 파일을 참조하세요.

