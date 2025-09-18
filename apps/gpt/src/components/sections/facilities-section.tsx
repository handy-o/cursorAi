'use client';

import Image from 'next/image';
import { MapPin, Clock, Car, Wifi } from 'lucide-react';

const facilities = [
  {
    title: '프리미엄 운동 공간',
    description: '넓고 쾌적한 운동 환경에서 집중할 수 있는 최적의 공간을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center&auto=format&q=80',
    features: ['최신 운동기구', '넓은 운동 공간', '청결한 환경'],
  },
  {
    title: '개인 트레이닝 룸',
    description: '1:1 맞춤 트레이닝을 위한 전용 공간으로 집중도 높은 운동이 가능합니다.',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop&crop=center&auto=format&q=80',
    features: ['전용 운동기구', '개인 맞춤 프로그램', '전문 트레이너'],
  },
  {
    title: '그룹 클래스룸',
    description: 'GX 프로그램을 위한 넓은 그룹 클래스룸에서 함께 운동하는 즐거움을 느껴보세요.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center&auto=format&q=80',
    features: ['대형 거울', '음향 시설', '다양한 프로그램'],
  },
  {
    title: '라운지 & 편의시설',
    description: '운동 전후 휴식을 위한 편안한 라운지와 다양한 편의시설을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop&crop=center&auto=format&q=80',
    features: ['휴식 공간', '음료 서비스', '락커룸'],
  },
];

const gymInfo = [
  { icon: MapPin, text: '서울시 강남구 테헤란로 123' },
  { icon: Clock, text: '24시간 운영 (연중무휴)' },
  { icon: Car, text: '지하 주차장 완비 (2시간 무료)' },
  { icon: Wifi, text: '무료 WiFi 제공' },
];

export default function FacilitiesSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 font-montserrat mb-4">
            프리미엄 시설 소개
          </h2>
          <p className="text-lg text-gray-600 font-roboto max-w-3xl mx-auto">
            최고의 운동 환경과 편의시설을 제공하여 
            당신의 운동 목표 달성을 지원합니다.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 font-montserrat mb-4">
                  {facility.title}
                </h3>
                <p className="text-gray-600 font-roboto mb-6 leading-relaxed">
                  {facility.description}
                </p>
                <ul className="space-y-2">
                  {facility.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 font-roboto"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Gym Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 font-montserrat mb-6 text-center">
            헬스장 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gymInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-yellow-50 transition-colors duration-300"
              >
                <info.icon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-700 font-roboto">{info.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
