# HobbyFind

취미를 찾고 공유하는 플랫폼입니다. 개인의 취향에 맞는 취미를 추천받고, 다양한 취미 활동을 탐색할 수 있습니다.

## 주요 기능

- **취미 찾기**: 개인 취향에 맞는 취미 추천 설문
- **취미 탐색**: 카테고리별 취미 목록 조회
- **취미 상세**: 각 취미의 자세한 정보 및 예약
- **마이페이지**: 찜한 취미 및 예약 내역 관리
- **실시간 채팅**: 채널톡을 통한 고객 지원

## 기술 스택

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Deployment**: GitHub Pages

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── hobby/          # 취미 상세 페이지
│   ├── login/          # 로그인 페이지
│   ├── mypage/         # 마이페이지
│   ├── search/         # 취미 탐색 페이지
│   ├── signup/         # 회원가입 페이지
│   └── survey/         # 취미 찾기 설문
├── components/         # 재사용 가능한 컴포넌트
├── hooks/             # 커스텀 훅
├── lib/               # 유틸리티 함수 및 데이터
└── types/             # TypeScript 타입 정의
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# GitHub Pages 배포용 빌드
npm run deploy
```

## 배포

이 프로젝트는 GitHub Pages를 통해 자동 배포됩니다.

- **Live URL**: https://handy-o.github.io/cursorAi/hobbyfind/

## 라이선스

MIT License
