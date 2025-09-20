'use client';

import { ArrowLeft, Bell, MoreHorizontal } from 'lucide-react';

interface ChatHeaderProps {
  unreadCount?: number;
  participantCount?: number;
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  onMenuClick?: () => void;
}

export default function ChatHeader({ 
  unreadCount = 3, 
  participantCount = 2,
  onBackClick,
  onNotificationClick,
  onMenuClick
}: ChatHeaderProps) {
  return (
    <div className="border-b border-neutral-200/50 px-4 py-3" style={{ backgroundColor: '#bacee0' }}>
      <div className="flex items-center justify-between">
        {/* 왼쪽: 뒤로가기 버튼 */}
        <button
          onClick={onBackClick}
          className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-700" />
        </button>

        {/* 중앙: 채팅방 정보 */}
        <div className="flex-1 text-left pl-3">
          <h1 className="text-lg font-medium text-neutral-700 tracking-tight">채팅방</h1>
          <p className="text-xs text-neutral-600 mt-0.5">{participantCount}명</p>
        </div>

        {/* 오른쪽: 알림, 메뉴 버튼 */}
        <div className="flex items-center gap-2">
          {/* 알림 버튼 */}
          <button
            onClick={onNotificationClick}
            className="relative p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="알림"
          >
            <Bell className="w-5 h-5 text-neutral-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* 메뉴 버튼 */}
          <button
            onClick={onMenuClick}
            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="메뉴"
          >
            <MoreHorizontal className="w-5 h-5 text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
