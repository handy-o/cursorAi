-- Add likes count trigger for tweets
-- This will automatically update the likes_count when likes are added or removed

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tweets 
  SET likes_count = likes_count + 1 
  WHERE id = NEW.tweet_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tweets 
  SET likes_count = likes_count - 1 
  WHERE id = OLD.tweet_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for likes
DROP TRIGGER IF EXISTS increment_likes_trigger ON likes;
CREATE TRIGGER increment_likes_trigger
  AFTER INSERT ON likes
  FOR EACH ROW 
  EXECUTE FUNCTION increment_likes_count();

DROP TRIGGER IF EXISTS decrement_likes_trigger ON likes;
CREATE TRIGGER decrement_likes_trigger
  AFTER DELETE ON likes
  FOR EACH ROW 
  EXECUTE FUNCTION decrement_likes_count();

-- Update existing likes count for all tweets
UPDATE tweets 
SET likes_count = (
  SELECT COUNT(*) 
  FROM likes 
  WHERE likes.tweet_id = tweets.id
);

-- Add comments
COMMENT ON FUNCTION increment_likes_count() IS 'Automatically increments likes_count when a new like is added';
COMMENT ON FUNCTION decrement_likes_count() IS 'Automatically decrements likes_count when a like is removed';

