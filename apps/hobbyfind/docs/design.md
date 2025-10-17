# 🎨 UI/UX Design Guide — “HobbyMate”

*Role: Senior UI/UX Designer*
*Design Style: Playful · 심플한 · 발랄한 · 활동적인 · 직관적인*
*Primary Color: `rgb(255, 212, 0)`*
*Color Scheme: Triadic*

---

## 📚 목차

1. [Design System Overview](#design-system-overview)
2. [Color Palette for TailwindCSS](#color-palette-for-tailwindcss)
3. [Page Implementations](#page-implementations)
4. [Layout Components](#layout-components)
5. [Interaction Patterns](#interaction-patterns)
6. [Breakpoints](#breakpoints)

---

## 1. 🧭 Design System Overview

### 🎨 디자인 방향성

* **심플(Simple)**: 정보는 최소 단위로 정리, 불필요한 시각 요소 배제
* **발랄(Playful)**: 경쾌한 컬러와 곡선 형태의 컴포넌트 사용
* **활동적(Active)**: CTA 버튼을 강조하고, 시선을 유도하는 인터랙션 활용
* **직관적(Intuitive)**: 핵심 액션(검색, 찜, 예약)을 바로 식별 가능하게 배치

### 📐 Grid & Layout 원칙

* **Grid system**: `12 columns` 기준
* **Gutter**: `16px` (mobile) ~ `32px` (desktop)
* **Container max-width**: `1440px`
* 콘텐츠는 넓은 여백과 명확한 구획을 통해 **가독성**을 높인다.

---

## 2. 🎨 Color Palette for TailwindCSS

Triadic 컬러 스킴을 기반으로 명확한 대비와 발랄함을 강조.
Primary는 노란색 계열, Secondary와 Accent는 삼각 보색관계 색상을 선택.

| 역할            | Color | Tailwind Custom Token | HEX       | RGB                  | 설명                     |
| ------------- | ----- | --------------------- | --------- | -------------------- | ---------------------- |
| Primary       | 노란색   | `primary-500`         | `#FFD400` | `rgb(255, 212, 0)`   | 브랜드 컬러 / CTA 버튼, 하이라이트 |
| Primary Light | 밝은 노랑 | `primary-100`         | `#FFF4B8` | `rgb(255, 244, 184)` | 배경, Hover 상태           |
| Secondary     | 보라색   | `secondary-500`       | `#7A4FFF` | `rgb(122, 79, 255)`  | 포인트 요소, 버튼 서브 액션       |
| Accent        | 민트색   | `accent-500`          | `#00D8B3` | `rgb(0, 216, 179)`   | 링크, 강조 텍스트             |
| Neutral       | 회색 계열 | `neutral-500`         | `#4B4B4B` | `rgb(75, 75, 75)`    | 본문 텍스트                 |
| Neutral Light | 밝은 회색 | `neutral-200`         | `#EDEDED` | `rgb(237, 237, 237)` | 배경, Divider            |
| Error         | 빨강    | `error-500`           | `#FF4F4F` | `rgb(255, 79, 79)`   | 에러 메시지, 경고             |

```js
// tailwind.config.js 예시
theme: {
  extend: {
    colors: {
      primary: {
        100: '#FFF4B8',
        500: '#FFD400',
      },
      secondary: {
        500: '#7A4FFF',
      },
      accent: {
        500: '#00D8B3',
      },
      neutral: {
        200: '#EDEDED',
        500: '#4B4B4B',
      },
      error: {
        500: '#FF4F4F',
      },
    },
  },
}
```

---

## 3. 🖼 Page Implementations

### 3.1 Root (`/`) — 메인 페이지

| 항목        | 내용                                                                               |
| --------- | -------------------------------------------------------------------------------- |
| **핵심 목적** | 사용자가 취미를 탐색하고, 이벤트와 인기 카테고리를 직관적으로 접할 수 있도록 한다                                   |
| **주요 요소** | 헤더, 추천 배너, 취미 썸네일 리스트, 이벤트 영역, 푸터                                                |
| **레이아웃**  | 12컬럼 기반 Hero → 추천 → 카테고리 → 푸터 구조                                                 |
| **UI 요소** | - Hero Banner (CTA 포함)<br>- 썸네일 카드 (썸네일 이미지, 제목, 평점, 가격, 찜 버튼)<br>- 이벤트 Carousel |

**텍스트 예시**

* 헤더 CTA: “나만의 취미를 찾아보세요 🎨”
* Hero CTA 버튼: “지금 시작하기”
* 이벤트 영역 제목: “다가오는 특강 & 이벤트”

**반응형 고려**

* Mobile: Carousel 한 장씩 노출, CTA 중앙 정렬
* Tablet: Carousel 2장
* Desktop: Carousel 3장 이상

---

### 3.2 `/search` — 검색 결과 페이지

| 항목        | 내용                            |
| --------- | ----------------------------- |
| **핵심 목적** | 사용자가 원하는 취미를 빠르게 필터링하고 찾게 한다  |
| **주요 요소** | 검색바, 필터(지역/카테고리/가격), 썸네일 리스트  |
| **레이아웃**  | 상단 검색바 → 좌측 필터 패널 → 우측 결과 그리드 |

**텍스트 예시**

* 검색바 placeholder: “취미를 검색하세요 (예: 드로잉)”
* 필터 제목: “지역”, “카테고리”, “가격대”
* 결과 없음: “검색 결과가 없습니다 😅”

**반응형 고려**

* Mobile: 필터 Drawer로 전환
* Tablet 이상: 좌측 고정 사이드 패널 유지

---

### 3.3 `/mypage` — 마이페이지

| 항목        | 내용                              |
| --------- | ------------------------------- |
| **핵심 목적** | 사용자가 자신의 찜 목록 및 신청 내역을 관리할 수 있다 |
| **주요 요소** | 프로필 영역, 찜 리스트, 예약 내역            |
| **레이아웃**  | 상단 프로필 → 찜한 취미 → 예약 목록          |

**텍스트 예시**

* 프로필 인사: “안녕하세요, 홍길동님 👋”
* 섹션 제목: “내가 찜한 취미”, “예약 내역”

**반응형 고려**

* Mobile: 리스트 1열
* Desktop: 리스트 3열 Grid

---

## 4. 🧩 Layout Components

| 라우트    | 공통 컴포넌트   | 설명                   |
| ------ | --------- | -------------------- |
| 모든 페이지 | Header    | 로고, 검색, 로그인/마이페이지 버튼 |
| 모든 페이지 | Footer    | 사이트 맵, 고객센터, SNS 링크  |
| 메인/검색  | Carousel  | 이벤트 및 추천 취미 노출       |
| 마이페이지  | Card List | 찜/예약 정보 표시 카드        |

### Header

* 로고 좌측 고정
* 중앙 검색바 (데스크탑) / 아이콘(모바일)
* 우측 로그인 버튼 또는 프로필 메뉴

### Footer

* 링크 3열 배치 (회사정보, 고객센터, SNS)
* `neutral-200` 배경, `neutral-500` 텍스트

---

## 5. 🧭 Interaction Patterns

| 요소       | 인터랙션                            | 피드백 방식                 |
| -------- | ------------------------------- | ---------------------- |
| CTA 버튼   | Hover 시 살짝 확대 (scale 1.05)      | box-shadow 강조          |
| 찜 버튼     | 클릭 시 하트 색상 변화 + scale animation | 색상 `primary-500`       |
| Carousel | 자동 슬라이드 + Manual 클릭             | 부드러운 트랜지션              |
| 검색 필터    | 옵션 선택 시 바로 결과 반영                | skeleton 로딩 or spinner |
| 마이페이지 카드 | Hover 시 Elevation 효과            | box-shadow             |

**Animation Duration:**

* Hover: `200ms`
* Carousel Transition: `400ms`
* Filter 로딩: `300~500ms`

---

## 6. 📱 Breakpoints

```scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);
```

| 디바이스    | Breakpoint      | 레이아웃 가이드                         |
| ------- | --------------- | -------------------------------- |
| Mobile  | 320px ~ 767px   | 단일 컬럼, Drawer 메뉴, Carousel 1개 노출 |
| Tablet  | 768px ~ 1023px  | 2~3컬럼, Header 고정, Carousel 2개    |
| Desktop | 1024px ~ 1439px | 3~4컬럼, 사이드 필터 노출                 |
| Wide    | 1440px 이상       | 최대 5컬럼, 컨테이너 중앙 정렬               |

---

## 📝 요약

* **디자인 스타일**: playful + 직관적
* **색상 체계**: triadic 기반의 생동감 있는 컬러
* **레이아웃**: 12컬럼 Grid, 반응형 구조 최적화
* **주요 페이지**: 메인 / 검색 / 마이페이지
* **공통 요소**: Header, Footer, Carousel, Card UI
* **UX 목표**: **직관성**, **발랄함**, **활동성**을 강조하여 사용자 이탈률을 최소화하고 탐색 경험을 극대화

---

✅ *이 가이드는 초기 MVP 및 향후 스케일업 시 UI 확장성까지 고려하여 작성되었습니다.*
