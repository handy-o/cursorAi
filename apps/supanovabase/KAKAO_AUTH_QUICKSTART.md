# 카카오 로그인 빠른 시작 가이드

## 🎯 개요

`easynext auth kakao` 스타일의 간편한 카카오 OAuth 로그인 기능이 추가되었습니다.

## ✅ 추가된 기능

### 1. Next-Auth 카카오 프로바이더
- ✅ KakaoProvider 설정 완료
- ✅ 자동 회원가입 기능
- ✅ 기존 계정 연동 기능
- ✅ JWT 토큰 처리

### 2. UI 컴포넌트
- ✅ 카카오 공식 디자인 로그인 버튼
- ✅ 브랜드 색상 (#FEE500) 적용
- ✅ 카카오 로고 SVG 포함

### 3. 자동화 스크립트
- ✅ 대화형 설정 마법사 (`scripts/setup-kakao-auth.js`)
- ✅ 환경 변수 자동 생성
- ✅ 설정 가이드 통합

## 🚀 5분만에 시작하기

### Step 1: 카카오 개발자 앱 생성

1. [카카오 개발자 콘솔](https://developers.kakao.com/) 접속
2. "내 애플리케이션" → "애플리케이션 추가하기"
3. 앱 이름 입력 후 생성

### Step 2: 앱 키 및 설정

1. **REST API 키 복사** (앱 설정 > 요약 정보)
2. **Client Secret 생성** (앱 설정 > 보안 > 코드 생성 > 활성화 ON)
3. **플랫폼 등록** (앱 설정 > 플랫폼 > Web 등록)
   - `http://localhost:3010`
4. **카카오 로그인 활성화** (제품 설정 > 카카오 로그인 > 활성화 ON)
5. **Redirect URI 등록**
   - `http://localhost:3010/api/auth/callback/kakao`
6. **동의 항목 설정** (필수 동의)
   - 닉네임 (profile_nickname)
   - 이메일 (account_email)

### Step 3: 환경 변수 설정

#### 방법 A: 자동 설정 (추천)

```bash
cd apps/supanovabase
node scripts/setup-kakao-auth.js
```

대화형 마법사가 `.env.local` 파일을 자동으로 생성합니다.

#### 방법 B: 수동 설정

`.env.local` 파일 생성:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Next-Auth
NEXTAUTH_SECRET=your_32_character_secret
NEXTAUTH_URL=http://localhost:3010

# Kakao OAuth
KAKAO_CLIENT_ID=your_rest_api_key
KAKAO_CLIENT_SECRET=your_client_secret
```

**NEXTAUTH_SECRET 생성:**
```bash
openssl rand -base64 32
```

### Step 4: 개발 서버 실행

```bash
npm run dev
```

### Step 5: 테스트

1. 브라우저에서 `http://localhost:3010/auth/login-idpw` 접속
2. "카카오로 시작하기" 버튼 클릭
3. 카카오 로그인 완료 후 자동 회원가입

## 📂 변경된 파일

```
apps/supanovabase/
├── lib/auth.ts                              # ✨ 카카오 프로바이더 추가
├── components/auth/kakao-login-button.tsx   # ✨ 신규 생성
├── app/auth/login-idpw/page.tsx             # ✨ 카카오 버튼 추가
├── scripts/setup-kakao-auth.js              # ✨ 신규 생성
├── KAKAO_OAUTH_SETUP.md                     # ✨ 신규 생성
├── KAKAO_AUTH_QUICKSTART.md                 # ✨ 신규 생성
└── README.md                                # ✨ 업데이트
```

## 💡 사용 예시

### 컴포넌트에서 카카오 로그인 트리거

```tsx
'use client'

import { signIn } from 'next-auth/react';

export default function MyLoginButton() {
  return (
    <button onClick={() => signIn('kakao')}>
      카카오로 시작하기
    </button>
  );
}
```

### 세션 정보 확인

```tsx
'use client'

import { useSession } from 'next-auth/react';

export default function UserInfo() {
  const { data: session } = useSession();
  
  return (
    <div>
      {session?.user?.name}님 환영합니다!
    </div>
  );
}
```

## 🔄 로그인 플로우

```
사용자 클릭 → 카카오 OAuth → 인증 코드 반환
    ↓
Next-Auth가 토큰 교환
    ↓
signIn 콜백: 신규 사용자 확인
    ↓
realAccount 테이블에 자동 생성
    ↓
JWT 토큰 발급 → 세션 설정
    ↓
홈 페이지 리다이렉트
```

## 🗄️ 데이터베이스

카카오 로그인 사용자는 `realAccount` 테이블에 다음 형식으로 저장됩니다:

```sql
username: kakao_{카카오_고유_ID}
email: user@kakao.com
name: 사용자닉네임
password: NULL  -- OAuth 사용자는 비밀번호 없음
provider: kakao
provider_account_id: {카카오_고유_ID}
profile_image_url: {카카오_프로필_이미지}
is_active: true
```

### Migration 적용 필수

카카오 로그인이 정상 작동하려면 다음 migration을 Supabase에 적용해야 합니다:

1. `0001_create_real_account_table.sql` (기본 테이블)
2. `0002_add_oauth_support_to_real_account.sql` (OAuth 지원)

**Migration 적용 방법은 [OAUTH_DATABASE_INTEGRATION.md](./OAUTH_DATABASE_INTEGRATION.md#-migration-적용-방법) 참조**

## 🎨 UI 커스터마이징

`components/auth/kakao-login-button.tsx` 파일을 수정하여 버튼 스타일을 변경할 수 있습니다:

```tsx
// 버튼 크기 변경
className="... py-3 px-4 text-base"

// 둥근 정도 변경
className="... rounded-lg"

// 그림자 추가
className="... shadow-md hover:shadow-lg"
```

## 🛡️ 보안

- ✅ Client Secret 서버 사이드 전용
- ✅ JWT 세션 전략
- ✅ HTTPS 권장 (프로덕션)
- ✅ CSRF 보호 (Next-Auth 기본)
- ✅ 환경 변수 분리

## 🐛 문제 해결

### "Redirect URI mismatch"
→ 카카오 콘솔에서 URI 정확히 확인 (`http://localhost:3010/api/auth/callback/kakao`)

### "Invalid client secret"
→ 카카오 콘솔 > 보안 > Client Secret 활성화 상태 ON 확인

### 로그인 후 에러
→ 브라우저 콘솔 확인 및 Supabase RLS 정책 확인

### 동의 항목 에러
→ 닉네임, 이메일 필수 동의로 설정

## 📚 추가 문서

- **상세 설정 가이드**: [KAKAO_OAUTH_SETUP.md](./KAKAO_OAUTH_SETUP.md)
- **인증 시스템 전체**: [AUTHENTICATION.md](./AUTHENTICATION.md)
- **프로젝트 개요**: [README.md](./README.md)

## 🚢 프로덕션 배포

1. 카카오 콘솔에서 프로덕션 도메인 등록
2. Redirect URI 추가: `https://yourdomain.com/api/auth/callback/kakao`
3. 환경 변수 업데이트:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=new_production_secret
   ```
4. HTTPS 필수

## 🎉 완료!

이제 카카오 로그인이 완전히 통합되었습니다.

```bash
# 개발 서버 시작
npm run dev

# 로그인 페이지 접속
open http://localhost:3010/auth/login-idpw
```

---

**문의사항이 있으시면 [KAKAO_OAUTH_SETUP.md](./KAKAO_OAUTH_SETUP.md)의 참고 자료를 확인하세요.**

