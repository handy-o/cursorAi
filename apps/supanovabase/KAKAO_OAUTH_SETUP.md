# 카카오 OAuth 로그인 설정 가이드

카카오 소셜 로그인 기능이 성공적으로 추가되었습니다. 이 가이드는 카카오 개발자 콘솔 설정 및 환경 변수 구성 방법을 안내합니다.

## 설정 완료 항목 ✅

1. **Next-Auth 카카오 프로바이더 추가**
   - `lib/auth.ts`에 KakaoProvider 설정
   - 자동 회원가입 로직 구현
   - JWT 토큰 처리 콜백 추가

2. **카카오 로그인 버튼 컴포넌트**
   - `components/auth/kakao-login-button.tsx` 생성
   - 카카오 공식 브랜드 색상 적용 (#FEE500)
   - 카카오 로고 SVG 포함

3. **로그인 페이지 통합**
   - `app/auth/login-idpw/page.tsx` 업데이트
   - ID/PW 로그인과 카카오 로그인 구분

## 카카오 개발자 콘솔 설정

### 1단계: 카카오 개발자 계정 생성

1. [카카오 개발자 콘솔](https://developers.kakao.com/) 접속
2. 카카오 계정으로 로그인
3. 우측 상단 "내 애플리케이션" 클릭

### 2단계: 애플리케이션 생성

1. "애플리케이션 추가하기" 버튼 클릭
2. 앱 이름 입력 (예: "Supanovabase")
3. 사업자명 입력
4. "저장" 버튼 클릭

### 3단계: 앱 키 확인

애플리케이션 생성 후 "앱 설정 > 요약 정보" 페이지에서:

- **REST API 키**: `.env.local`의 `KAKAO_CLIENT_ID`로 사용
- **JavaScript 키**: 웹 앱에서 사용 (선택사항)

```env
KAKAO_CLIENT_ID=your_rest_api_key_here
```

### 4단계: Client Secret 생성 (보안 강화)

1. "앱 설정 > 보안" 메뉴 선택
2. "Client Secret" 섹션으로 이동
3. "코드 생성" 버튼 클릭
4. 생성된 코드를 복사하여 `.env.local`에 추가:

```env
KAKAO_CLIENT_SECRET=your_client_secret_here
```

5. "활성화 상태"를 **ON**으로 변경

### 5단계: 플랫폼 설정

1. "앱 설정 > 플랫폼" 메뉴 선택
2. "Web 플랫폼 등록" 버튼 클릭
3. 사이트 도메인 등록:
   - 개발 환경: `http://localhost:3010`
   - 프로덕션: `https://yourdomain.com`

### 6단계: Redirect URI 설정

1. "제품 설정 > 카카오 로그인" 메뉴 선택
2. "활성화 설정"을 **ON**으로 변경
3. "Redirect URI 등록" 섹션으로 이동
4. "Redirect URI" 추가:

**개발 환경:**
```
http://localhost:3010/api/auth/callback/kakao
```

**프로덕션 환경:**
```
https://yourdomain.com/api/auth/callback/kakao
```

### 7단계: 동의 항목 설정

1. "제품 설정 > 카카오 로그인 > 동의 항목" 메뉴 선택
2. 다음 항목을 **필수 동의**로 설정:
   - 닉네임 (profile_nickname)
   - 이메일 (account_email)

3. "설정" 버튼을 클릭하여 각 항목 활성화

## 환경 변수 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 내용을 추가하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next-Auth
NEXTAUTH_SECRET=your_nextauth_secret_minimum_32_characters
NEXTAUTH_URL=http://localhost:3010

# Kakao OAuth
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

### NEXTAUTH_SECRET 생성 방법

터미널에서 다음 명령 실행:

```bash
openssl rand -base64 32
```

또는 Node.js에서:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 데이터베이스 스키마

카카오 로그인 사용자는 자동으로 `realAccount` 테이블에 저장됩니다:

```sql
-- 카카오 로그인 사용자 예시
username: kakao_1234567890
email: user@kakao.com
name: 홍길동
password: NULL  -- OAuth 사용자는 비밀번호 없음
provider: kakao
provider_account_id: 1234567890
profile_image_url: https://k.kakaocdn.net/.../profile.jpg
is_active: true
```

### 데이터베이스 Migration

OAuth 지원을 위한 테이블 확장은 `0002_add_oauth_support_to_real_account.sql` migration에서 처리됩니다:

- ✅ `provider` 컬럼: 인증 제공자 (credentials, kakao, google, naver)
- ✅ `provider_account_id` 컬럼: OAuth 제공자의 사용자 고유 ID
- ✅ `profile_image_url` 컬럼: 프로필 이미지 URL
- ✅ `password` 컬럼: NULL 허용으로 변경
- ✅ `upsert_oauth_account` 함수: 안전한 사용자 생성/업데이트

**자세한 내용은 [OAUTH_DATABASE_INTEGRATION.md](./OAUTH_DATABASE_INTEGRATION.md) 참조**

## 테스트 방법

1. 개발 서버 실행:
```bash
cd apps/supanovabase
npm run dev
```

2. 브라우저에서 접속:
```
http://localhost:3010/auth/login-idpw
```

3. "카카오로 시작하기" 버튼 클릭

4. 카카오 로그인 페이지에서 로그인

5. 동의 항목 확인 후 "동의하고 계속하기" 클릭

6. 자동으로 홈 페이지(`/`)로 리다이렉트

## 로그인 플로우

```
1. 사용자가 "카카오로 시작하기" 버튼 클릭
   ↓
2. 카카오 OAuth 페이지로 리다이렉트
   ↓
3. 사용자가 카카오 계정으로 로그인
   ↓
4. 카카오가 Redirect URI로 인증 코드 전송
   ↓
5. Next-Auth가 인증 코드를 액세스 토큰으로 교환
   ↓
6. signIn 콜백에서 사용자 정보 확인
   ↓
7. 기존 사용자가 아니면 realAccount 테이블에 자동 생성
   ↓
8. JWT 토큰 생성 및 세션 설정
   ↓
9. 홈 페이지로 리다이렉트
```

## 보안 고려사항

✅ **구현된 보안 기능:**
- Client Secret을 사용한 보안 강화
- JWT 세션 전략 사용
- 환경 변수를 통한 민감 정보 관리
- HTTPS 사용 권장 (프로덕션)
- CSRF 보호 (Next-Auth 기본 제공)

⚠️ **주의사항:**
- `.env.local` 파일을 절대 Git에 커밋하지 마세요
- 프로덕션 배포 시 HTTPS 필수
- Redirect URI는 정확히 일치해야 함
- Client Secret은 서버 사이드에서만 사용

## 문제 해결

### 1. "Redirect URI mismatch" 오류

**원인**: 등록된 Redirect URI와 실제 요청 URI가 다름

**해결방법**:
- 카카오 개발자 콘솔에서 Redirect URI 확인
- `http://localhost:3010/api/auth/callback/kakao` 정확히 등록
- 포트번호 확인 (3010)

### 2. "Invalid client secret" 오류

**원인**: Client Secret이 잘못되었거나 비활성화됨

**해결방법**:
- 카카오 개발자 콘솔 > 보안 > Client Secret 확인
- "활성화 상태"가 ON인지 확인
- `.env.local`의 `KAKAO_CLIENT_SECRET` 값 재확인

### 3. 카카오 로그인 후 회원가입 실패

**원인**: Supabase 연결 오류 또는 RLS 정책 문제

**해결방법**:
```bash
# 1. Supabase 연결 확인
# 브라우저 개발자 도구 콘솔에서 에러 확인

# 2. RLS 정책 확인
# Supabase 대시보드 > Authentication > Policies
# realAccount 테이블의 INSERT 정책 확인
```

### 4. 동의 항목 오류

**원인**: 필수 동의 항목이 설정되지 않음

**해결방법**:
- 카카오 개발자 콘솔 > 제품 설정 > 카카오 로그인 > 동의 항목
- 닉네임과 이메일을 필수 동의로 설정

## 프로덕션 배포 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] 프로덕션 도메인으로 Redirect URI 등록
- [ ] 프로덕션 환경 변수 설정
  - [ ] `NEXTAUTH_URL`을 프로덕션 도메인으로 변경
  - [ ] `NEXTAUTH_SECRET`을 새로 생성
- [ ] HTTPS 설정 완료
- [ ] 카카오 개발자 콘솔에서 프로덕션 플랫폼 등록
- [ ] Supabase 프로덕션 환경 설정

## 추가 기능 확장

### 소셜 로그인 추가하기

동일한 방식으로 다른 소셜 로그인도 추가 가능:

```typescript
// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

export const authOptions: NextAuthOptions = {
  providers: [
    // ... 기존 프로바이더
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
};
```

### 사용자 프로필 정보 더 가져오기

카카오 API를 통해 추가 정보 요청:

```typescript
// lib/auth.ts - signIn 콜백에서
if (account?.provider === 'kakao') {
  // profile에 카카오 사용자 정보가 포함됨
  const kakaoProfile = profile as any;
  
  const nickname = kakaoProfile.kakao_account?.profile?.nickname;
  const profileImage = kakaoProfile.kakao_account?.profile?.profile_image_url;
  const ageRange = kakaoProfile.kakao_account?.age_range;
  const gender = kakaoProfile.kakao_account?.gender;
  
  // 데이터베이스에 저장
}
```

## 참고 자료

- [카카오 로그인 공식 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
- [Next-Auth 공식 문서](https://next-auth.js.org/)
- [Next-Auth 카카오 프로바이더](https://next-auth.js.org/providers/kakao)
- [Supabase 공식 문서](https://supabase.com/docs)

## 지원

문제가 발생하면 다음을 확인하세요:
1. 브라우저 개발자 도구 콘솔
2. 서버 터미널 로그
3. Supabase 대시보드 로그
4. 카카오 개발자 콘솔 설정

---

**마지막 업데이트**: 2025-10-12
**버전**: 1.0.0

