# Chatbot 설정 가이드

기업 규정 조회 챗봇을 설정하는 가이드입니다.

## 1. 의존성 설치

```bash
cd apps/chatbot
npm install
```

## 2. Supabase 프로젝트 설정

1. [supabase.com](https://supabase.com)에 로그인
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **Settings** → **API** 메뉴로 이동
4. 다음 정보 복사:
   - **Project URL** 
   - **anon public** key
   - **service_role** key (Show 버튼 클릭)

## 3. 환경 변수 설정

프로젝트 루트(`apps/chatbot/`)에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. 데이터베이스 마이그레이션 실행

Supabase Dashboard에서 SQL Editor를 열고:

1. **SQL Editor** 메뉴 클릭
2. **New Query** 버튼 클릭
3. `supabase/migrations/0001_create_regulations_tables.sql` 파일의 내용을 복사하여 붙여넣기
4. **Run** 버튼 클릭

또는 Supabase CLI를 사용하는 경우:

```bash
# Supabase CLI가 설치되어 있다면
supabase db push
```

## 5. 데이터 확인

Supabase Dashboard의 **Table Editor**에서 다음 테이블이 생성되었는지 확인:

- ✅ `categories` - 4개의 대분류 (인사 규정, 복리후생, 보안 규정, 업무 규정)
- ✅ `regulations` - 8개의 샘플 규정

## 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 7. 테스트

### 버튼 기반 조회
1. 페이지 로드 시 환영 메시지와 대분류 버튼 확인
2. 대분류 선택 → 규정 목록 표시 확인
3. 규정 선택 → 상세 내용 표시 확인
4. "이전으로" / "처음으로" 버튼 동작 확인

### 키워드 검색 ⭐ NEW
5. "연차" 입력 → 연차 관련 규정 표시 확인
6. "인사" 입력 → 인사 규정 분류 진입 확인
7. "비밀번호" 입력 → 비밀번호 관련 규정 표시 확인
8. "테스트123" (없는 키워드) → 검색 결과 없음 + 도움말 표시 확인
9. "처음" 또는 "초기화" 입력 → 처음으로 돌아가기 확인

### 기타
10. 페이지 새로고침 시 대화 내역 유지 확인 (localStorage)
11. 모바일/데스크톱 반응형 확인

## 주요 기능

### ✅ 구현된 기능

- 대분류 선택 UI
- 규정 목록 및 상세 내용 조회
- **키워드 검색 기능** ⭐ NEW
  - 카테고리명으로 검색 (예: "인사", "복리후생")
  - 규정 제목으로 검색 (예: "연차", "재택근무")
  - 규정 내용으로 검색 (예: "비밀번호", "출장")
  - 여러 개 매칭 시 선택 옵션 제공
  - 정확히 하나 매칭 시 바로 내용 표시
- 대화 내역 localStorage 저장
- 반응형 디자인 (모바일/데스크톱)
- 다크모드 지원
- 로딩 상태 표시

### 📊 데이터 구조

**categories 테이블:**
- id (UUID)
- name (규정 분류 이름)
- description (설명)
- sort_order (정렬 순서)

**regulations 테이블:**
- id (UUID)
- category_id (카테고리 외래키)
- title (규정 제목)
- content (규정 내용)
- sort_order (정렬 순서)

## 문제 해결

### Q: "Failed to fetch" 에러가 발생합니다.

- `.env.local` 파일이 제대로 설정되었는지 확인
- Supabase URL과 키가 정확한지 확인
- 개발 서버를 재시작 (`npm run dev`)

### Q: 규정이 표시되지 않습니다.

- Supabase Dashboard의 Table Editor에서 데이터가 있는지 확인
- SQL 마이그레이션이 정상적으로 실행되었는지 확인

### Q: 대화 내역이 저장되지 않습니다.

- 브라우저의 localStorage가 활성화되어 있는지 확인
- 시크릿 모드에서는 localStorage가 제한될 수 있음

## 추가 규정 등록

Supabase Dashboard의 Table Editor 또는 SQL Editor에서 직접 데이터를 추가할 수 있습니다:

```sql
-- 새 카테고리 추가
INSERT INTO categories (name, description, sort_order) VALUES
  ('재무 규정', '예산, 회계, 경비 등 재무 관련 규정', 5);

-- 새 규정 추가
INSERT INTO regulations (category_id, title, content, sort_order)
SELECT 
  c.id,
  '경비 처리 규정',
  '1. 경비는 업무 종료 후 7일 이내 신청해야 합니다.
2. 영수증 첨부가 필수입니다.
3. 10만원 이상 지출은 사전 승인이 필요합니다.',
  1
FROM categories c WHERE c.name = '재무 규정';
```

## 배포

### Vercel 배포

```bash
npm run build
```

Vercel에 배포 시 환경 변수를 Project Settings에 추가하세요.

---

문의사항이 있으시면 README.md를 참고하세요.

