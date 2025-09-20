import { Post, Friend, SuggestedFriend } from '@/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      username: 'sarah_johnson',
      profileImage: 'https://picsum.photos/150/150?random=1',
      isVerified: true,
    },
    image: 'https://picsum.photos/600/600?random=10',
    caption: 'Beautiful sunset from my vacation! 🌅 #travel #sunset #nature',
    likes: 1247,
    comments: 89,
    timestamp: '2시간 전',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      username: 'mike_chen',
      profileImage: 'https://picsum.photos/150/150?random=2',
    },
    image: 'https://picsum.photos/600/600?random=11',
    caption: 'Coffee and code ☕️ #developer #coding #coffee',
    likes: 432,
    comments: 23,
    timestamp: '4시간 전',
    isLiked: true,
  },
  {
    id: '3',
    user: {
      id: 'user3',
      username: 'emma_wilson',
      profileImage: 'https://picsum.photos/150/150?random=3',
      isVerified: true,
    },
    image: 'https://picsum.photos/600/600?random=12',
    caption: 'New recipe I tried today! So delicious 😋 #cooking #food #recipe',
    likes: 2156,
    comments: 156,
    timestamp: '6시간 전',
    isLiked: false,
  },
  {
    id: '4',
    user: {
      id: 'user4',
      username: 'alex_kim',
      profileImage: 'https://picsum.photos/150/150?random=4',
    },
    image: 'https://picsum.photos/600/600?random=13',
    caption: 'Weekend vibes 🏖️ #weekend #beach #relax',
    likes: 789,
    comments: 45,
    timestamp: '8시간 전',
    isLiked: false,
  },
  {
    id: '5',
    user: {
      id: 'user5',
      username: 'lisa_park',
      profileImage: 'https://picsum.photos/150/150?random=5',
    },
    image: 'https://picsum.photos/600/600?random=14',
    caption: 'Morning workout complete! 💪 #fitness #workout #healthy',
    likes: 634,
    comments: 67,
    timestamp: '10시간 전',
    isLiked: true,
  },
  {
    id: '6',
    user: {
      id: 'user6',
      username: 'david_lee',
      profileImage: 'https://picsum.photos/150/150?random=6',
    },
    image: 'https://picsum.photos/600/600?random=15',
    caption: 'Amazing architecture in the city 🏙️ #architecture #city #photography',
    likes: 1567,
    comments: 123,
    timestamp: '12시간 전',
    isLiked: false,
  },
];

export const mockFriends: Friend[] = [
  {
    id: 'friend1',
    username: 'jessica_martin',
    profileImage: 'https://picsum.photos/150/150?random=7',
    isOnline: true,
  },
  {
    id: 'friend2',
    username: 'ryan_taylor',
    profileImage: 'https://picsum.photos/150/150?random=8',
    isOnline: false,
  },
  {
    id: 'friend3',
    username: 'sophie_brown',
    profileImage: 'https://picsum.photos/150/150?random=9',
    isOnline: true,
  },
  {
    id: 'friend4',
    username: 'tom_wilson',
    profileImage: 'https://picsum.photos/150/150?random=16',
    isOnline: false,
  },
  {
    id: 'friend5',
    username: 'anna_clark',
    profileImage: 'https://picsum.photos/150/150?random=17',
    isOnline: true,
  },
];

export const mockSuggestedFriends: SuggestedFriend[] = [
  {
    id: 'suggest1',
    username: 'chris_anderson',
    profileImage: 'https://picsum.photos/150/150?random=18',
    mutualFriends: 12,
    isFollowing: false,
  },
  {
    id: 'suggest2',
    username: 'maya_patel',
    profileImage: 'https://picsum.photos/150/150?random=19',
    mutualFriends: 8,
    isFollowing: false,
  },
  {
    id: 'suggest3',
    username: 'kevin_nguyen',
    profileImage: 'https://picsum.photos/150/150?random=20',
    mutualFriends: 5,
    isFollowing: false,
  },
  {
    id: 'suggest4',
    username: 'zoe_garcia',
    profileImage: 'https://picsum.photos/150/150?random=21',
    mutualFriends: 15,
    isFollowing: false,
  },
  {
    id: 'suggest5',
    username: 'james_rodriguez',
    profileImage: 'https://picsum.photos/150/150?random=22',
    mutualFriends: 3,
    isFollowing: false,
  },
];
