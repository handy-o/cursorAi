export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  location: string | null;
  birth_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Tweet {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  reply_to_id: string | null;
  retweet_of_id: string | null;
  likes_count: number;
  retweets_count: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Like {
  id: string;
  user_id: string;
  tweet_id: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  tweet_id: string;
  created_at: string;
}

export interface TweetWithProfile extends Tweet {
  profile: Profile;
}


