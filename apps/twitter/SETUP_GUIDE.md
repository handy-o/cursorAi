# Twitter 클론 설정 가이드

이 가이드는 Twitter 클론 프로젝트를 로컬 환경에서 실행하는 방법을 안내합니다.

## 📋 사전 요구사항

- Node.js 18.0 이상
- npm
- Supabase 계정

## 🚀 설치 및 실행

### 1. 의존성 설치

```bash
cd apps/twitter
npm install
```

### 2. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com) 접속
2. 새 프로젝트 생성
3. 프로젝트가 생성될 때까지 대기

### 3. 데이터베이스 마이그레이션

1. Supabase 대시보드 → SQL Editor
2. `supabase/migrations/0001_create_users_tables.sql` 파일 열기
3. 전체 내용 복사 → SQL Editor에 붙여넣기
4. "Run" 버튼 클릭

### 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

#### 환경 변수 가져오기

**Supabase 설정:**
1. Supabase 대시보드 → Settings → API
2. Project URL → `NEXT_PUBLIC_SUPABASE_URL`
3. anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. service_role → `SUPABASE_SERVICE_ROLE_KEY`

**NextAuth Secret 생성:**
```bash
openssl rand -base64 32
```
또는 온라인 생성기 사용: https://generate-secret.vercel.app/32

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 📱 주요 기능

### ✅ 구현된 기능

- **인증 시스템**
  - 이메일 회원가입
  - 로그인/로그아웃
  - 세션 관리

- **트윗 기능**
  - 트윗 작성 (최대 280자)
  - 트윗 삭제
  - 실시간 트윗 업데이트

- **소셜 기능**
  - 좋아요
  - 답글 (댓글)
  - 답글 보기/숨기기

- **UI/UX**
  - Twitter 스타일 디자인
  - 반응형 레이아웃
  - 실시간 업데이트
  - 사이드바 네비게이션

## 🎨 디자인 시스템

- **Primary Color**: Orange (#FF7A00)
- **폰트**: 시스템 기본 폰트
- **컴포넌트**: shadcn-ui 기반
- **스타일링**: Tailwind CSS

## 📁 프로젝트 구조

```
apps/twitter/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/  # NextAuth API
│   │   │       └── signup/         # 회원가입 API
│   │   ├── auth/
│   │   │   ├── signin/             # 로그인 페이지
│   │   │   └── signup/             # 회원가입 페이지
│   │   ├── layout.tsx              # 루트 레이아웃
│   │   ├── page.tsx                # 홈 페이지
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                     # 재사용 UI 컴포넌트
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # 사이드바
│   │   │   └── MainLayout.tsx      # 메인 레이아웃
│   │   └── tweet/
│   │       ├── TweetComposer.tsx   # 트윗 작성
│   │       ├── TweetList.tsx       # 트윗 목록
│   │       └── TweetCard.tsx       # 트윗 카드
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # 클라이언트 Supabase
│   │   │   └── server.ts           # 서버 Supabase
│   │   ├── api/                    # API 함수
│   │   └── utils.ts                # 유틸리티
│   └── types/                      # TypeScript 타입
├── supabase/
│   └── migrations/                 # DB 마이그레이션
├── auth.ts                         # NextAuth 설정
└── middleware.ts                   # Next.js 미들웨어
```

## 🔧 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **인증**: NextAuth v5
- **데이터베이스**: Supabase (PostgreSQL)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn-ui
- **폼 관리**: react-hook-form
- **유효성 검사**: Zod
- **아이콘**: Lucide React
- **날짜 포맷**: date-fns

## 🐛 문제 해결

### 로그인이 안 되는 경우

1. Supabase Auth가 활성화되어 있는지 확인
2. 환경 변수가 올바른지 확인
3. `.env.local` 파일 수정 후 개발 서버 재시작

### 트윗이 표시되지 않는 경우

1. 데이터베이스 마이그레이션이 완료되었는지 확인
2. RLS 정책이 올바르게 설정되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 실시간 업데이트가 작동하지 않는 경우

1. Supabase Realtime이 활성화되어 있는지 확인
2. 브라우저를 새로고침

## 📝 다음 단계

### 추가 기능 아이디어

- [ ] 이미지 업로드
- [ ] 프로필 편집
- [ ] 사용자 팔로우/언팔로우
- [ ] 북마크
- [ ] 검색 기능
- [ ] 해시태그
- [ ] 멘션 (@username)
- [ ] 알림 시스템
- [ ] 다크 모드 토글

### 성능 최적화

- [ ] 무한 스크롤
- [ ] 이미지 최적화
- [ ] 코드 스플리팅
- [ ] 캐싱 전략

## 📄 라이선스

이 프로젝트는 학습 목적으로 만들어졌습니다.


