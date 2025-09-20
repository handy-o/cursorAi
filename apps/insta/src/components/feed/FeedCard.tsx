'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface FeedCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export default function FeedCard({ post, onLike }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(prev => newIsLiked ? prev + 1 : prev - 1);
    onLike?.(post.id);
  };

  const formatLikes = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.profileImage} alt={post.user.username} />
            <AvatarFallback>{post.user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-base text-inst-text-primary">{post.user.username}</span>
            {post.user.isVerified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-1">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={post.image}
          alt={post.caption}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`transition-colors ${
                isLiked ? 'text-insta-accent' : 'text-inst-text-primary hover:text-inst-text-secondary'
              }`}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="text-inst-text-primary hover:text-inst-text-secondary transition-colors">
              <MessageCircle className="h-6 w-6" />
            </button>
            <button className="text-inst-text-primary hover:text-inst-text-secondary transition-colors">
              <Send className="h-6 w-6" />
            </button>
          </div>
          <button className="text-inst-text-primary hover:text-inst-text-secondary transition-colors">
            <Bookmark className="h-6 w-6" />
          </button>
        </div>

        {/* Likes Count */}
        {likes > 0 && (
          <div className="mb-3">
            <span className="font-semibold text-base text-inst-text-primary">{formatLikes(likes)}개 좋아요</span>
          </div>
        )}

        {/* Caption */}
        <div className="mb-3">
          <span className="font-semibold text-base mr-2 text-inst-text-primary">{post.user.username}</span>
          <span className="text-base text-inst-text-primary">{post.caption}</span>
        </div>

        {/* Comments */}
        {post.comments > 0 && (
          <button className="text-inst-text-secondary text-sm hover:text-inst-text-primary transition-colors mb-2">
            댓글 {post.comments}개 모두 보기
          </button>
        )}

        {/* Timestamp */}
        <div className="mt-3">
          <span className="text-sm text-inst-text-tertiary">{post.timestamp}</span>
        </div>
      </div>
    </article>
  );
}
