'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import FeedCard from '@/components/feed/FeedCard';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import { mockPosts, mockFriends, mockSuggestedFriends } from '@/data/mockData';
import { Post } from '@/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }
    
    return posts.filter(post => 
      post.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleFollow = (userId: string) => {
    console.log('Followed user:', userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <main className="container mx-auto max-w-6xl px-4 py-8 pb-24 md:pb-8">
        <div className="flex gap-8">
          {/* Feed Section */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <FeedCard 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-inst-text-primary mb-2">검색 결과가 없습니다</h3>
                <p className="text-base text-inst-text-secondary">다른 검색어를 시도해보세요.</p>
              </div>
            )}
          </div>

          {/* Sidebar - Hidden on mobile and tablet */}
          <div className="hidden xl:block">
            <Sidebar 
              friends={mockFriends}
              suggestedFriends={mockSuggestedFriends}
              onFollow={handleFollow}
            />
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
