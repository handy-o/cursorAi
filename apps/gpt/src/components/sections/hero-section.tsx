'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80"
          alt="Dynamic fitness training with athletes working out"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-6 leading-tight">
          최신식 럭셔리 헬스장
          <br />
          <span className="text-yellow-400">당신의 몸을 완성하다</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 font-roboto max-w-2xl mx-auto">
          전문 PT와 함께하는 1:1 맞춤 트레이닝, 최신 장비, 
          그리고 당신만을 위한 완벽한 운동 환경을 경험해보세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservation/">
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-4 text-lg rounded-full"
            >
              지금 예약하기
            </Button>
          </Link>
          <Link href="/trainers/">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full bg-transparent"
            >
              강사진 보기
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
