# 📄 Use Case Document — “HobbyMate”

> 본 문서는 취미 활동 서비스 “HobbyMate”의 기능 요구사항을 기반으로 작성된 상세 Use Case 명세서입니다.
> 본 문서에서는 PRD(제품 요구사항 문서) 및 IA(Information Architecture) 내용을 토대로 실제 사용자 시나리오를 구체화합니다.

---

## 📚 목차

1. [Actor Definitions](#1-actor-definitions)
2. [Use Case Scenarios](#2-use-case-scenarios)
3. [Main Steps](#3-main-steps)
4. [Exception Handling](#4-exception-handling)
5. [Comprehensive Actor Definitions](#5-comprehensive-actor-definitions)
6. [Detailed Use Case Scenarios](#6-detailed-use-case-scenarios)
7. [Main Steps and Flow of Events](#7-main-steps-and-flow-of-events)
8. [Alternative Flows and Edge Cases](#8-alternative-flows-and-edge-cases)
9. [Preconditions and Postconditions](#9-preconditions-and-postconditions)
10. [Business Rules and Constraints](#10-business-rules-and-constraints)
11. [Exception Handling Procedures](#11-exception-handling-procedures)
12. [User Interface Considerations](#12-user-interface-considerations)
13. [Data Requirements and Data Flow](#13-data-requirements-and-data-flow)
14. [Security and Privacy Considerations](#14-security-and-privacy-considerations)

---

## 1. 🧑 Actor Definitions

| 액터                    | 설명                   | 역할                  |
| --------------------- | -------------------- | ------------------- |
| 비로그인 사용자 (Guest)      | 로그인하지 않은 일반 사용자      | 취미 탐색, 검색, 카테고리 보기  |
| 회원 (User)             | 로그인된 사용자             | 찜, 예약, 마이페이지 이용     |
| 관리자 (Admin)           | 시스템 관리 담당자           | 취미 등록/수정/삭제, 이벤트 관리 |
| 인증 시스템 (Auth Service) | 외부 인증 및 세션 관리        | 로그인 및 회원가입 처리       |
| 데이터베이스 (DB)           | 취미, 이벤트, 사용자 데이터 저장소 | 데이터 CRUD 제공         |

---

## 2. 🧭 Use Case Scenarios

| 시나리오 ID | 시나리오 명        | 주요 액터       | 목적                   |
| ------- | ------------- | ----------- | -------------------- |
| UC-001  | 취미 검색 및 상세 보기 | Guest, User | 원하는 취미를 찾고 상세 정보를 확인 |
| UC-002  | 찜하기           | User        | 관심 있는 취미를 저장         |
| UC-003  | 예약하기          | User        | 취미 강좌를 예약            |
| UC-004  | 회원가입 및 로그인    | Guest       | 회원으로 서비스 이용 시작       |
| UC-005  | 마이페이지 보기      | User        | 찜/예약 내역 확인           |
| UC-006  | 이벤트 보기        | Guest, User | 특강 및 이벤트 탐색          |
| UC-007  | 취미 관리         | Admin       | 취미 등록, 수정, 삭제        |

---

## 3. 🪜 Main Steps

1. 사용자는 홈 화면에 접속한다.
2. 취미를 검색하거나 카테고리를 클릭한다.
3. 검색 결과 리스트에서 원하는 취미를 선택한다.
4. 상세 페이지에서 정보를 확인하고 찜 또는 예약 버튼을 클릭한다.
5. 로그인되지 않은 경우 로그인 모달을 통해 인증 절차를 진행한다.
6. 찜 또는 예약이 완료되면 마이페이지에서 내역을 확인할 수 있다.

---

## 4. ⚠ Exception Handling (요약)

| 케이스   | 예외 상황        | 처리 방식                        |
| ----- | ------------ | ---------------------------- |
| E-001 | 네트워크 오류      | 오류 메시지와 재시도 옵션 제공            |
| E-002 | 로그인 실패       | 명확한 에러 메시지 제공 (ex. 잘못된 비밀번호) |
| E-003 | 찜/예약 시 인증 필요 | 로그인 모달 자동 노출                 |
| E-004 | 잘못된 URL 접근   | 404 페이지로 리디렉션                |
| E-005 | 서버 에러        | 500 에러 페이지 및 고객센터 안내         |

---

## 5. 🧑‍💼 Comprehensive Actor Definitions

| 액터           | 권한     | 액션                  | 비고          |
| ------------ | ------ | ------------------- | ----------- |
| Guest        | 읽기     | 검색, 카테고리 탐색, 이벤트 보기 | 찜/예약 불가     |
| User         | 읽기/쓰기  | 찜, 예약, 마이페이지 접근     | 로그인 필요      |
| Admin        | CRUD   | 취미 관리, 이벤트 관리       | 백오피스 전용     |
| Auth Service | 인증     | 로그인/회원가입            | 세션, 토큰 발급   |
| DB           | 데이터 저장 | CRUD                | Supabase 기반 |

---

## 6. 🧾 Detailed Use Case Scenarios

### UC-001: 취미 검색 및 상세 보기

| 항목    | 내용                     |
| ----- | ---------------------- |
| 액터    | Guest, User            |
| 목적    | 원하는 취미를 쉽게 탐색하고 정보를 확인 |
| 전제 조건 | 사이트 접속 완료              |
| 후행 조건 | 상세 페이지 진입 성공           |

---

## 7. 🪜 Main Steps and Flow of Events

### UC-001: 취미 검색 및 상세 보기

1. 사용자가 상단 검색창에 키워드를 입력한다.
2. 자동완성 추천이 노출된다.
3. 검색 버튼을 클릭한다.
4. 검색 결과 페이지가 로드되고 취미 리스트가 표시된다.
5. 사용자가 특정 취미 썸네일을 클릭한다.
6. 취미 상세 페이지로 이동하여 정보를 확인한다.

---

## 8. 🔀 Alternative Flows and Edge Cases

| 플로우 ID | 상황         | 처리 방식                       |
| ------ | ---------- | --------------------------- |
| AF-001 | 검색 결과 없음   | “검색 결과가 없습니다” 문구와 추천 리스트 노출 |
| AF-002 | 네트워크 지연    | 로딩 스피너 표시                   |
| AF-003 | 잘못된 ID로 접근 | 404 페이지 노출 및 홈 이동 버튼 제공     |

---

## 9. 🧭 Preconditions and Postconditions

| 구분    | 내용                                    |
| ----- | ------------------------------------- |
| 사전 조건 | 사이트 접속 가능, 인터넷 연결 상태 양호               |
| 사후 조건 | 사용자에게 취미 정보가 정확히 노출됨, 상세 페이지 정상 진입 가능 |

---

## 10. 📏 Business Rules and Constraints

| 규칙 ID  | 설명                      |
| ------ | ----------------------- |
| BR-001 | 비로그인 상태에서는 찜 및 예약 불가    |
| BR-002 | 이벤트는 종료일이 지난 경우 노출되지 않음 |
| BR-003 | 검색 결과는 최신순 및 인기순 정렬 지원  |
| BR-004 | 찜은 최대 100개까지 가능         |
| BR-005 | 예약은 취소 정책에 따라 제한 가능     |

---

## 11. 🧯 Exception Handling Procedures

1. **네트워크 오류** → 오류 토스트 노출 + 재시도 버튼 표시
2. **로그인 실패** → 오류 메시지 + 비밀번호 재설정 링크 제공
3. **404 접근** → 홈으로 이동하는 CTA 제공
4. **예약 실패** → 오류 원인 표시 (잔여 좌석 부족 등)

---

## 12. 🖥 User Interface Considerations

* 검색창은 헤더 영역에 고정 배치 (Topbar)
* 검색 결과 리스트는 카드형 UI (썸네일, 제목, 평점, 지역, 가격, 찜 버튼)
* 찜 버튼 클릭 시 하트 애니메이션 제공
* 로그인 모달은 페이지 이탈 없이 오버레이로 노출
* 반응형 레이아웃:

  * Mobile: 1열
  * Tablet: 2열
  * Desktop: 3~4열
* 404 / 500 페이지는 브랜드 톤을 유지한 심플 UI 제공

---

## 13. 🧭 Data Requirements and Data Flow

### 주요 데이터 요소

| 데이터    | 설명                  | 출처        |
| ------ | ------------------- | --------- |
| 취미 정보  | 제목, 지역, 가격, 평점, 썸네일 | DB        |
| 사용자 정보 | ID, 이메일, 찜 목록       | Auth & DB |
| 이벤트 정보 | 제목, 일정, 배너          | DB        |

### 데이터 흐름 예시 (검색 → 상세)

1. 사용자가 검색어 입력
2. API 호출 → DB에서 결과 반환
3. 리스트 UI 렌더링
4. 썸네일 클릭 → 상세 페이지 요청
5. 상세 정보 호출 후 렌더링

---

## 14. 🔐 Security and Privacy Considerations

| 항목       | 고려 사항             | 조치                  |
| -------- | ----------------- | ------------------- |
| 인증 정보    | 세션 하이재킹 방지        | JWT 토큰 + HTTPS      |
| 개인 정보    | 최소 수집 및 암호화 저장    | 이메일 암호화, 비밀번호 해시    |
| 찜/예약 데이터 | 사용자 식별 필요         | 인증된 사용자만 CRUD 가능    |
| 접근 제어    | 관리자 기능 보호         | Role 기반 접근 제어(RBAC) |
| 로그 관리    | 이슈 발생 시 추적 가능성 확보 | API 요청 로깅 및 오류 기록   |

---

## 📝 결론

이 Use Case 문서는 취미 활동 서비스 “HobbyMate”의 핵심 시나리오(검색, 찜, 예약, 이벤트, 마이페이지)를 중심으로

* 사용자 액션,
* 예외 처리,
* 데이터 흐름,
* UI 및 보안 고려사항까지 포함하여 설계되었습니다.

✅ 본 문서는 MVP 개발 단계에서 개발자, 디자이너, PM, QA 간의 명확한 커뮤니케이션 가이드로 활용될 수 있습니다.
✅ 이후 단계에서는 각 Use Case별 시퀀스 다이어그램 및 API 명세서와 연동하는 것이 권장됩니다.
