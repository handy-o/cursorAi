'use client';

import { useState, useRef, useEffect } from 'react';
import { useTestStore } from '@/store/useTestStore';
import { TestData } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestScreenProps {
  testData: TestData;
}

export default function TestScreen({ testData }: TestScreenProps) {
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    startCalculating,
    completeTest,
  } = useTestStore();

  const [isProgressing, setIsProgressing] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = testData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.questions.length) * 100;

  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  );

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
      }
    };
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    if (isProgressing) return;

    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
    }

    setAnswer(currentQuestion.id, optionIndex);
    setIsProgressing(true);
    
    progressTimerRef.current = setTimeout(() => {
      if (currentQuestionIndex === testData.questions.length - 1) {
        const totalAnswers = answers.filter(a => a.questionId !== currentQuestion.id).length + 1;
        if (totalAnswers === testData.questions.length) {
          startCalculating();
          setTimeout(() => {
            completeTest();
          }, 1500);
        }
      } else {
        nextQuestion();
      }
      setIsProgressing(false);
      progressTimerRef.current = null;
    }, 300);
  };

  const handleNext = () => {
    if (currentAnswer === undefined) {
      alert('답변을 선택해주세요.');
      return;
    }

    if (currentQuestionIndex === testData.questions.length - 1) {
      if (answers.length === testData.questions.length) {
        startCalculating();
        setTimeout(() => {
          completeTest();
        }, 1500);
      } else {
        alert('모든 질문에 답변해주세요.');
      }
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-violet-600">
              질문 {currentQuestionIndex + 1} / {testData.questions.length}
            </span>
            <span className="text-sm font-medium text-violet-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-violet-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isProgressing}
                className={`w-full text-left p-5 rounded-xl border-2 transition disabled:cursor-wait ${
                  currentAnswer?.selectedOptionIndex === index
                    ? 'border-violet-500 bg-violet-50 shadow-md'
                    : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/30'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      currentAnswer?.selectedOptionIndex === index
                        ? 'border-violet-500 bg-violet-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {currentAnswer?.selectedOptionIndex === index && (
                      <div className="w-3 h-3 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0 || isProgressing}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-violet-200 text-violet-700 font-medium hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>
            <button
              onClick={handleNext}
              disabled={currentAnswer === undefined || isProgressing}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-700 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              {currentQuestionIndex === testData.questions.length - 1
                ? '결과 보기'
                : '다음'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

