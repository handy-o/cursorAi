'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-gray-300 font-roboto max-w-3xl mx-auto mb-8">
            전문 트레이너와 함께하는 완벽한 운동 경험을 시작하세요. 
            무료 상담과 체험 수업을 통해 LUXE GYM의 차별점을 직접 경험해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CTA Buttons */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Link href="/cursorAi/gpt/reservation/" className="block">
                <Button 
                  size="lg" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-4 text-lg rounded-full"
                >
                  무료 상담 예약하기
                </Button>
              </Link>
              <Link href="/classes" className="block">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg rounded-full bg-transparent"
                >
                  체험 수업 신청하기
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 font-roboto mb-2">
                또는 전화로 문의하세요
              </p>
              <a 
                href="tel:02-1234-5678" 
                className="text-yellow-400 text-xl font-bold hover:text-yellow-300 transition-colors"
              >
                02-1234-5678
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-gray-300 font-roboto">전화 문의</p>
                  <p className="text-white font-semibold">02-1234-5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-gray-300 font-roboto">이메일 문의</p>
                  <p className="text-white font-semibold">info@luxegym.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-gray-300 font-roboto">위치</p>
                  <p className="text-white font-semibold">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3 font-montserrat">운영 시간</h4>
              <div className="space-y-2 text-gray-300 font-roboto">
                <p>평일: 06:00 - 24:00</p>
                <p>주말: 08:00 - 22:00</p>
                <p className="text-yellow-400">연중무휴 운영</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
