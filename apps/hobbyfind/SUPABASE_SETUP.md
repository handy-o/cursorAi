# Supabase 설정 가이드

## 이메일 확인 문제 해결

### 방법 1: Supabase 대시보드에서 설정 (가장 간단)

1. **Supabase 대시보드** 접속
2. **Authentication** → **Settings** 메뉴
3. **Email Confirmation** 섹션에서:
   - ✅ **"Enable email confirmations"** 체크 해제
   - 또는
   - ✅ **"Confirm email"** 값을 `false`로 설정

### 방법 2: SQL로 기존 사용자 이메일 확인 강제 완료

Supabase SQL Editor에서 다음 쿼리 실행:

```sql
-- 모든 미확인 사용자의 이메일을 확인된 상태로 만들기
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
```

### 방법 3: 특정 사용자만 이메일 확인 완료

```sql
-- 특정 이메일만 확인 완료
UPDATE auth.users 
SET email_confirmed_at = NOW()
WHERE email = 'your-email@example.com';
```

### 방법 4: 새 사용자 자동 이메일 확인

`supabase/migrations/005_force_email_confirmation.sql` 파일 실행

## 데이터베이스 구조 확인

### auth.users 테이블 (Supabase 관리)
- `id`: 사용자 UUID
- `email`: 이메일 주소
- `encrypted_password`: 암호화된 비밀번호
- `email_confirmed_at`: 이메일 확인 시간
- `created_at`: 생성 시간
- `last_sign_in_at`: 마지막 로그인 시간

### public.profiles 테이블 (우리가 만든 테이블)
- `id`: auth.users.id와 연결
- `email`: 이메일 주소 (복사본)
- `name`: 사용자 이름
- `phone`: 전화번호
- `avatar_url`: 프로필 이미지
- `created_at`: 생성 시간
- `updated_at`: 수정 시간

## 문제 해결 체크리스트

1. ✅ **환경 변수 설정**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. ✅ **마이그레이션 파일 실행**
   - `001_initial_schema.sql`
   - `002_sample_data.sql`
   - `005_force_email_confirmation.sql` (선택사항)

3. ✅ **이메일 확인 설정**
   - 대시보드에서 이메일 확인 비활성화
   - 또는 SQL로 기존 사용자 이메일 확인 완료

4. ✅ **RLS 정책 확인**
   - profiles 테이블에 적절한 RLS 정책이 있는지 확인

## 테스트 방법

1. 새 계정으로 회원가입
2. 즉시 로그인 시도
3. 성공하면 설정 완료!

## 주의사항

- 이메일 확인을 비활성화하는 것은 **개발 환경에서만** 권장
- 프로덕션에서는 보안을 위해 이메일 확인 활성화 필요
- `auth.users` 테이블은 Supabase에서 관리하므로 직접 수정하지 말 것


