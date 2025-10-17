# 🔧 비밀번호 해시 수정 가이드

## 문제 상황

초기 migration에서 사용한 bcrypt 해시가 실제 비밀번호와 맞지 않아 로그인이 실패했습니다.

## ✅ 해결 방법

올바른 bcrypt 해시를 생성하여 적용했습니다.

### 생성된 올바른 해시

```
admin / admin1234
해시: $2b$10$bjmtQEjz9AoeZl8GfbiPEuojHAMu1KRAm2uYpcIdsysG6tgHFQFsa

user / user1234
해시: $2b$10$Gtf7CJhp5kmmIwkeKXubYu8zZFAdLk.bhBQruUjRzj4CzINgy/x6m
```

## 🚀 Supabase에서 업데이트하기

### 방법 1: Migration 파일 실행 (권장)

1. Supabase 대시보드 접속
2. **SQL Editor** 메뉴 클릭
3. 다음 파일 내용 복사:
   ```
   supabase/migrations/0002_update_password_hashes.sql
   ```
4. SQL Editor에 붙여넣기
5. **Run** 버튼 클릭

### 방법 2: 직접 SQL 실행

Supabase SQL Editor에서 다음 SQL을 복사하여 실행:

```sql
-- admin 비밀번호 업데이트
UPDATE public."realAccount" 
SET password = '$2b$10$bjmtQEjz9AoeZl8GfbiPEuojHAMu1KRAm2uYpcIdsysG6tgHFQFsa'
WHERE username = 'admin';

-- user 비밀번호 업데이트
UPDATE public."realAccount" 
SET password = '$2b$10$Gtf7CJhp5kmmIwkeKXubYu8zZFAdLk.bhBQruUjRzj4CzINgy/x6m'
WHERE username = 'user';

-- 결과 확인
SELECT username, name, email, is_active FROM public."realAccount";
```

## ✅ 테스트

업데이트 후 다음 계정으로 로그인 테스트:

- **관리자**: `admin` / `admin1234`
- **일반 사용자**: `user` / `user1234`

## 🔍 해시 확인 방법

올바른 해시가 적용되었는지 확인:

```sql
SELECT username, 
       LEFT(password, 29) as password_prefix,
       LENGTH(password) as password_length
FROM public."realAccount";
```

**예상 결과**:
- password_prefix: `$2b$10$...`로 시작
- password_length: `60` (bcrypt 해시는 항상 60자)

## 📝 참고

- Migration 파일도 업데이트되었으므로, 새로 설치 시 올바른 해시가 자동으로 적용됩니다
- bcrypt 해시는 매번 다르게 생성되므로, 위의 해시와 다를 수 있습니다 (정상입니다)
- 비밀번호는 `admin1234`와 `user1234`로 동일하게 사용하면 됩니다

## 🎉 완료!

SQL 실행 후 http://localhost:3010/auth/login-idpw 에서 로그인을 다시 시도해보세요!


