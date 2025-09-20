'use client';

import { Home, Search, Plus, Heart, User } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-3">
        <button className="flex flex-col items-center space-y-1 p-2 text-inst-text-primary">
          <Home className="h-6 w-6" />
          <span className="text-sm">홈</span>
        </button>
        <button className="flex flex-col items-center space-y-1 p-2 text-inst-text-secondary">
          <Search className="h-6 w-6" />
          <span className="text-sm">검색</span>
        </button>
        <button className="flex flex-col items-center space-y-1 p-2 text-inst-text-secondary">
          <Plus className="h-6 w-6" />
          <span className="text-sm">만들기</span>
        </button>
        <button className="flex flex-col items-center space-y-1 p-2 text-inst-text-secondary">
          <Heart className="h-6 w-6" />
          <span className="text-sm">알림</span>
        </button>
        <button className="flex flex-col items-center space-y-1 p-2 text-inst-text-secondary">
          <User className="h-6 w-6" />
          <span className="text-sm">프로필</span>
        </button>
      </div>
    </nav>
  );
}
