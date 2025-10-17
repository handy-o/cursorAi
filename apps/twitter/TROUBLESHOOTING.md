# 트러블슈팅 가이드

## 🚨 현재 증상: 게시글/좋아요 표시가 잘못됨, Realtime이 작동하지 않음

### ✅ 1단계: Supabase Realtime 설정 확인

#### A. Supabase Dashboard에서 Realtime 활성화 확인

1. **Supabase Dashboard** 접속
2. **Database** → **Replication** 메뉴
3. `tweets`와 `likes` 테이블이 **활성화**되어 있는지 확인
4. 비활성화되어 있다면 토글 버튼 클릭

#### B. SQL로 Realtime 확인

```sql
-- Realtime publication 확인
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';
```

**결과에 `tweets`와 `likes`가 표시되어야 합니다.**

표시되지 않는다면:

```sql
-- Realtime publication에 테이블 추가
ALTER PUBLICATION supabase_realtime ADD TABLE tweets;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
```

### ✅ 2단계: 브라우저에서 Realtime 연결 확인

1. 브라우저에서 앱 열기
2. **F12** (개발자 도구) 열기
3. **Console** 탭 확인

**정상적인 로그:**
```
[Realtime] Connected successfully
```

**연결 실패 시:**
```
[Realtime] Connection error
```

### ✅ 3단계: 데이터가 올바르게 표시되는지 테스트

#### A. 초기 로딩 테스트

1. 페이지 새로고침
2. 콘솔에서 에러가 없는지 확인
3. 좋아요 하지 않은 트윗은 빈 하트로 표시되는지 확인
4. 좋아요한 트윗은 채워진 하트로 표시되는지 확인

#### B. 좋아요 테스트

1. 빈 하트 클릭
2. 즉시 채워진 하트로 변경되는지 확인
3. 카운트가 증가하는지 확인
4. **Supabase Dashboard**에서 `likes` 테이블 확인
5. 새로운 행이 추가되었는지 확인

#### C. 답글 테스트

1. 답글 작성
2. **콘솔에 `[Tweet] Created successfully` 표시 확인**
3. **콘솔에 `[Realtime] Tweets changed: INSERT` 표시 확인**
4. 새로고침 없이 답글이 목록에 표시되는지 확인
5. 답글 수 카운트가 증가하는지 확인

### ✅ 4단계: Realtime이 작동하지 않는 경우

#### 원인 1: Supabase 프로젝트 일시 중지

**확인:**
- Supabase Dashboard → Project Settings
- 프로젝트가 "Paused" 상태인지 확인

**해결:**
- "Resume" 버튼 클릭

#### 원인 2: Realtime 요금제 제한

**확인:**
- Supabase Dashboard → Settings → Billing
- Realtime connections 사용량 확인

**해결:**
- 무료 플랜: 동시 연결 제한 있음
- 필요시 업그레이드 또는 불필요한 연결 종료

#### 원인 3: 환경 변수 누락

**확인:**
`.env.local` 파일에 다음이 있는지 확인:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**해결:**
- Supabase Dashboard → Settings → API에서 키 복사
- `.env.local` 파일에 추가
- 개발 서버 재시작

### ✅ 5단계: 강제 새로고침

브라우저 캐시가 문제일 수 있습니다:

1. **Windows**: `Ctrl + Shift + R`
2. **Mac**: `Cmd + Shift + R`

또는:

1. **F12** (개발자 도구)
2. **Network** 탭
3. "Disable cache" 체크박스 선택
4. 페이지 새로고침

### ✅ 6단계: 개발 서버 재시작

```bash
# 현재 서버 중지 (Ctrl+C)
# 그 다음:
npm run dev
```

### 🔍 예상되는 정상 동작

#### 1. 페이지 로딩 시

**콘솔:**
```
[Realtime] Connected successfully
```

#### 2. 좋아요 클릭 시

**UI:**
- 빈 하트 → 채워진 하트 (즉시 변경)
- 카운트 +1

**콘솔:**
```
[Realtime] Likes changed: INSERT
```

**Supabase:**
- `likes` 테이블에 새 행 추가

#### 3. 답글 작성 시

**UI:**
- 답글이 목록에 즉시 표시
- 답글 카운트 +1

**콘솔:**
```
[Tweet] Created successfully
[Realtime] Tweets changed: INSERT
```

**Supabase:**
- `tweets` 테이블에 새 행 추가 (reply_to_id 값 있음)

### 🐛 여전히 문제가 있다면

#### 디버깅 체크리스트

- [ ] Supabase 프로젝트가 활성화되어 있나요?
- [ ] `tweets`, `likes` 테이블에 Realtime이 활성화되어 있나요?
- [ ] `.env.local` 파일이 올바른가요?
- [ ] 개발 서버를 재시작했나요?
- [ ] 브라우저 캐시를 지웠나요?
- [ ] 콘솔에 에러가 표시되나요?
- [ ] 네트워크 탭에서 WebSocket 연결이 성공했나요?

#### 추가 정보 수집

**콘솔에서 다음 실행:**

```javascript
// Supabase client 상태 확인
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Anon Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
```

**결과를 확인하고 URL과 키가 올바른지 확인하세요.**

### 📞 도움이 필요하면

1. 콘솔 로그 전체 스크린샷
2. Supabase Realtime 설정 스크린샷
3. `.env.local` 파일 (키는 가린 상태로)
4. 발생한 에러 메시지

위 정보와 함께 문의하면 더 빠르게 해결할 수 있습니다.


