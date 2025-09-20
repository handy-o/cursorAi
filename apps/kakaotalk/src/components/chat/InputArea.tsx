'use client';

import { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
}

export default function InputArea({ onSendMessage }: InputAreaProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 텍스트 영역 높이 자동 조정
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  return (
    <div className="bg-white/95 backdrop-blur-sm border-t border-neutral-200/50 p-4">
      <div className="flex items-end gap-2 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요 (Shift+Enter로 줄바꿈)"
          className="flex-1 px-4 py-3 border border-neutral-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 resize-none min-h-[40px] max-h-[120px] overflow-y-auto bg-white/80 backdrop-blur-sm text-neutral-700 placeholder:text-neutral-500 font-sans text-15 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 hover:scrollbar-thumb-neutral-400"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          size="sm"
          className="rounded-full h-10 w-10 disabled:cursor-not-allowed shadow-sm transition-all duration-200 flex items-center justify-center"
          style={{
            backgroundColor: inputValue.trim() ? '#ffeb33' : '#b1c3d5'
          }}
          aria-label="메시지 전송"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
