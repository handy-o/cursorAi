'use client';

import { useState } from 'react';
import { useTestStore } from '@/store/useTestStore';
import { TestData } from '@/types';

interface MainScreenProps {
  testData: TestData;
}

export default function MainScreen({ testData }: MainScreenProps) {
  const { setUserInfo, startTest } = useTestStore();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');

  const handleStart = () => {
    if (!age || !gender) {
      alert('나이와 성별을 모두 입력해주세요.');
      return;
    }
    setUserInfo({ age, gender });
    startTest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-violet-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              {testData.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {testData.description}
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                나이
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="나이를 입력하세요"
                className="w-full px-4 py-3 rounded-xl border border-violet-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                성별
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender('male')}
                  className={`py-3 px-6 rounded-xl border-2 transition ${
                    gender === 'male'
                      ? 'border-violet-500 bg-violet-50 text-violet-700 font-medium'
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  남성
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`py-3 px-6 rounded-xl border-2 transition ${
                    gender === 'female'
                      ? 'border-violet-500 bg-violet-50 text-violet-700 font-medium'
                      : 'border-gray-200 hover:border-violet-300'
                  }`}
                >
                  여성
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold py-4 rounded-xl hover:from-violet-700 hover:to-fuchsia-700 transition shadow-lg hover:shadow-xl"
          >
            테스트 시작하기
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            총 {testData.questions.length}개의 질문 | 약 5분 소요
          </div>
        </div>
      </div>
    </div>
  );
}

