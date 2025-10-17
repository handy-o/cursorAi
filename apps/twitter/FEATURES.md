# Twitter Clone - 주요 기능

## ✨ 새로 추가된 기능

### 1. 🎨 사용자별 프로필 아이콘 색상

각 사용자는 고유한 색상의 프로필 아이콘을 가집니다:

- **일관성**: 같은 사용자는 항상 같은 색상 (사용자 ID 기반 해시)
- **16가지 색상 팔레트**: 파란색, 초록색, 보라색, 분홍색, 남색, 빨간색, 주황색, 청록색, 하늘색, 노란색 등
- **적용 위치**:
  - 트윗 카드의 아바타
  - 답글 다이얼로그의 아바타
  - 트윗 작성 폼의 아바타
  - 사이드바의 프로필 아바타

**구현 파일**: `src/lib/getUserColor.ts`

```typescript
// 사용 예시
const userColor = getUserColor(userId) // "bg-blue-500"
const userInitial = getUserInitial(displayName, email) // "J"
```

### 2. ⚡ 답글 즉시 표시

답글 작성 후 새로고침 없이 즉시 답글 리스트에 표시:

- **로컬 refresh 트리거**: 각 트윗 카드가 독립적인 `replyRefreshTrigger` 상태 관리
- **즉각적인 업데이트**: 답글 작성 완료 시 `setReplyRefreshTrigger(prev => prev + 1)` 호출
- **카운트 동기화**: 답글 수도 즉시 업데이트

**작동 방식**:
```typescript
const [replyRefreshTrigger, setReplyRefreshTrigger] = useState(0)

// 답글 작성 완료 시
onTweetCreated={() => {
  setReplyRefreshTrigger(prev => prev + 1) // 리스트 즉시 갱신
  fetchAllData() // 카운트 업데이트
  onUpdate() // 상위 컴포넌트 업데이트
}}

// TweetList는 이 트리거 값이 변경될 때마다 재조회
<TweetList refreshTrigger={replyRefreshTrigger} />
```

## 🚀 기존 기능

### 1. 인증 (Authentication)

- **로그인**: 이메일/비밀번호
- **회원가입**: 사용자명, 이메일, 비밀번호
- **NextAuth.js**: JWT 기반 세션 관리

### 2. 트윗 (Tweets)

- **작성**: 최대 280자
- **삭제**: 본인 트윗만 삭제 가능
- **실시간 업데이트**: Supabase Realtime

### 3. 답글 (Replies)

- **답글 작성**: 다이얼로그에서 작성
- **답글 표시**: 인라인 또는 다이얼로그
- **답글 수**: 자동 카운트 (DB 트리거)

### 4. 좋아요 (Likes)

- **토글**: 클릭으로 좋아요/취소
- **카운트**: 실시간 업데이트 (DB 트리거)
- **상태 표시**: 채워진 하트 vs 빈 하트

### 5. Realtime 기능

- **자동 동기화**: 다른 사용자의 트윗/좋아요/답글이 즉시 반영
- **WebSocket**: Supabase Realtime 구독
- **디버깅 로그**: 콘솔에서 연결 상태 확인 가능

## 📊 데이터베이스 구조

### 테이블

1. **profiles**: 사용자 프로필
2. **tweets**: 트윗 (본문, 답글, 카운트)
3. **likes**: 좋아요
4. **follows**: 팔로우 (예정)
5. **bookmarks**: 북마크 (예정)

### 트리거

1. **increment_replies_count**: 답글 추가 시 카운트 증가
2. **decrement_replies_count**: 답글 삭제 시 카운트 감소
3. **increment_likes_count**: 좋아요 추가 시 카운트 증가
4. **decrement_likes_count**: 좋아요 취소 시 카운트 감소

## 🎨 UI/UX

### 디자인

- **Twitter 스타일**: 친숙한 인터페이스
- **반응형**: 모바일/데스크톱 지원
- **다크 모드**: 자동 테마 감지
- **애니메이션**: 부드러운 전환 효과

### 컴포넌트

- **TweetCard**: 트윗 표시 및 인터랙션
- **TweetComposer**: 트윗/답글 작성
- **TweetList**: 트윗 목록 (Realtime)
- **Sidebar**: 네비게이션 및 프로필
- **Dialog**: 답글 작성 및 표시

## 🔧 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn-ui
- **Backend**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **Realtime**: Supabase Realtime
- **Forms**: react-hook-form, zod
- **Utils**: date-fns, lucide-react

## 📝 사용 방법

### 트윗 작성
1. 사이드바 "트윗하기" 버튼 클릭 또는 상단 작성 폼 사용
2. 280자 이내로 내용 입력
3. "게시" 버튼 클릭

### 답글 작성
1. 트윗의 답글 아이콘 클릭
2. 다이얼로그에서 답글 입력
3. "답글" 버튼 클릭
4. **즉시 답글 리스트에 표시됨** ✨

### 좋아요
1. 하트 아이콘 클릭
2. 즉시 색이 채워지고 카운트 증가
3. 다시 클릭하면 취소

## 🐛 트러블슈팅

자세한 내용은 `TROUBLESHOOTING.md` 참조

### 빠른 체크리스트

- [ ] Supabase Realtime 활성화되어 있나요?
- [ ] 환경 변수가 올바른가요?
- [ ] 브라우저 콘솔에 에러가 없나요?
- [ ] 개발 서버가 실행 중인가요?

## 🚧 향후 계획

- [ ] 이미지 업로드
- [ ] 프로필 편집
- [ ] 팔로우/언팔로우
- [ ] 북마크
- [ ] 검색
- [ ] 알림
- [ ] DM (다이렉트 메시지)


