# 커스텀 인증 시스템 설정 가이드

## 새로운 인증 시스템 구조

이제 Supabase의 기본 인증 대신 **커스텀 인증 시스템**을 사용합니다.

### 주요 변경사항:

1. **profiles 테이블에 비밀번호 저장**
2. **이메일 확인 불필요** (@test.com 등 어떤 이메일도 사용 가능)
3. **커스텀 로그인/회원가입 함수** 사용
4. **localStorage 기반 세션 관리**

## 설정 방법

### 1. 마이그레이션 실행

Supabase SQL Editor에서 다음 파일들을 순서대로 실행:

```sql
-- 1. 기본 스키마
-- supabase/migrations/001_initial_schema.sql

-- 2. 샘플 데이터
-- supabase/migrations/002_sample_data.sql

-- 3. 롤백 및 새로운 인증 구조
-- supabase/migrations/006_rollback_and_restructure.sql
```

### 2. 환경 변수 설정

`.env.local` 파일 생성:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 개발 서버 실행

```bash
npm run dev
```

## 데이터베이스 구조

### profiles 테이블 (업데이트됨)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  password_hash TEXT,              -- 새로 추가
  email_verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  password_reset_token TEXT,
  password_reset_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 새로운 함수들

1. **signup_user()**: 회원가입
2. **login_user()**: 로그인
3. **hash_password()**: 비밀번호 해싱
4. **verify_password()**: 비밀번호 검증
5. **verify_email()**: 이메일 확인 (선택사항)
6. **request_password_reset()**: 비밀번호 재설정 요청
7. **reset_password()**: 비밀번호 재설정

## 사용법

### 회원가입
```typescript
const { data, error } = await signUp(
  'user@test.com',    // 이메일
  'password123',      // 비밀번호
  '홍길동',           // 이름 (선택사항)
  '010-1234-5678'     // 전화번호 (선택사항)
);
```

### 로그인
```typescript
const { data, error } = await signIn(
  'user@test.com',    // 이메일
  'password123'       // 비밀번호
);
```

### 로그아웃
```typescript
await signOut();
```

## 보안 기능

1. **bcrypt 해싱**: 비밀번호는 bcrypt로 암호화되어 저장
2. **RLS 정책**: Row Level Security로 데이터 접근 제어
3. **토큰 기반**: 비밀번호 재설정을 위한 토큰 시스템
4. **세션 관리**: localStorage를 통한 클라이언트 세션 관리

## 테스트

### 1. 회원가입 테스트
- `test@test.com`으로 회원가입
- 비밀번호: `password123`
- 이름: `테스트 사용자`

### 2. 로그인 테스트
- 같은 이메일/비밀번호로 로그인
- 마이페이지 접근 확인

### 3. 로그아웃 테스트
- 로그아웃 후 로그인 페이지로 리다이렉트 확인

## 문제 해결

### 1. "function does not exist" 에러
- 마이그레이션 파일이 제대로 실행되었는지 확인
- 함수들이 public 스키마에 생성되었는지 확인

### 2. RLS 정책 에러
- profiles 테이블의 RLS 정책이 올바르게 설정되었는지 확인

### 3. 비밀번호 해싱 에러
- pgcrypto 확장이 활성화되었는지 확인

## 주의사항

- **개발용**: 이 시스템은 개발 환경에 최적화되어 있습니다
- **프로덕션**: 실제 서비스에서는 추가 보안 검토가 필요합니다
- **이메일**: 모든 이메일 형식이 허용됩니다 (확인 불필요)
- **세션**: localStorage 기반이므로 브라우저 데이터 삭제 시 로그아웃됩니다

