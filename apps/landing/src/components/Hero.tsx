'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Users, Award, BookOpen, TrendingUp } from 'lucide-react';

export default function Hero() {
  const stats = [
    { icon: Users, value: '2,500+', label: '수강생' },
    { icon: Award, value: '98%', label: '만족도' },
    { icon: BookOpen, value: '15년', label: '경력' },
    { icon: TrendingUp, value: '95%', label: '성적향상' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                수학이
                <span className="text-blue-600 block">쉬워지는</span>
                <span className="text-indigo-600">마법</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                개별 맞춤형 수학 교육으로<br />
                모든 학생의 잠재력을 끌어올립니다
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                <Calculator className="w-5 h-5 mr-2" />
                무료 상담 신청
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                프로그램 보기
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">수학 문제 해결 과정</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                      <div className="h-2 bg-blue-300 rounded w-1/2"></div>
                      <div className="h-2 bg-blue-400 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">A+</div>
                      <div className="text-sm text-gray-600">성적 향상</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">이해도</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
              개별 맞춤
            </div>
            <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              실력 향상
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


