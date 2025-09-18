'use client';

import MainLayout from '@/components/layout/main-layout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

const programs = [
  { id: 'pt', name: '개인 PT 트레이닝', price: '80,000원' },
  { id: 'bodycombat', name: '바디컴뱃', price: '15,000원' },
  { id: 'yoga', name: '요가 클래스', price: '12,000원' },
  { id: 'spinning', name: '스피닝', price: '18,000원' },
  { id: 'pilates', name: '필라테스', price: '20,000원' },
  { id: 'crossfit', name: '크로스핏', price: '25,000원' },
  { id: 'consultation', name: '무료 상담', price: '무료' },
];

export default function ReservationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    program: '',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage
    const reservation = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    existingReservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(existingReservations));

    setIsSubmitting(false);
    // Pass reservation ID as URL parameter
    router.push(`/reservation/complete?id=${reservation.id}`);
  };

  const isFormValid = formData.name && formData.phone && formData.program;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
              방문 예약
            </h1>
            <p className="text-xl text-gray-300 font-roboto max-w-3xl mx-auto">
              전문 트레이너와의 상담을 통해 
              당신에게 맞는 맞춤형 프로그램을 추천받으세요.
            </p>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 font-montserrat mb-4">
                  예약 정보를 입력해주세요
                </h2>
                <p className="text-gray-600 font-roboto">
                  모든 정보는 안전하게 보호되며, 상담 목적으로만 사용됩니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                      <User className="w-4 h-4 inline mr-2" />
                      이름 *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                      <Phone className="w-4 h-4 inline mr-2" />
                      연락처 *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                    <Mail className="w-4 h-4 inline mr-2" />
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>

                {/* Program Selection */}
                <div>
                  <Label className="text-gray-700 font-semibold mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    원하는 프로그램 *
                  </Label>
                  <Select value={formData.program} onValueChange={(value) => handleInputChange('program', value)}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                      <SelectValue placeholder="프로그램을 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          <div className="flex justify-between items-center w-full">
                            <span>{program.name}</span>
                            <span className="text-yellow-600 font-semibold ml-4">{program.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date" className="text-gray-700 font-semibold mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      희망 날짜
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold mb-2 block">
                      <Clock className="w-4 h-4 inline mr-2" />
                      희망 시간
                    </Label>
                    <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                      <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        <SelectValue placeholder="시간을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-semibold mb-2 block">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    상담 내용 (선택사항)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="운동 목표, 특별한 요청사항 등을 자유롭게 작성해주세요."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-4 text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '예약 처리 중...' : '예약 신청하기'}
                  </Button>
                </div>
              </form>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 font-montserrat">
                    문의사항이 있으시면 언제든 연락주세요
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center text-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>02-1234-5678</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>info@luxegym.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
