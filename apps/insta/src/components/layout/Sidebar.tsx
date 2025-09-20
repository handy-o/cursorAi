'use client';

import { useState } from 'react';
import { Friend, SuggestedFriend } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  friends: Friend[];
  suggestedFriends: SuggestedFriend[];
  onFollow?: (userId: string) => void;
}

export default function Sidebar({ friends, suggestedFriends, onFollow }: SidebarProps) {
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const handleFollow = (userId: string) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
    onFollow?.(userId);
  };

  return (
    <div className="w-80 space-y-6">
      {/* My Profile */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://picsum.photos/150/150?random=100" alt="My Profile" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-base text-inst-text-primary">my_username</p>
            <p className="text-inst-text-secondary text-sm">내 프로필</p>
          </div>
          <Button variant="ghost" size="sm" className="text-insta-primary text-xs font-semibold">
            전환
          </Button>
        </div>
      </div>

      {/* Friends List */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-base text-inst-text-secondary">내 친구</span>
          <Button variant="ghost" size="sm" className="text-insta-primary text-sm font-semibold">
            모두 보기
          </Button>
        </div>
        <div className="space-y-3">
          {friends.slice(0, 5).map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.profileImage} alt={friend.username} />
                  <AvatarFallback>{friend.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base text-inst-text-primary">{friend.username}</p>
                <p className="text-inst-text-tertiary text-sm">
                  {friend.isOnline ? '온라인' : '오프라인'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Friends */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-base text-inst-text-secondary">회원님을 위한 추천</span>
          <Button variant="ghost" size="sm" className="text-insta-primary text-sm font-semibold">
            모두 보기
          </Button>
        </div>
        <div className="space-y-4">
          {suggestedFriends.map((suggested) => {
            const isFollowing = following.has(suggested.id);
            return (
              <div key={suggested.id} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={suggested.profileImage} alt={suggested.username} />
                  <AvatarFallback>{suggested.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-base text-inst-text-primary">{suggested.username}</p>
                  <p className="text-inst-text-tertiary text-sm">
                    {suggested.mutualFriends}명의 공통 친구
                  </p>
                </div>
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  size="sm"
                  onClick={() => handleFollow(suggested.id)}
                  className={`text-sm font-semibold ${
                    isFollowing 
                      ? 'bg-gray-100 text-inst-text-primary hover:bg-gray-200' 
                      : 'bg-insta-primary hover:bg-insta-primary/90 text-white'
                  }`}
                >
                  {isFollowing ? '팔로잉' : '팔로우'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Links */}
      <div className="text-sm text-inst-text-quaternary space-y-1">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">소개</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">도움말</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">홍보 센터</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">API</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">채용 정보</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">약관</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">위치</a>
          <a href="#" className="hover:text-inst-text-tertiary transition-colors">언어</a>
        </div>
        <p className="mt-2">© 2024 INSTAGRAM CLONE</p>
      </div>
    </div>
  );
}
