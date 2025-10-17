'use client'

import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  onOptionClick?: (option: { id: string; label: string }) => void;
}

export function ChatMessage({ message, onOptionClick }: ChatMessageProps) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 md:mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-lg px-3 md:px-4 py-2.5 md:py-3 shadow-sm text-sm md:text-base ${
          isBot
            ? 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
        
        {message.options && message.options.length > 0 && (
          <div className="mt-2.5 md:mt-3 flex flex-col gap-1.5 md:gap-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => onOptionClick?.(option)}
                className="w-full text-left px-3 md:px-4 py-2 md:py-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-gray-100 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-600 dark:hover:to-gray-500 border border-blue-200 dark:border-gray-500 transition-all font-medium shadow-sm hover:shadow text-sm md:text-base active:scale-[0.98]"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

