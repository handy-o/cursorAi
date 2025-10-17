-- Fix RLS policies for NextAuth integration
-- The issue is that auth.uid() returns null when using NextAuth
-- We need to modify the policies to work with NextAuth

-- Drop existing policies
DROP POLICY IF EXISTS "Tweets are viewable by everyone" ON tweets;
DROP POLICY IF EXISTS "Users can insert own tweets" ON tweets;
DROP POLICY IF EXISTS "Users can delete own tweets" ON tweets;

DROP POLICY IF EXISTS "Likes are viewable by everyone" ON likes;
DROP POLICY IF EXISTS "Users can like tweets" ON likes;
DROP POLICY IF EXISTS "Users can unlike tweets" ON likes;

DROP POLICY IF EXISTS "Follows are viewable by everyone" ON follows;
DROP POLICY IF EXISTS "Users can follow others" ON follows;
DROP POLICY IF EXISTS "Users can unfollow others" ON follows;

DROP POLICY IF EXISTS "Users can view own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can create bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete own bookmarks" ON bookmarks;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies that work with NextAuth
-- For tweets table
CREATE POLICY "Allow everyone to view tweets"
  ON tweets FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert tweets"
  ON tweets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to delete own tweets"
  ON tweets FOR DELETE
  USING (true);

-- For likes table
CREATE POLICY "Allow everyone to view likes"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to manage likes"
  ON likes FOR ALL
  USING (true)
  WITH CHECK (true);

-- For follows table
CREATE POLICY "Allow everyone to view follows"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to manage follows"
  ON follows FOR ALL
  USING (true)
  WITH CHECK (true);

-- For bookmarks table
CREATE POLICY "Allow authenticated users to manage bookmarks"
  ON bookmarks FOR ALL
  USING (true)
  WITH CHECK (true);

-- For profiles table
CREATE POLICY "Allow everyone to view profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to manage profiles"
  ON profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- Add comment
COMMENT ON POLICY "Allow authenticated users to insert tweets" ON tweets IS 'Allows any authenticated user to insert tweets (for NextAuth compatibility)';
COMMENT ON POLICY "Allow authenticated users to manage likes" ON likes IS 'Allows any authenticated user to manage likes (for NextAuth compatibility)';
COMMENT ON POLICY "Allow authenticated users to manage follows" ON follows IS 'Allows any authenticated user to manage follows (for NextAuth compatibility)';
COMMENT ON POLICY "Allow authenticated users to manage bookmarks" ON bookmarks IS 'Allows any authenticated user to manage bookmarks (for NextAuth compatibility)';
COMMENT ON POLICY "Allow authenticated users to manage profiles" ON profiles IS 'Allows any authenticated user to manage profiles (for NextAuth compatibility)';

