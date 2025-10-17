-- Update replies count trigger for tweets
-- This will automatically update the replies_count when replies are added or removed

-- Function to increment replies count
CREATE OR REPLACE FUNCTION increment_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update if this is a new reply (not a retweet)
  IF NEW.reply_to_id IS NOT NULL THEN
    UPDATE tweets 
    SET replies_count = replies_count + 1 
    WHERE id = NEW.reply_to_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement replies count
CREATE OR REPLACE FUNCTION decrement_replies_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update if this was a reply (not a retweet)
  IF OLD.reply_to_id IS NOT NULL THEN
    UPDATE tweets 
    SET replies_count = replies_count - 1 
    WHERE id = OLD.reply_to_id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS increment_replies_trigger ON tweets;
CREATE TRIGGER increment_replies_trigger
  AFTER INSERT ON tweets
  FOR EACH ROW 
  EXECUTE FUNCTION increment_replies_count();

DROP TRIGGER IF EXISTS decrement_replies_trigger ON tweets;
CREATE TRIGGER decrement_replies_trigger
  AFTER DELETE ON tweets
  FOR EACH ROW 
  EXECUTE FUNCTION decrement_replies_count();

-- Update existing replies count for all tweets
UPDATE tweets 
SET replies_count = (
  SELECT COUNT(*) 
  FROM tweets replies 
  WHERE replies.reply_to_id = tweets.id
);

-- Add comments
COMMENT ON FUNCTION increment_replies_count() IS 'Automatically increments replies_count when a new reply is added';
COMMENT ON FUNCTION decrement_replies_count() IS 'Automatically decrements replies_count when a reply is deleted';

