'use client';

import { Dumbbell, Users, Clock, Award, Shield, Zap } from 'lucide-react';

const uspItems = [
  {
    icon: Users,
    title: '1:1 맞춤 PT',
    description: '개인별 목표와 체력에 맞춘 전문 트레이닝',
  },
  {
    icon: Dumbbell,
    title: '최신 장비',
    description: '세계 최고급 운동기구로 안전하고 효과적인 운동',
  },
  {
    icon: Award,
    title: '전문 강사진',
    description: '국제 자격증을 보유한 경험 풍부한 트레이너',
  },
  {
    icon: Clock,
    title: '24시간 운영',
    description: '언제든지 편리한 시간에 운동하실 수 있습니다',
  },
  {
    icon: Shield,
    title: '안전 관리',
    description: '최고 수준의 안전 시스템과 응급처치 대응',
  },
  {
    icon: Zap,
    title: '빠른 결과',
    description: '과학적 접근으로 단기간에 목표 달성',
  },
];

export default function USPSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 font-montserrat mb-4">
            왜 LUXE GYM을 선택해야 할까요?
          </h2>
          <p className="text-lg text-gray-600 font-roboto max-w-3xl mx-auto">
            단순한 운동공간을 넘어서, 당신의 목표 달성을 위한 
            완벽한 파트너가 되어드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uspItems.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-yellow-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 font-montserrat mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-roboto leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
