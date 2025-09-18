'use client';

import MainLayout from '@/components/layout/main-layout';
import Image from 'next/image';
import { Award, Clock, Users, Star } from 'lucide-react';

const trainers = [
  {
    id: 1,
    name: 'Jake',
    title: '헤드 트레이너',
    experience: '15년',
    specialties: ['웨이트 트레이닝', '체중 감량', '근력 향상'],
    certifications: ['NSCA-CPT', 'ACSM-CPT', 'NASM-CES'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: '15년간의 경험으로 1000명 이상의 회원들의 목표 달성을 도왔습니다.',
    rating: 4.9,
    clients: 1200,
  },
  {
    id: 2,
    name: 'Bern',
    title: '피트니스 코치',
    experience: '12년',
    specialties: ['요가', '필라테스', '재활 운동'],
    certifications: ['RYT-500', 'PMA-CPT', 'FMS'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: '부상 회복과 재활에 특화된 맞춤형 프로그램을 제공합니다.',
    rating: 4.8,
    clients: 800,
  },
  {
    id: 3,
    name: 'Heize',
    title: 'GX 강사',
    experience: '8년',
    specialties: ['그룹 클래스', '댄스', '에어로빅'],
    certifications: ['AFAA-GFI', 'ZUMBA', 'LES MILLS'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: '에너지 넘치는 그룹 클래스로 즐거운 운동을 선사합니다.',
    rating: 4.9,
    clients: 1500,
  },
  {
    id: 4,
    name: 'Rosalie',
    title: '영양사 겸 트레이너',
    experience: '10년',
    specialties: ['체중 관리', '영양 상담', '다이어트'],
    certifications: ['RD', 'NSCA-CPT', 'Precision Nutrition'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    description: '운동과 영양을 결합한 종합적인 건강 관리 솔루션을 제공합니다.',
    rating: 4.9,
    clients: 600,
  },
];

export default function TrainersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
              전문 강사진 소개
            </h1>
            <p className="text-xl text-gray-300 font-roboto max-w-3xl mx-auto">
              국제 자격증을 보유한 경험 풍부한 트레이너들이 
              당신의 목표 달성을 위해 최선을 다합니다.
            </p>
          </div>
        </section>

        {/* Trainers Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-80">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {trainer.title}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 font-montserrat">
                        {trainer.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-gray-600 font-semibold">{trainer.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{trainer.experience} 경력</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{trainer.clients.toLocaleString()}명 상담</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-roboto mb-6 leading-relaxed">
                      {trainer.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3 font-montserrat">
                        전문 분야
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-3 font-montserrat">
                        자격증
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
              전문 트레이너와 함께 시작하세요
            </h2>
            <p className="text-xl text-gray-300 font-roboto mb-8">
              당신에게 맞는 트레이너를 선택하고 
              개인 맞춤형 프로그램을 경험해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/reservation"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-4 text-lg rounded-full transition-colors"
              >
                상담 예약하기
              </a>
              <a
                href="/classes"
                className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full transition-colors"
              >
                수업 일정 보기
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
