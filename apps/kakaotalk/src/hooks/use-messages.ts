'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types/message';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const STORAGE_KEY = 'kakaotalk-messages';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse stored messages:', error);
      }
    } else {
      // Add sample messages for first-time users
      const sampleMessages: Message[] = [
        {
          id: '1',
          content: '안녕하세요! 카카오톡 클론코딩에 오신 것을 환영합니다.',
          timestamp: new Date(Date.now() - 60000),
          isFromUser: false,
        },
        {
          id: '2',
          content: '메시지를 입력하고 전송해보세요!',
          timestamp: new Date(Date.now() - 30000),
          isFromUser: false,
        },
      ];
      setMessages(sampleMessages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleMessages));
    }
  }, []);

  const addMessage = (content: string, isFromUser: boolean = true) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isFromUser,
    };
    
    const updatedMessages = [...messages, newMessage];
    saveMessages(updatedMessages);
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: ko });
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    messages,
    addMessage,
    formatTime,
    clearMessages,
  };
}
