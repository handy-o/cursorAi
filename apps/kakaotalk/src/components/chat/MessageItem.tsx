'use client';

import { Message } from '@/types/message';

interface MessageItemProps {
  message: Message;
  formatTime: (date: Date) => string;
  showTime?: boolean;
}

export default function MessageItem({ message, formatTime, showTime = true }: MessageItemProps) {
  return (
    <div className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[70%] ${message.isFromUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-3 py-2 rounded-2xl ${
            message.isFromUser
              ? 'rounded-br-sm shadow-sm'
              : 'bg-white border border-neutral-200/60 rounded-bl-sm shadow-sm'
          }`}
          style={{
            backgroundColor: message.isFromUser ? '#ffeb33' : 'white',
            color: '#171717'
          }}
        >
          <p className="text-15 whitespace-pre-wrap font-sans text-neutral-700">{message.content}</p>
        </div>
        {showTime && (
          <p className={`text-xs text-neutral-500 mt-1 ${message.isFromUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}
