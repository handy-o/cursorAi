# Supanovabase - Supabase Integration Project

이 프로젝트는 Next.js와 Supabase를 연동한 프로젝트입니다.

## 🚀 시작하기

### 1. 환경변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Next-Auth
NEXTAUTH_URL=http://localhost:3010
NEXTAUTH_SECRET=your-nextauth-secret-key

# Kakao OAuth (선택사항)
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret
```

#### 자동 설정 스크립트

대화형 설정 마법사를 사용하여 쉽게 설정할 수 있습니다:

```bash
node scripts/setup-kakao-auth.js
```

**Supabase 설정:**
- [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택 → Settings → API

**Next-Auth Secret 생성:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3010](http://localhost:3010)을 열어 결과를 확인할 수 있습니다.

### 3. 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
supanovabase/
├── app/              # Next.js App Router 페이지
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/ # Next-Auth API 라우트
│   ├── auth/
│   │   ├── login-idpw/ # 로그인 페이지
│   │   └── signup/     # 회원가입 페이지
│   ├── layout.tsx    # 루트 레이아웃
│   ├── page.tsx      # 홈 페이지
│   └── providers.tsx # 글로벌 Provider 설정 (React Query, Next-Auth)
├── components/       # 공통 컴포넌트
│   └── auth/
│       ├── auth-provider.tsx
│       └── kakao-login-button.tsx # 카카오 로그인 버튼
├── lib/              # 공통 설정 & 유틸리티
│   └── auth.ts       # Next-Auth 설정 (카카오 OAuth 포함)
├── scripts/          # 유틸리티 스크립트
│   └── setup-kakao-auth.js # 카카오 OAuth 설정 마법사
├── src/              # 비즈니스 로직
│   ├── features/     # 기능별 모듈
│   │   └── account/  # 계정 관리 기능
│   │       └── api.ts # 계정 API 함수
│   ├── lib/
│   │   └── supabase/ # Supabase 클라이언트 설정
│   │       ├── client.ts  # 클라이언트 사이드
│   │       └── server.ts  # 서버 사이드
│   └── types/        # TypeScript 타입 정의
│       └── account.ts # 계정 타입 정의
├── supabase/
│   └── migrations/   # 데이터베이스 마이그레이션 파일
│       ├── 0001_create_real_account_table.sql
│       └── 20251012000000_create_account_table.sql
├── AUTHENTICATION.md      # 인증 설정 가이드
├── KAKAO_OAUTH_SETUP.md   # 카카오 OAuth 설정 가이드
└── public/           # 정적 파일
```

## 🛠️ Supabase 사용법

### 클라이언트 컴포넌트에서

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  // Supabase 사용
  const fetchData = async () => {
    const { data, error } = await supabase.from('your_table').select('*')
  }
  
  return <div>...</div>
}
```

### 서버 컴포넌트에서

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()
  
  // Supabase 사용
  const { data, error } = await supabase.from('your_table').select('*')
  
  return <div>...</div>
}
```

## 🔐 인증 (Next-Auth)

이 프로젝트는 다음 인증 방식을 지원합니다:
- 아이디/비밀번호 로그인
- 카카오 소셜 로그인

### 카카오 로그인 설정

카카오 로그인을 사용하려면 [KAKAO_OAUTH_SETUP.md](./KAKAO_OAUTH_SETUP.md) 문서를 참고하세요.

