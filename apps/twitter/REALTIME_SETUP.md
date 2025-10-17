# Supabase Realtime 설정 가이드

## 문제 해결: 카운트가 DB에 반영되지 않는 경우

### 1. 마이그레이션이 실행되었는지 확인

Supabase Dashboard에서:
- **SQL Editor** → **Migrations** 탭
- 다음 마이그레이션들이 모두 실행되었는지 확인:
  - `0006_update_replies_count_trigger.sql`
  - `0007_add_likes_count_trigger.sql`

### 2. 트리거가 생성되었는지 확인

SQL Editor에서 다음 쿼리 실행:

```sql
-- 트리거 확인
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table,
  action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
  AND event_object_table IN ('tweets', 'likes')
ORDER BY event_object_table, trigger_name;
```

다음 트리거들이 표시되어야 합니다:
- `increment_replies_trigger` (tweets 테이블, INSERT)
- `decrement_replies_trigger` (tweets 테이블, DELETE)
- `increment_likes_trigger` (likes 테이블, INSERT)
- `decrement_likes_trigger` (likes 테이블, DELETE)

### 3. 기존 데이터 동기화

만약 트리거가 새로 생성되었다면, 기존 트윗의 카운트를 수동으로 동기화해야 합니다:

```sql
-- 모든 트윗의 replies_count 업데이트
UPDATE tweets 
SET replies_count = (
  SELECT COUNT(*) 
  FROM tweets replies 
  WHERE replies.reply_to_id = tweets.id
);

-- 모든 트윗의 likes_count 업데이트
UPDATE tweets 
SET likes_count = (
  SELECT COUNT(*) 
  FROM likes 
  WHERE likes.tweet_id = tweets.id
);
```

### 4. Realtime 활성화 확인

Supabase Dashboard에서:
1. **Database** → **Replication** 메뉴로 이동
2. `tweets` 테이블이 Realtime이 활성화되어 있는지 확인
3. 활성화되어 있지 않다면 토글 버튼 클릭

또는 SQL로 확인:

```sql
-- Realtime publication 확인
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime';
```

`tweets` 테이블이 목록에 있어야 합니다.

### 5. Realtime Publication에 테이블 추가

만약 `tweets` 테이블이 Realtime에 없다면:

```sql
-- tweets 테이블을 Realtime publication에 추가
ALTER PUBLICATION supabase_realtime ADD TABLE tweets;
ALTER PUBLICATION supabase_realtime ADD TABLE likes;
```

### 6. 테스트

1. **좋아요 테스트**:
   - 브라우저에서 하트 아이콘 클릭
   - Supabase Dashboard에서 `tweets` 테이블 새로고침
   - `likes_count`가 증가했는지 확인

2. **답글 테스트**:
   - 브라우저에서 답글 작성
   - Supabase Dashboard에서 `tweets` 테이블 새로고침
   - 부모 트윗의 `replies_count`가 증가했는지 확인

3. **Realtime 테스트**:
   - 브라우저 콘솔 열기 (F12)
   - 답글 작성 또는 좋아요 클릭
   - 콘솔에 "Realtime change detected:" 로그가 표시되는지 확인
   - "Subscription status: SUBSCRIBED" 로그가 표시되는지 확인

## 문제가 계속되는 경우

### A. 트리거 재생성

다음 SQL을 실행하여 트리거를 완전히 재생성:

```sql
-- 기존 트리거 삭제
DROP TRIGGER IF EXISTS increment_replies_trigger ON tweets;
DROP TRIGGER IF EXISTS decrement_replies_trigger ON tweets;
DROP TRIGGER IF EXISTS increment_likes_trigger ON likes;
DROP TRIGGER IF EXISTS decrement_likes_trigger ON likes;

-- 함수 재생성
DROP FUNCTION IF EXISTS increment_replies_count();
DROP FUNCTION IF EXISTS decrement_replies_count();
DROP FUNCTION IF EXISTS increment_likes_count();
DROP FUNCTION IF EXISTS decrement_likes_count();

-- 0006_update_replies_count_trigger.sql 전체 내용 다시 실행
-- 0007_add_likes_count_trigger.sql 전체 내용 다시 실행
```

### B. RLS 정책 확인

트리거가 실행되려면 적절한 권한이 필요합니다:

```sql
-- tweets 테이블의 UPDATE 권한 확인
SELECT * FROM pg_policies WHERE tablename = 'tweets';
```

### C. 로그 확인

Supabase Dashboard → **Logs** → **Database**에서 에러 메시지 확인

## 예상되는 동작

### 정상 작동 시:

1. **좋아요 추가**:
   - `likes` 테이블에 행 추가 → `increment_likes_trigger` 실행
   - `tweets.likes_count` 자동 증가
   - Realtime이 변경 감지 → 모든 클라이언트 업데이트

2. **답글 작성**:
   - `tweets` 테이블에 행 추가 → `increment_replies_trigger` 실행
   - 부모 트윗의 `tweets.replies_count` 자동 증가
   - Realtime이 변경 감지 → 모든 클라이언트 업데이트

3. **삭제**:
   - 행 삭제 → `decrement_*_trigger` 실행
   - 카운트 자동 감소
   - Realtime이 변경 감지 → 모든 클라이언트 업데이트

## 디버깅 팁

1. **콘솔 로그 활성화**: 
   - 브라우저 개발자 도구(F12) 열기
   - 콘솔 탭에서 "Realtime change detected" 확인

2. **네트워크 탭 확인**:
   - WebSocket 연결이 성공했는지 확인
   - `wss://` 프로토콜로 연결되어야 함

3. **타이밍 문제**:
   - 트리거 실행과 Realtime 업데이트에 약간의 지연(100-300ms) 있을 수 있음
   - 이는 정상이며, `setTimeout`으로 처리됨


