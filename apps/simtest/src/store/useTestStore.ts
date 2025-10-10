import { create } from 'zustand';
import { UserInfo, Answer } from '@/types';

interface TestStore {
  userInfo: UserInfo;
  answers: Answer[];
  currentQuestionIndex: number;
  isTestStarted: boolean;
  isTestCompleted: boolean;
  isCalculating: boolean;
  
  setUserInfo: (info: UserInfo) => void;
  startTest: () => void;
  setAnswer: (questionId: number, selectedOptionIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  startCalculating: () => void;
  completeTest: () => void;
  resetTest: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
  userInfo: { age: '', gender: '' },
  answers: [],
  currentQuestionIndex: 0,
  isTestStarted: false,
  isTestCompleted: false,
  isCalculating: false,

  setUserInfo: (info) => set({ userInfo: info }),

  startTest: () => set({ isTestStarted: true }),

  setAnswer: (questionId, selectedOptionIndex) =>
    set((state) => {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === questionId
      );

      const newAnswers = [...state.answers];
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = { questionId, selectedOptionIndex };
      } else {
        newAnswers.push({ questionId, selectedOptionIndex });
      }

      return { answers: newAnswers };
    }),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.min(
        state.currentQuestionIndex + 1,
        19
      ),
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),

  goToQuestion: (index) => set({ currentQuestionIndex: index }),

  startCalculating: () => set({ isCalculating: true }),

  completeTest: () => set({ isTestCompleted: true, isCalculating: false }),

  resetTest: () =>
    set({
      userInfo: { age: '', gender: '' },
      answers: [],
      currentQuestionIndex: 0,
      isTestStarted: false,
      isTestCompleted: false,
      isCalculating: false,
    }),
}));

