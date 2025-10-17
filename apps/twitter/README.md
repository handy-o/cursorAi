# 🐦 Twitter Clone

Next.js와 Supabase를 사용한 풀스택 Twitter 클론 프로젝트입니다.

## ✨ 주요 기능

- ✅ **인증**: 이메일 회원가입/로그인
- ✅ **트윗**: 작성, 삭제 (최대 280자)
- ✅ **답글**: 트윗에 댓글 달기
- ✅ **좋아요**: 트윗 좋아요 기능
- ✅ **실시간**: 실시간 트윗 업데이트
- ✅ **반응형**: 모바일/태블릿/데스크톱 지원
- ✅ **Twitter 스타일**: 세련된 UI/UX

## 🚀 빠른 시작

### 1. 패키지 설치

```bash
cd apps/twitter
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

자세한 설정 방법은 [SETUP_GUIDE.md](./SETUP_GUIDE.md)를 참고하세요.

### 3. 데이터베이스 마이그레이션

Supabase 대시보드에서 `supabase/migrations/0001_create_users_tables.sql` 실행

### 4. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 접속

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 스타일링
- **shadcn-ui** - UI 컴포넌트

### 백엔드
- **Supabase** - PostgreSQL 데이터베이스
- **NextAuth v5** - 인증 시스템
- **Supabase Realtime** - 실시간 기능

### 라이브러리
- **date-fns** - 날짜 포맷팅
- **lucide-react** - 아이콘
- **react-hook-form** - 폼 관리
- **zod** - 스키마 검증

## 디렉토리 구조

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # 루트 레이아웃
│   ├── page.tsx      # 홈 페이지
│   └── globals.css   # 글로벌 스타일
├── components/       # 재사용 가능한 컴포넌트
├── hooks/           # 커스텀 훅
├── lib/             # 유틸리티 함수
│   └── supabase/    # Supabase 클라이언트
│       ├── client.ts # 클라이언트 컴포넌트용
│       └── server.ts # 서버 컴포넌트용
└── types/           # TypeScript 타입 정의

supabase/
└── migrations/      # 데이터베이스 마이그레이션
    └── 0001_create_users_tables.sql
```

## 📸 스크린샷

### 주요 화면
- **홈**: 트윗 피드, 작성, 좋아요, 답글
- **로그인/회원가입**: 깔끔한 인증 UI
- **사이드바**: Twitter 스타일 네비게이션

## 🔐 데이터베이스 스키마

### 주요 테이블
- `profiles` - 사용자 프로필
- `tweets` - 트윗 데이터
- `likes` - 좋아요
- `follows` - 팔로우 관계
- `bookmarks` - 북마크

### 보안
- Row Level Security (RLS) 활성화
- 사용자별 데이터 접근 제어
- 안전한 인증 처리

## 📖 문서

- [설치 가이드](./SETUP_GUIDE.md) - 상세 설정 방법
- [Supabase 설정](./SUPABASE_SETUP.md) - DB 설정
- [환경 변수](./ENV_SETUP.md) - 환경 변수 가이드

## 빌드

```bash
npm run build
npm run start
```