**빠른 설정:**
1. [카카오 개발자 콘솔](https://developers.kakao.com/)에서 앱 생성
2. REST API 키와 Client Secret 발급
3. Redirect URI 등록: `http://localhost:3010/api/auth/callback/kakao`
4. `.env.local`에 환경 변수 추가
5. 개발 서버 재시작

### 세션 사용하기

```tsx
'use client'

import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <div>로딩 중...</div>;
  if (status === 'unauthenticated') return <div>로그인이 필요합니다.</div>;
  
  return <div>환영합니다, {session?.user?.name}님!</div>;
}
```

### 로그인/로그아웃

```tsx
'use client'

import { signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  return (
    <div>
      {/* 일반 로그인 페이지로 이동 */}
      <button onClick={() => signIn()}>로그인</button>
      
      {/* 카카오 로그인 */}
      <button onClick={() => signIn('kakao')}>카카오 로그인</button>
      
      {/* 아이디/비밀번호 로그인 */}
      <button onClick={() => signIn('credentials')}>ID/PW 로그인</button>
      
      {/* 로그아웃 */}
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
}
```

## 🔄 React Query 사용하기

React Query는 서버 상태 관리를 위해 이미 설정되어 있습니다.

```tsx
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApi } from '@/features/account/api';

export default function AccountList() {
  const queryClient = useQueryClient();
  
  // 데이터 조회
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.getAll(),
  });
  
  // 데이터 생성
  const createMutation = useMutation({
    mutationFn: accountApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
  
  if (isLoading) return <div>로딩 중...</div>;
  
  return (
    <div>
      {accounts?.map(account => (
        <div key={account.id}>{account.name}</div>
      ))}
    </div>
  );
}
```

## 📦 포함된 라이브러리

- [Next.js](https://nextjs.org) 15.5.4
- [React](https://react.dev) 19.1.0
- [Supabase SSR](https://supabase.com/docs/guides/auth/server-side-rendering) 0.5.2
- [Next-Auth](https://next-auth.js.org) 4.24.5 - 인증 라이브러리 (카카오 OAuth 지원)
- [TanStack Query (React Query)](https://tanstack.com/query) - 서버 상태 관리
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - 비밀번호 해싱
- [Tailwind CSS](https://tailwindcss.com) v4
- [TypeScript](https://www.typescriptlang.org) 5.x

## 🌐 배포

이 프로젝트는 GitHub Pages에 `/supabase` 경로로 배포됩니다.

루트에서 `npm run build:all`을 실행하면 자동으로 빌드되어 `docs/supabase` 폴더에 결과물이 생성됩니다.

## 📝 데이터베이스 마이그레이션

`supabase/migrations/` 폴더에 SQL 마이그레이션 파일을 저장하세요.

### 마이그레이션 실행 방법

1. Supabase Dashboard 접속: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. 프로젝트 선택
3. SQL Editor 메뉴 선택
4. `supabase/migrations/` 폴더의 SQL 파일 내용을 **순서대로** 복사하여 실행

### 포함된 마이그레이션

#### 0001: 기본 인증 테이블 생성

`0001_create_real_account_table.sql` - `realAccount` 테이블 생성 (ID/PW 로그인용)

#### 0002: OAuth 지원 추가

`0002_add_oauth_support_to_real_account.sql` - OAuth 소셜 로그인 지원 확장

- provider, provider_account_id, profile_image_url 컬럼 추가
- `upsert_oauth_account` 함수 생성
- OAuth 계정 관리 정책 추가

**자세한 내용**: [OAUTH_DATABASE_INTEGRATION.md](./OAUTH_DATABASE_INTEGRATION.md)

### 포함된 테이블

#### realAccount 테이블

실제 사용자 인증 정보를 관리하는 테이블입니다. ID/PW 로그인과 OAuth 로그인 모두 지원합니다.

**컬럼:**
- `id` (UUID): 사용자 고유 식별자
- `username` (TEXT): 로그인 아이디 (중복 불가)
- `password` (TEXT, nullable): bcrypt 해시 비밀번호 (OAuth는 NULL)
- `name` (TEXT): 사용자 이름
- `email` (TEXT): 이메일 (중복 불가)
- `provider` (TEXT): 인증 제공자 (credentials, kakao, google, naver)
- `provider_account_id` (TEXT): OAuth 제공자 고유 ID
- `profile_image_url` (TEXT): 프로필 이미지 URL
- `is_active` (BOOLEAN): 계정 활성화 상태
- `created_at` (TIMESTAMPTZ): 생성 일시
- `updated_at` (TIMESTAMPTZ): 수정 일시

#### account 테이블

사용자 계정 정보를 관리하는 테이블입니다.

**컬럼:**
- `id` (UUID): 사용자 고유 식별자
- `name` (TEXT): 사용자 이름
- `nickname` (TEXT): 사용자 닉네임 (중복 불가)
- `gender` (TEXT): 사용자 성별 (male, female, other)
- `email` (TEXT): 사용자 이메일 (중복 불가)
- `birth_date` (DATE): 사용자 생년월일
- `created_at` (TIMESTAMPTZ): 계정 생성 일시
- `updated_at` (TIMESTAMPTZ): 계정 수정 일시

**사용 예시:**

```typescript
import { accountApi } from '@/features/account/api';

// 모든 계정 조회
const accounts = await accountApi.getAll();

// 계정 생성
const newAccount = await accountApi.create({
  name: '홍길동',
  nickname: 'gildong',
  gender: 'male',
  email: 'gildong@example.com',
  birth_date: '1990-01-01',
});

// 계정 수정
const updatedAccount = await accountApi.update(accountId, {
  nickname: 'newNickname',
});

// 계정 삭제
await accountApi.delete(accountId);
```
