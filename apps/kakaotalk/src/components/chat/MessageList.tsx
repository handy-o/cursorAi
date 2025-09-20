'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/message';
import MessageItem from './MessageItem';
import DateSeparator from './DateSeparator';
import { isSameDay, isSameMinute } from 'date-fns';

interface MessageListProps {
  messages: Message[];
  formatTime: (date: Date) => string;
}

export default function MessageList({ messages, formatTime }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 시간 표시 여부를 결정하는 함수
  const shouldShowTime = (currentMessage: Message, nextMessage: Message | undefined): boolean => {
    // 마지막 메시지이거나 다음 메시지가 없으면 시간 표시
    if (!nextMessage) return true;
    
    // 발신자가 다르면 시간 표시
    if (currentMessage.isFromUser !== nextMessage.isFromUser) return true;
    
    // 같은 시간, 같은 분에 전송되지 않았으면 시간 표시
    if (!isSameMinute(currentMessage.timestamp, nextMessage.timestamp)) return true;
    
    // 같은 발신자이고 같은 분에 전송된 경우 시간 숨김
    return false;
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 message-scroll" style={{ backgroundColor: '#bacee0' }}>
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-neutral-500">
          <p className="text-center">
            메시지를 입력해보세요!
            <br />
            <span className="text-sm">대화를 시작해보세요.</span>
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {messages.map((message, index) => {
            const showDateSeparator = index === 0 || !isSameDay(message.timestamp, messages[index - 1].timestamp);
            const nextMessage = messages[index + 1];
            const showTime = shouldShowTime(message, nextMessage);
            
            return (
              <div key={message.id}>
                {showDateSeparator && <DateSeparator date={message.timestamp} />}
                <MessageItem message={message} formatTime={formatTime} showTime={showTime} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
