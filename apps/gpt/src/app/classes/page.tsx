'use client';

import MainLayout from '@/components/layout/main-layout';
import { useState } from 'react';
import { Clock, Users, Star, Filter } from 'lucide-react';

const classCategories = [
  { id: 'all', name: '전체' },
  { id: 'pt', name: '개인 PT' },
  { id: 'gx', name: '그룹 클래스' },
  { id: 'yoga', name: '요가/필라테스' },
  { id: 'cardio', name: '카디오' },
];

const classes = [
  {
    id: 1,
    name: '개인 PT 트레이닝',
    category: 'pt',
    instructor: 'Jake',
    duration: '60분',
    difficulty: '초급-고급',
    maxParticipants: 1,
    price: '80,000원',
    description: '1:1 맞춤형 개인 트레이닝으로 목표에 맞는 운동 프로그램을 제공합니다.',
    schedule: [
      { day: '월-금', time: '06:00-22:00' },
      { day: '토-일', time: '08:00-20:00' }
    ],
    features: ['개인 맞춤 프로그램', '영양 상담 포함', '진도 체크'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 2,
    name: '바디컴뱃',
    category: 'gx',
    instructor: 'Bern',
    duration: '45분',
    difficulty: '중급',
    maxParticipants: 20,
    price: '15,000원',
    description: '격투기 동작을 활용한 고강도 그룹 클래스로 전신 근력을 향상시킵니다.',
    schedule: [
      { day: '월, 수, 금', time: '19:00-19:45' },
      { day: '토', time: '10:00-10:45' }
    ],
    features: ['전신 운동', '스트레스 해소', '칼로리 소모'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 3,
    name: '요가 클래스',
    category: 'yoga',
    instructor: 'Heize',
    duration: '60분',
    difficulty: '초급-중급',
    maxParticipants: 15,
    price: '12,000원',
    description: '마음과 몸의 균형을 맞추는 요가 클래스로 유연성과 집중력을 향상시킵니다.',
    schedule: [
      { day: '화, 목', time: '18:00-19:00' },
      { day: '일', time: '09:00-10:00' }
    ],
    features: ['유연성 향상', '스트레스 해소', '자세 교정'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 4,
    name: '스피닝',
    category: 'cardio',
    instructor: 'Rosalie',
    duration: '45분',
    difficulty: '중급-고급',
    maxParticipants: 12,
    price: '18,000원',
    description: '음악에 맞춰 실내 자전거를 타며 심폐지구력을 향상시키는 카디오 클래스입니다.',
    schedule: [
      { day: '월, 수, 금', time: '20:00-20:45' },
      { day: '토', time: '11:00-11:45' }
    ],
    features: ['심폐지구력 향상', '칼로리 소모', '다리 근력 강화'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
  {
    id: 5,
    name: '필라테스',
    category: 'yoga',
    instructor: 'Heize',
    duration: '50분',
    difficulty: '초급-중급',
    maxParticipants: 10,
    price: '20,000원',
    description: '코어 근력을 강화하고 자세를 교정하는 필라테스 클래스입니다.',
    schedule: [
      { day: '화, 목', time: '19:00-19:50' },
      { day: '일', time: '10:00-10:50' }
    ],
    features: ['코어 강화', '자세 교정', '균형감 향상'],
    rating: 4.8,
    image: 'https://centerofpilates.com/wp-content/uploads/2022/09/12.png'
  },
  {
    id: 6,
    name: '크로스핏',
    category: 'gx',
    instructor: 'Jake',
    duration: '60분',
    difficulty: '고급',
    maxParticipants: 8,
    price: '25,000원',
    description: '다양한 기능적 움직임을 조합한 고강도 그룹 트레이닝입니다.',
    schedule: [
      { day: '월, 수, 금', time: '18:00-19:00' },
      { day: '토', time: '09:00-10:00' }
    ],
    features: ['전신 근력', '지구력 향상', '기능적 움직임'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&h=400&fit=crop&crop=center&auto=format&q=80'
  },
];

export default function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredClasses = selectedCategory === 'all' 
    ? classes 
    : classes.filter(cls => cls.category === selectedCategory);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
              수업 안내
            </h1>
            <p className="text-xl text-gray-300 font-roboto max-w-3xl mx-auto">
              다양한 프로그램과 시간대의 수업을 통해 
              당신에게 맞는 운동을 찾아보세요.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-semibold text-gray-800 font-montserrat">
                카테고리 필터
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {classCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-yellow-400 text-gray-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Classes Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img
                      src={cls.image}
                      alt={cls.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {cls.price}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {cls.difficulty}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 font-montserrat">
                        {cls.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-600 text-sm font-semibold">{cls.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-roboto mb-4 text-sm leading-relaxed">
                      {cls.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{cls.duration}</span>
                        <span className="text-gray-400">•</span>
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {cls.maxParticipants === 1 ? '1:1' : `최대 ${cls.maxParticipants}명`}
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        강사: <span className="font-semibold">{cls.instructor}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 font-montserrat">
                        수업 시간
                      </h4>
                      <div className="space-y-1">
                        {cls.schedule.map((schedule, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            {schedule.day}: {schedule.time}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 font-montserrat">
                        특징
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {cls.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-lg transition-colors">
                      예약하기
                    </button>
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
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-gray-300 font-roboto mb-8">
              관심 있는 수업을 선택하고 
              전문 트레이너와 함께 운동을 시작해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cursorAi/gpt/reservation/"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-4 text-lg rounded-full transition-colors"
              >
                수업 예약하기
              </a>
              <a
                href="/cursorAi/gpt/trainers/"
                className="border border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full transition-colors"
              >
                강사진 보기
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
