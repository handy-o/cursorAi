export interface User {
  id: string;
  username: string;
  profileImage: string;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface Friend {
  id: string;
  username: string;
  profileImage: string;
  isOnline?: boolean;
}

export interface SuggestedFriend {
  id: string;
  username: string;
  profileImage: string;
  mutualFriends?: number;
  isFollowing?: boolean;
}
