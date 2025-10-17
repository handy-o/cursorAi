# 🧭 Information Architecture (IA) 문서 — “HobbyMate”

**Navigation Type:** Topbar
**Auth Type:** Optional (비로그인 사용자도 탐색 가능)

---

## 📚 목차

1. [Site Map](#1-site-map)
2. [User Flow](#2-user-flow)
3. [Navigation Structure](#3-navigation-structure)
4. [Page Hierarchy](#4-page-hierarchy)
5. [Content Organization](#5-content-organization)
6. [Interaction Patterns](#6-interaction-patterns)
7. [URL Structure](#7-url-structure)
8. [Component Hierarchy](#8-component-hierarchy)

---

## 1. 🗺 Site Map

```text
/
├── 홈 (Home)
│   ├── 추천 취미
│   ├── 이벤트 & 특강
│   ├── 카테고리
│   └── 인기 지역
│
├── 검색 (Search)
│   ├── 필터 (지역, 카테고리, 가격)
│   └── 검색 결과
│
├── 카테고리 (Category)
│   ├── 예: 드로잉
│   ├── 예: 요리
│   └── 예: 운동
│
├── 이벤트 (Event)
│   ├── 이벤트 상세
│   └── 특강 소개
│
├── 마이페이지 (My Page)
│   ├── 프로필
│   ├── 찜한 취미
│   └── 예약 내역
│
└── 인증 (Auth)
    ├── 로그인
    └── 회원가입
```

* 홈: 서비스의 첫 진입점
* 검색: 사용자가 원하는 취미를 빠르게 찾는 핵심 기능
* 카테고리: 테마별 탐색
* 이벤트: 특강 및 기획 행사 강조
* 마이페이지: 개인화된 공간
* 인증: 선택적 기능 (게스트 탐색 가능)

---

## 2. 🔄 User Flow

### A. 비로그인 사용자 플로우

```text
홈 → 검색/카테고리 → 취미 상세 → (찜 클릭 시 로그인 유도) → 회원가입 or 로그인
```

### B. 로그인 사용자 플로우

```text
홈 → 검색/카테고리/이벤트 → 취미 상세 → 찜 or 예약 → 마이페이지에서 확인
```

### C. 로그인 프로세스 (Optional Auth)

* 비로그인 상태에서도 홈/검색/카테고리/이벤트 탐색 가능
* 찜, 예약 시 로그인 모달 등장
* 로그인 성공 후 동일 위치로 복귀

---

## 3. 🧭 Navigation Structure

| Navigation 위치 | 구성 요소     | 설명                | 반응형 동작             |
| ------------- | --------- | ----------------- | ------------------ |
| Topbar (상단바)  | 로고        | 홈으로 이동            | Mobile에서는 중앙 정렬    |
| Topbar        | 검색바       | 전역 검색 진입점         | Mobile에서는 아이콘으로 축소 |
| Topbar        | 카테고리      | 주요 취미 카테고리로 이동    | 햄버거 메뉴로 전환         |
| Topbar        | 이벤트       | 특강 및 행사 진입점       | 메뉴로 유지             |
| Topbar        | 로그인/마이페이지 | 사용자 상태에 따라 다르게 표시 | 프로필 아바타 또는 로그인 버튼  |

---

## 4. 🏗 Page Hierarchy

| Level | 페이지                      | 설명                     |
| ----- | ------------------------ | ---------------------- |
| 1     | 홈 (`/`)                  | 브랜드 첫 진입점, 추천 및 이벤트 노출 |
| 2     | 검색 (`/search`)           | 전역 검색 및 결과 리스트         |
| 2     | 카테고리 (`/category/:slug`) | 주제별 취미 탐색              |
| 2     | 이벤트 (`/event`)           | 특강 및 기획 이벤트            |
| 2     | 마이페이지 (`/mypage`)        | 찜/예약 관리                |
| 3     | 취미 상세 (`/hobby/:id`)     | 개별 취미 정보               |
| 3     | 이벤트 상세 (`/event/:id`)    | 개별 이벤트 정보              |
| 3     | 인증 (`/login`, `/signup`) | 사용자 인증                 |

* 홈이 항상 1차 진입점
* 상세 페이지는 모든 상위 페이지에서 진입 가능
* 인증 페이지는 CTA(찜, 예약 등) 시 진입

---

## 5. 🧾 Content Organization

| 페이지      | 주요 콘텐츠 블록                        | 설명        | 우선순위 |
| -------- | -------------------------------- | --------- | ---- |
| 홈        | Hero Banner, 추천 취미, 이벤트 Carousel | 핵심 액션 유도  | ⭐⭐⭐⭐ |
| 검색       | 검색창, 필터, 결과 그리드                  | 정보 탐색 중심  | ⭐⭐⭐⭐ |
| 카테고리     | 카테고리 목록, 취미 리스트                  | 주제별 탐색    | ⭐⭐⭐  |
| 이벤트      | 이벤트 카드, 일정 정보                    | 참여 유도     | ⭐⭐⭐  |
| 마이페이지    | 찜한 취미, 예약 내역                     | 개인화 콘텐츠   | ⭐⭐⭐  |
| 취미 상세    | 이미지, 설명, 가격, 평점, 찜 버튼            | 의사결정 핵심   | ⭐⭐⭐⭐ |
| 로그인/회원가입 | 폼, 소셜 로그인 버튼                     | 진입 허들 최소화 | ⭐⭐   |

---

## 6. 🪄 Interaction Patterns

| 기능        | 인터랙션                     | UX 고려사항              |
| --------- | ------------------------ | -------------------- |
| Topbar 메뉴 | Hover 또는 클릭 시 이동         | 접근성: Tab 키로 포커스 가능   |
| 검색        | 실시간 입력 시 추천 노출           | 자동완성, aria-label 설정  |
| 찜(좋아요)    | 클릭 시 하트 애니메이션            | 로그인 여부 체크            |
| 이벤트 배너    | Carousel 자동 슬라이드 + 수동 제어 | 시각장애인용 aria-live 적용  |
| 반응형       | 화면 크기 변경 시 메뉴 형태 전환      | 햄버거 메뉴 전환, 키보드 접근 가능 |

> 🔸 *모든 인터랙션 요소는 키보드 접근성과 스크린 리더 대응을 고려한다.*

---

## 7. 🌐 URL Structure

| 페이지    | URL 패턴            | 설명        | SEO 고려사항                       |
| ------ | ----------------- | --------- | ------------------------------ |
| 홈      | `/`               | 기본 진입점    | `title`, `meta description` 포함 |
| 검색     | `/search?q=키워드`   | 쿼리 기반 검색  | URL 공유 가능                      |
| 카테고리   | `/category/:slug` | 슬러그 기반 필터 | `slug`에 키워드 포함                 |
| 이벤트    | `/event`          | 목록 페이지    | 날짜 정보 포함                       |
| 이벤트 상세 | `/event/:id`      | 상세 정보     | 고유 ID 기반                       |
| 취미 상세  | `/hobby/:id`      | 상세 정보     | 제목 기반 slug 고려                  |
| 마이페이지  | `/mypage`         | 개인 정보 페이지 | No-index (개인화 영역)              |
| 로그인    | `/login`          | 인증        | canonical 지정                   |
| 회원가입   | `/signup`         | 인증        | canonical 지정                   |

> 📈 *SEO 최적화를 위해 slug 기반 URL과 명확한 메타 태그를 적용.*

---

## 8. 🧩 Component Hierarchy

### Global Components

* `Header`

  * Logo
  * Navigation Menu
  * Search Bar
  * Auth Button / Profile Avatar
* `Footer`

  * 사이트 정보, 고객센터, SNS 링크

### Page-level Components

| 페이지   | 구성 컴포넌트                                                   | 설명         |
| ----- | --------------------------------------------------------- | ---------- |
| 홈     | `HeroBanner`, `ThumbnailCard`, `Carousel`, `CategoryList` | 메인 인터랙션 요소 |
| 검색    | `SearchBar`, `FilterPanel`, `GridList`                    | 탐색 중심      |
| 카테고리  | `CategoryHeader`, `ThumbnailCard`                         | 주제별 정렬     |
| 이벤트   | `EventCard`, `Carousel`                                   | 특강 강조      |
| 마이페이지 | `ProfileCard`, `Wishlist`, `ReservationList`              | 개인화 UI     |
| 취미 상세 | `ImageGallery`, `InfoPanel`, `CTA Button`                 | 구매/신청 유도   |
| 인증    | `LoginForm`, `SignupForm`                                 | 진입 허들 최소화  |

---

## 📱 반응형 고려 사항

| 디바이스                  | 특징                       | UX 고려        |
| --------------------- | ------------------------ | ------------ |
| Mobile (320~767px)    | Topbar 축소, 햄버거 메뉴, 단일 컬럼 | 핵심 CTA 중앙 배치 |
| Tablet (768~1023px)   | 사이드 필터 패널, 2열 그리드        | 가독성 중심       |
| Desktop (1024~1440px) | 전체 메뉴 노출, 3~4열 그리드       | 정보 탐색 최적화    |
| Wide (1440px 이상)      | 최대 5열, 여백 활용             | 풍부한 콘텐츠 노출   |

---

## 📝 요약

* **IA 전략:** 직관적 탐색 + 검색 중심 구조
* **네비게이션:** Topbar 고정, 반응형 전환 대응
* **URL 구조:** SEO 최적화된 slug 기반 설계
* **인터랙션:** 접근성(키보드·스크린리더) 고려 필수
* **우선순위:** 홈 → 검색 → 상세 → 인증 순으로 자연스러운 흐름

✅ 이 IA 설계는 MVP부터 확장 가능한 구조를 기반으로 하며, UX 단계를 명확히 구분해 전환율과 만족도를 높이는 데 초점을 맞추었다.
