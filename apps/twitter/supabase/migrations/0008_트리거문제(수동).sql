-- 트리거 문제 해결: 로그 포함 트리거 + 수동 카운트 업데이트 RPC 함수
-- 이 마이그레이션은 트리거가 작동하지 않는 문제를 해결하기 위해 
-- 트리거와 클라이언트 직접 업데이트를 모두 지원합니다.

-- ============================================
-- 1. 로그가 포함된 트리거 함수 생성
-- ============================================

-- 좋아요 증가 트리거 함수 (로그 포함)
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  RAISE NOTICE 'increment_likes_count triggered for tweet_id: %', NEW.tweet_id;
  UPDATE tweets 
  SET likes_count = likes_count + 1 
  WHERE id = NEW.tweet_id;
  RAISE NOTICE 'Updated likes_count for tweet_id: %', NEW.tweet_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 좋아요 감소 트리거 함수 (로그 포함)
CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  RAISE NOTICE 'decrement_likes_count triggered for tweet_id: %', OLD.tweet_id;
  UPDATE tweets 
  SET likes_count = likes_count - 1 
  WHERE id = OLD.tweet_id;
  RAISE NOTICE 'Updated likes_count (decremented) for tweet_id: %', OLD.tweet_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 답글 증가 트리거 함수 (로그 포함)
CREATE OR REPLACE FUNCTION increment_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reply_to_id IS NOT NULL THEN
    RAISE NOTICE 'increment_replies_count triggered for parent_tweet_id: %', NEW.reply_to_id;
    UPDATE tweets 
    SET replies_count = replies_count + 1 
    WHERE id = NEW.reply_to_id;
    RAISE NOTICE 'Updated replies_count for parent_tweet_id: %', NEW.reply_to_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 답글 감소 트리거 함수 (로그 포함)
CREATE OR REPLACE FUNCTION decrement_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.reply_to_id IS NOT NULL THEN
    RAISE NOTICE 'decrement_replies_count triggered for parent_tweet_id: %', OLD.reply_to_id;
    UPDATE tweets 
    SET replies_count = replies_count - 1 
    WHERE id = OLD.reply_to_id;
    RAISE NOTICE 'Updated replies_count (decremented) for parent_tweet_id: %', OLD.reply_to_id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 2. 수동 카운트 업데이트 RPC 함수 생성
-- ============================================

-- 답글 수 수동 증가 함수
CREATE OR REPLACE FUNCTION increment_replies_count_manual(tweet_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tweets 
  SET replies_count = replies_count + 1 
  WHERE id = tweet_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 답글 수 수동 감소 함수
CREATE OR REPLACE FUNCTION decrement_replies_count_manual(tweet_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tweets 
  SET replies_count = GREATEST(0, replies_count - 1)
  WHERE id = tweet_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 3. 트리거 재생성
-- ============================================

-- 기존 트리거 삭제
DROP TRIGGER IF EXISTS increment_likes_trigger ON likes;
DROP TRIGGER IF EXISTS decrement_likes_trigger ON likes;
DROP TRIGGER IF EXISTS increment_replies_trigger ON tweets;
DROP TRIGGER IF EXISTS decrement_replies_trigger ON tweets;

-- 트리거 재생성
CREATE TRIGGER increment_likes_trigger
  AFTER INSERT ON likes
  FOR EACH ROW 
  EXECUTE FUNCTION increment_likes_count();

CREATE TRIGGER decrement_likes_trigger
  AFTER DELETE ON likes
  FOR EACH ROW 
  EXECUTE FUNCTION decrement_likes_count();

CREATE TRIGGER increment_replies_trigger
  AFTER INSERT ON tweets
  FOR EACH ROW 
  EXECUTE FUNCTION increment_replies_count();

CREATE TRIGGER decrement_replies_trigger
  AFTER DELETE ON tweets
  FOR EACH ROW 
  EXECUTE FUNCTION decrement_replies_count();

-- ============================================
-- 4. 권한 부여
-- ============================================

-- 트리거 함수 권한
GRANT EXECUTE ON FUNCTION increment_likes_count() TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_likes_count() TO authenticated;
GRANT EXECUTE ON FUNCTION increment_replies_count() TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_replies_count() TO authenticated;

-- RPC 함수 권한
GRANT EXECUTE ON FUNCTION increment_replies_count_manual(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION decrement_replies_count_manual(UUID) TO authenticated;

-- ============================================
-- 5. 기존 데이터 동기화
-- ============================================

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

-- ============================================
-- 완료 메시지
-- ============================================

-- 이 마이그레이션으로 다음이 해결됩니다:
-- 1. 트리거가 작동하지 않는 문제 (로그로 확인 가능)
-- 2. 클라이언트에서 직접 카운트 업데이트 가능
-- 3. 기존 데이터의 카운트 동기화
-- 4. 이중 보장 시스템 (트리거 + 클라이언트 직접 업데이트)