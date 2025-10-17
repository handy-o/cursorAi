'use client'

import { useState, useEffect, useCallback } from 'react';
import { Message, ChatState } from '@/types/chat';
import { getCategories, getRegulationsByCategory, Category, Regulation } from '@/lib/api/regulations';

const STORAGE_KEY = 'chatbot_messages';

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatState['currentStep']>('initial');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed);
      } catch (error) {
        console.error('Failed to parse saved messages:', error);
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const initializeChat = async () => {
    setIsLoading(true);
    const categories = await getCategories();
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: '안녕하세요! 기업 규정 조회 챗봇입니다.\n\n💡 사용 방법:\n• 아래 분류 버튼을 클릭하거나\n• 키워드를 입력해서 검색하세요\n  예) "연차", "재택", "비밀번호", "출장"',
      sender: 'bot',
      timestamp: Date.now(),
      options: categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        type: 'category' as const,
      })),
    };

    setMessages([welcomeMessage]);
    setCurrentStep('initial');
    setIsLoading(false);
  };

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const handleCategorySelect = async (categoryId: string, categoryName: string) => {
    addMessage({
      text: categoryName,
      sender: 'user',
    });

    setIsLoading(true);
    const regulations = await getRegulationsByCategory(categoryId);

    if (regulations.length === 0) {
      addMessage({
        text: '해당 분류에 등록된 규정이 없습니다.\n다시 선택해주세요.',
        sender: 'bot',
        options: await getCategories().then((cats) =>
          cats.map((cat) => ({
            id: cat.id,
            label: cat.name,
            type: 'category' as const,
          }))
        ),
      });
      setIsLoading(false);
      return;
    }

    addMessage({
      text: `${categoryName} 규정 목록입니다.\n확인하실 규정을 선택해주세요.`,
      sender: 'bot',
      options: regulations.map((reg) => ({
        id: reg.id,
        label: reg.title,
        type: 'regulation' as const,
      })),
    });

    setSelectedCategoryId(categoryId);
    setCurrentStep('category_selected');
    setIsLoading(false);
  };

  const handleRegulationSelect = async (regulationId: string, regulationTitle: string) => {
    addMessage({
      text: regulationTitle,
      sender: 'user',
    });

    setIsLoading(true);
    const categories = await getCategories();
    const regulations = selectedCategoryId
      ? await getRegulationsByCategory(selectedCategoryId)
      : [];

    const regulation = regulations.find((r) => r.id === regulationId);

    if (!regulation) {
      addMessage({
        text: '규정을 찾을 수 없습니다.',
        sender: 'bot',
      });
      setIsLoading(false);
      return;
    }

    addMessage({
      text: `📋 ${regulation.title}\n\n${regulation.content}`,
      sender: 'bot',
      options: [
        ...(selectedCategoryId
          ? [
              {
                id: 'back',
                label: '← 이전 분류로 돌아가기',
                type: 'category' as const,
              },
            ]
          : []),
        {
          id: 'restart',
          label: '🏠 처음으로 돌아가기',
          type: 'restart' as const,
        },
      ],
    });

    setCurrentStep('regulation_shown');
    setIsLoading(false);
  };

  const handleBackToCategory = async () => {
    if (!selectedCategoryId) return;

    setIsLoading(true);
    const categories = await getCategories();
    const category = categories.find((c) => c.id === selectedCategoryId);
    const regulations = await getRegulationsByCategory(selectedCategoryId);

    if (category) {
      addMessage({
        text: '← 이전 분류로 돌아가기',
        sender: 'user',
      });

      addMessage({
        text: `${category.name} 규정 목록입니다.\n확인하실 규정을 선택해주세요.`,
        sender: 'bot',
        options: regulations.map((reg) => ({
          id: reg.id,
          label: reg.title,
          type: 'regulation' as const,
        })),
      });

      setCurrentStep('category_selected');
    }
    setIsLoading(false);
  };

  const handleRestart = () => {
    addMessage({
      text: '🏠 처음으로 돌아가기',
      sender: 'user',
    });
    setSelectedCategoryId(undefined);
    initializeChat();
  };

  const handleOptionClick = async (option: { id: string; label: string; type?: string }) => {
    if (option.type === 'restart') {
      handleRestart();
    } else if (option.type === 'category' && option.id === 'back') {
      await handleBackToCategory();
    } else if (option.type === 'category') {
      await handleCategorySelect(option.id, option.label);
    } else if (option.type === 'regulation') {
      await handleRegulationSelect(option.id, option.label);
    }
  };

  const handleUserMessage = async (text: string) => {
    addMessage({
      text,
      sender: 'user',
    });

    setIsLoading(true);
    const searchQuery = text.trim().toLowerCase();
    const categories = await getCategories();
    
    // 1. 처음으로, 초기화 등의 명령어 처리
    if (searchQuery.includes('처음') || searchQuery.includes('초기화') || searchQuery.includes('다시')) {
      handleRestart();
      setIsLoading(false);
      return;
    }

    // 2. 카테고리 이름 매칭
    const matchedCategory = categories.find((cat) => 
      cat.name.toLowerCase().includes(searchQuery) || 
      searchQuery.includes(cat.name.toLowerCase())
    );

    if (matchedCategory) {
      setIsLoading(false);
      await handleCategorySelect(matchedCategory.id, matchedCategory.name);
      return;
    }

    // 3. 모든 규정에서 검색
    const allRegulations: Array<Regulation & { categoryName: string }> = [];
    for (const category of categories) {
      const regulations = await getRegulationsByCategory(category.id);
      regulations.forEach((reg) => {
        allRegulations.push({
          ...reg,
          categoryName: category.name,
        });
      });
    }

    // 규정 제목에서 매칭
    const titleMatches = allRegulations.filter((reg) =>
      reg.title.toLowerCase().includes(searchQuery) ||
      searchQuery.includes(reg.title.toLowerCase())
    );

    // 규정 내용에서 매칭
    const contentMatches = allRegulations.filter((reg) =>
      reg.content.toLowerCase().includes(searchQuery)
    );

    // 중복 제거
    const uniqueMatches = Array.from(
      new Map(
        [...titleMatches, ...contentMatches].map((item) => [item.id, item])
      ).values()
    );

    // 결과가 있을 때
    if (uniqueMatches.length > 0) {
      if (uniqueMatches.length === 1) {
        // 정확히 하나 매칭 - 바로 규정 내용 보여주기
        const regulation = uniqueMatches[0];
        addMessage({
          text: `"${searchQuery}"와 관련된 규정을 찾았습니다!`,
          sender: 'bot',
        });
        addMessage({
          text: `📋 ${regulation.title}\n\n${regulation.content}`,
          sender: 'bot',
          options: [
            {
              id: 'restart',
              label: '🏠 처음으로 돌아가기',
              type: 'restart' as const,
            },
          ],
        });
      } else {
        // 여러 개 매칭 - 선택 옵션 제공
        addMessage({
          text: `"${searchQuery}"와 관련된 규정 ${uniqueMatches.length}개를 찾았습니다.\n확인하실 규정을 선택해주세요.`,
          sender: 'bot',
          options: uniqueMatches.map((reg) => ({
            id: reg.id,
            label: `${reg.title} (${reg.categoryName})`,
            type: 'regulation' as const,
          })),
        });
      }
      setIsLoading(false);
      return;
    }

    // 결과가 없을 때
    addMessage({
      text: `"${searchQuery}"와 관련된 규정을 찾지 못했습니다.\n\n💡 검색 도움말:\n• 카테고리명: "인사", "복리후생", "보안", "업무"\n• 키워드: "연차", "재택", "비밀번호", "출장" 등\n\n아래 분류에서 선택해주세요.`,
      sender: 'bot',
      options: categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        type: 'category' as const,
      })),
    });
    setIsLoading(false);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    initializeChat();
  };

  return {
    messages,
    isLoading,
    handleOptionClick,
    handleUserMessage,
    clearHistory,
  };
}

