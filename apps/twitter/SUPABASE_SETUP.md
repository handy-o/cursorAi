# Supabase 설정 가이드

Twitter 클론 프로젝트의 Supabase 데이터베이스 설정 가이드입니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 웹사이트 접속
2. 새 프로젝트 생성
3. 프로젝트 이름, 데이터베이스 비밀번호, 리전 설정

## 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 값을 설정하세요:

```bash
# Supabase 프로젝트 설정에서 확인
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 환경 변수 찾는 방법

1. Supabase 대시보드 → Project Settings → API
2. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

## 3. 데이터베이스 마이그레이션

### SQL 에디터로 실행

1. Supabase 대시보드 → SQL Editor
2. `supabase/migrations/0001_create_users_tables.sql` 파일 내용 복사
3. SQL Editor에 붙여넣기
4. "Run" 버튼 클릭

### 생성되는 테이블

- **profiles**: 사용자 프로필 정보
- **tweets**: 트윗 데이터
- **likes**: 좋아요 정보
- **follows**: 팔로우 관계
- **bookmarks**: 북마크한 트윗

## 4. 인증 설정 (선택사항)

### 이메일 인증 활성화

1. Supabase 대시보드 → Authentication → Providers
2. Email 활성화

### OAuth 설정 (Google, GitHub 등)

1. Authentication → Providers
2. 원하는 OAuth 제공자 활성화
3. Client ID와 Secret 입력

## 5. Storage 설정 (선택사항)

프로필 이미지나 트윗 이미지를 업로드하려면:

1. Storage → Create bucket
2. Bucket 이름: `avatars`, `tweet-images` 등
3. Public bucket으로 설정 (또는 RLS 정책 추가)

## 6. API 사용 예시

### 클라이언트 컴포넌트에서 사용

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export default function MyComponent() {
  const supabase = createClient()
  
  const fetchTweets = async () => {
    const { data, error } = await supabase
      .from('tweets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) console.error(error)
    return data
  }
  
  // ...
}
```

### 서버 컴포넌트에서 사용

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()
  
  const { data: tweets } = await supabase
    .from('tweets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)
  
  return (
    // ...
  )
}
```

## 7. Row Level Security (RLS)

마이그레이션 스크립트에는 기본 RLS 정책이 포함되어 있습니다:

- ✅ 모든 프로필과 트윗은 공개적으로 조회 가능
- ✅ 사용자는 자신의 프로필만 수정 가능
- ✅ 사용자는 자신의 트윗만 삭제 가능
- ✅ 북마크는 본인만 조회 가능

필요에 따라 추가 정책을 설정하세요.

## 8. 실시간 구독 (선택사항)

```typescript
const supabase = createClient()

supabase
  .channel('tweets')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'tweets' },
    (payload) => {
      console.log('New tweet:', payload.new)
    }
  )
  .subscribe()
```

## 문제 해결

### 연결 오류

- 환경 변수가 올바른지 확인
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 개발 서버 재시작

### RLS 오류

- Supabase 대시보드에서 RLS 정책 확인
- 인증된 사용자로 요청하는지 확인

### 마이그레이션 오류

- SQL 문법 오류 확인
- 테이블이 이미 존재하는지 확인
- 권한 문제 확인

## 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js와 Supabase 연동](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)


