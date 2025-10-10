'use client';

import { useTestStore } from '@/store/useTestStore';
import { TestData } from '@/types';
import { calculateResult } from '@/lib/calculateResult';
import { RotateCcw, Share2 } from 'lucide-react';

interface ResultScreenProps {
  testData: TestData;
}

export default function ResultScreen({ testData }: ResultScreenProps) {
  const { answers, userInfo, resetTest } = useTestStore();
  const result = calculateResult(answers, testData);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: testData.title,
          text: `나의 연애 가치관 유형은 "${result.name}" 입니다!`,
          url: window.location.href,
        });
      } catch {
        console.log('공유 취소됨');
      }
    } else {
      alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
    }
  };

  const handleRetry = () => {
    resetTest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-violet-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full mb-6">
              <span className="text-4xl text-white font-bold">
                {result.id}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              {result.name}
            </h2>
            <div className="inline-block px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
              {userInfo.gender === 'male' ? '남성' : '여성'} · {userInfo.age}세
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              당신의 연애 가치관
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {result.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-violet-100">
              <h4 className="font-bold text-gray-800 mb-2">답변 완료</h4>
              <p className="text-3xl font-bold text-violet-600">
                {answers.length}개
              </p>
              <p className="text-sm text-gray-500 mt-1">
                총 {testData.questions.length}개 질문
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-violet-100">
              <h4 className="font-bold text-gray-800 mb-2">나의 유형</h4>
              <p className="text-3xl font-bold text-fuchsia-600">
                {result.id}형
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {result.name}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-700 hover:to-fuchsia-700 transition shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              결과 공유하기
            </button>
            <button
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold hover:bg-violet-50 transition"
            >
              <RotateCcw className="w-5 h-5" />
              다시 테스트하기
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-violet-100">
            <h4 className="font-bold text-gray-800 mb-4">모든 유형 보기</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {testData.result_types.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    type.id === result.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl font-bold text-violet-600 mb-1">
                    {type.id}
                  </div>
                  <div className="text-xs text-gray-600">{type.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

