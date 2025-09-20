'use client';

import { useMessages } from '@/hooks/use-messages';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import InputArea from '@/components/chat/InputArea';

export default function ChatRoom() {
  const { messages, addMessage, formatTime } = useMessages();

  const handleSendMessage = (content: string) => {
    addMessage(content, true);
  };

  const handleBackClick = () => {
    console.log('채팅 목록으로 이동');
    // 실제로는 라우팅이나 상태 변경 로직이 들어갑니다
  };

  const handleNotificationClick = () => {
    console.log('알림 클릭');
    // 실제로는 알림 목록이나 설정으로 이동
  };

  const handleMenuClick = () => {
    console.log('메뉴 클릭');
    // 실제로는 채팅방 설정 메뉴 표시
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg h-[680px] md:h-[780px] bg-white rounded-3xl md:rounded-2xl shadow-2xl border border-neutral-200/50 overflow-hidden flex flex-col backdrop-blur-sm">
        <ChatHeader 
          unreadCount={3}
          participantCount={2}
          onBackClick={handleBackClick}
          onNotificationClick={handleNotificationClick}
          onMenuClick={handleMenuClick}
        />
        <MessageList messages={messages} formatTime={formatTime} />
        <InputArea onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
