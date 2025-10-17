'use client'

import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChatBot } from '@/hooks/useChatBot';

export default function Home() {
  const { messages, isLoading, handleOptionClick, handleUserMessage, clearHistory } = useChatBot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-0 md:p-4">
      <div className="w-full md:max-w-md lg:max-w-lg h-screen md:h-[90vh] md:max-h-[900px] flex flex-col bg-white dark:bg-gray-800 md:rounded-3xl shadow-none md:shadow-2xl overflow-hidden">
        <header className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 md:px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-white truncate">
              기업 규정 조회 챗봇
            </h1>
            <p className="text-xs md:text-sm text-blue-100 truncate">
              원하시는 규정을 쉽게 찾아보세요
            </p>
          </div>
          <button
            onClick={clearHistory}
            className="ml-2 px-3 md:px-4 py-2 text-xs md:text-sm text-white bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm whitespace-nowrap"
          >
            초기화
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-3 md:px-4 py-4 md:py-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-full mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onOptionClick={handleOptionClick}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSend={handleUserMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
