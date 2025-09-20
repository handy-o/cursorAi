# 📘 UI/UX Design Guide – 인스타그램 클론 프로젝트

---

## 1. Design System Overview

* **참조 서비스 분석 (Instagram)**

  * **디자인 스타일**: 미니멀리즘, 화이트 기반의 심플한 UI, 불필요한 장식 최소화
  * **패턴**: 카드형 피드 레이아웃, 상단 고정 네비게이션(Topbar), 아이콘 중심 인터랙션
  * **무드 & 분위기**: 직관적, 가볍고 친근한 느낌, 사진 콘텐츠에 집중할 수 있도록 절제된 톤

* **제안된 디자인 방향**

  * **스타일**: Modern Minimal (여백 활용 극대화, Flat Design)
  * **컬러 스킴**: 모노톤(흰색/회색/검정) + 브랜드 포인트 컬러(블루/퍼플 그라디언트)
  * **주요 색상**:

    * Primary → #0095F6 (인스타그램 블루)
    * Gradient → #833AB4 → #FD1D1D → #FCAF45 (로고에서 파생)
  * **UI 철학**: "콘텐츠가 UI다" → UI는 배경으로, 사진·피드가 주인공

---

## 2. Color Palette for TailwindCSS

| 역할                         | Tailwind 토큰     | 색상 코드   | 설명           |
| -------------------------- | --------------- | ------- | ------------ |
| **Primary**                | `primary-500`   | #0095F6 | 액션 버튼, 링크    |
| **Primary Gradient Start** | `primary-600`   | #833AB4 | 브랜드 그라디언트 시작 |
| **Primary Gradient Mid**   | `primary-700`   | #FD1D1D | 브랜드 그라디언트 중간 |
| **Primary Gradient End**   | `primary-800`   | #FCAF45 | 브랜드 그라디언트 끝  |
| **Secondary**              | `secondary-500` | #262626 | 본문 텍스트       |
| **Neutral Light**          | `neutral-100`   | #FAFAFA | 배경, 카드 컨테이너  |
| **Neutral Mid**            | `neutral-300`   | #DBDBDB | 구분선, border  |
| **Neutral Dark**           | `neutral-900`   | #000000 | 헤더 텍스트, 아이콘  |
| **Accent**                 | `accent-500`    | #ED4956 | 좋아요, 알림 강조색  |
| **Success**                | `success-500`   | #27AE60 | 성공/완료 피드백    |
| **Warning**                | `warning-500`   | #F2C94C | 경고 UI        |
| **Error**                  | `error-500`     | #EB5757 | 에러 메시지       |

---

## 3. Page Implementations

### 📍 Root Route ("/") – 메인 피드 페이지

* **Core Purpose**: 사용자 피드와 친구 추천 제공
* **Key Components**:

  * 상단 고정 헤더(검색 포함)
  * 피드 카드 (프로필, 이미지, 좋아요/댓글/공유)
  * 오른쪽 사이드바 (내 친구, 추천 친구)
* **Layout Structure**:

  * `Grid: [feed 2/3, sidebar 1/3]` (Desktop 이상)
  * Tablet 이하에서는 사이드바 제거, Mobile에서는 Full Width Feed

**예시 이미지**:
![피드](https://picsum.photos/600/400)

---

### 📍 친구 추천 페이지 ("/suggested")

* **Core Purpose**: 새로운 친구 추천 목록 탐색
* **Key Components**:

  * 사용자 프로필 + “팔로우” 버튼
  * 리스트 뷰
* **Layout Structure**:

  * Desktop: 카드형 리스트
  * Mobile: 세로 스크롤 리스트

**예시 이미지**:
![추천 친구](https://picsum.photos/400/400)

---

## 4. Layout Components

| 컴포넌트                | 적용 경로   | 설명                       | 반응형 동작                   |
| ------------------- | ------- | ------------------------ | ------------------------ |
| **Header (Topbar)** | 모든 페이지  | 로고, 검색, 아이콘(홈/DM/알림/프로필) | Mobile에서는 검색 아이콘만 표시     |
| **FeedCard**        | `/`     | 프로필 이미지, 닉네임, 게시물, 액션 버튼 | 이미지 Full Width           |
| **Sidebar**         | `/`     | 내 친구 목록, 추천 친구           | Tablet 이하에서는 숨김          |
| **SearchBar**       | `/`     | 키워드 입력                   | Desktop 고정 / Mobile 드롭다운 |
| **FooterNav**       | Mobile만 | 홈, 검색, 업로드, 알림, 프로필      | Desktop에서는 미노출           |

---

## 5. Interaction Patterns

* **탭/클릭**: 좋아요, 댓글, 팔로우 버튼
* **호버 상태**: Desktop에서 버튼 hover 시 색상 강조
* **스크롤**: Infinite Scroll 피드 로딩
* **검색**: 자동완성/필터링 제공 (간단 구현 가능)
* **피드백 메시지**: 팔로우 성공 → “팔로우 되었습니다” (toast)

---

## 6. Breakpoints

```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
```

* **Mobile (≤ 767px)**

  * 사이드바 제거, 하단 네비게이션 표시
  * 피드 Full Width

* **Tablet (768px \~ 1023px)**

  * 사이드바 제거, 중앙 정렬된 피드
  * Header 검색창 단순화

* **Desktop (≥ 1024px)**

  * 좌측: 피드 / 우측: 사이드바 표시
  * 검색창 전체 표시

* **Wide (≥ 1440px)**

  * 더 많은 여백 적용
  * Feed와 Sidebar 좌우 패딩 확장

---

✅ 여기까지가 **인스타그램 클론 UI/UX 디자인 가이드**입니다.

원하시면 제가 이걸 **TailwindCSS 예제 코드 (예: FeedCard 컴포넌트)** 형태로 뽑아드릴까요?
