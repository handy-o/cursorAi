'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-violet-200"></div>
            <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-violet-600 animate-spin"></div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            당신의 결과를 분석하고 있습니다{dots}
          </h2>
          <p className="text-gray-600">
            잠시만 기다려주세요
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

