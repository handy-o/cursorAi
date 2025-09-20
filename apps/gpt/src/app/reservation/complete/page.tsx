'use client';

import MainLayout from '@/components/layout/main-layout';
import { useEffect, useState, Suspense } from 'react';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, ArrowLeft, Home, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface ReservationData {
  id: number;
  name: string;
  phone: string;
  email: string;
  program: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
}

const programNames: { [key: string]: string } = {
  'pt': '개인 PT 트레이닝',
  'bodycombat': '바디컴뱃',
  'yoga': '요가 클래스',
  'spinning': '스피닝',
  'pilates': '필라테스',
  'crossfit': '크로스핏',
  'consultation': '무료 상담',
};

function ReservationContent() {
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchData, setSearchData] = useState({ name: '', phone: '' });
  const [searchResult, setSearchResult] = useState<ReservationData | null>(null);
  const [searchError, setSearchError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a reservation ID in URL
    const reservationId = searchParams.get('id');
    
    if (reservationId) {
      // Get specific reservation by ID
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      const foundReservation = reservations.find((r: ReservationData) => r.id === parseInt(reservationId));
      if (foundReservation) {
        setReservation(foundReservation);
      }
    } else {
      // No ID in URL, show search mode
      setSearchMode(true);
    }
  }, [searchParams]);

  const handleSearch = () => {
    setSearchError('');
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    const foundReservation = reservations.find((r: ReservationData) => 
      r.name === searchData.name && r.phone === searchData.phone
    );
    
    if (foundReservation) {
      setSearchResult(foundReservation);
      setReservation(foundReservation);
    } else {
      setSearchError('예약 정보를 찾을 수 없습니다. 이름과 연락처를 다시 확인해주세요.');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '미정';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6">
                예약이 완료되었습니다!
              </h1>
              <p className="text-xl text-gray-300 font-roboto max-w-3xl mx-auto">
                예약이 성공적으로 접수되었습니다. 
                곧 연락드려 상세한 안내를 드리겠습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Search Form or Reservation Details */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              {searchMode && !reservation ? (
                // Search Form
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-montserrat mb-4">
                      예약 정보 조회
                    </h2>
                    <p className="text-gray-600 font-roboto">
                      예약 시 입력한 이름과 연락처로 예약 정보를 조회할 수 있습니다.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        이름
                      </label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        value={searchData.name}
                        onChange={(e) => setSearchData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        연락처
                      </label>
                      <input
                        type="tel"
                        placeholder="010-1234-5678"
                        value={searchData.phone}
                        onChange={(e) => setSearchData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>

                    {searchError && (
                      <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg">
                        {searchError}
                      </div>
                    )}

                    <button
                      onClick={handleSearch}
                      disabled={!searchData.name || !searchData.phone}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Search className="w-5 h-5" />
                      <span>예약 정보 조회</span>
                    </button>

                    <div className="text-center">
                      <Link href="/reservation/" className="text-yellow-600 hover:text-yellow-700 font-medium">
                        새로 예약하기
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // Reservation Details
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-montserrat mb-4">
                      예약 정보
                    </h2>
                    <p className="text-gray-600 font-roboto">
                      {searchMode ? '조회된 예약 정보입니다.' : '아래 정보로 예약이 접수되었습니다.'}
                    </p>
                  </div>

              {reservation ? (
                <div className="space-y-6">
                  {/* Reservation ID */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">예약 번호</p>
                      <p className="text-2xl font-bold text-gray-800 font-montserrat">
                        #{reservation.id}
                      </p>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <User className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600">이름</p>
                        <p className="font-semibold text-gray-800">{reservation.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600">연락처</p>
                        <p className="font-semibold text-gray-800">{reservation.phone}</p>
                      </div>
                    </div>
                  </div>

                  {reservation.email && (
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600">이메일</p>
                        <p className="font-semibold text-gray-800">{reservation.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Program Information */}
                  <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">선택한 프로그램</p>
                      <p className="font-semibold text-gray-800">
                        {programNames[reservation.program] || reservation.program}
                      </p>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600">희망 날짜</p>
                        <p className="font-semibold text-gray-800">
                          {reservation.date ? formatDate(reservation.date) : '미정'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-sm text-gray-600">희망 시간</p>
                        <p className="font-semibold text-gray-800">
                          {reservation.time || '미정'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {reservation.message && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">상담 내용</p>
                      <p className="text-gray-800 whitespace-pre-wrap">{reservation.message}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">예약 정보를 불러올 수 없습니다.</p>
                </div>
              )}

              {/* Next Steps */}
              <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 font-montserrat">
                  다음 단계
                </h3>
                <div className="space-y-3 text-blue-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-sm font-semibold mt-0.5">
                      1
                    </div>
                    <p>24시간 이내에 연락드려 상담 일정을 조율하겠습니다.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-sm font-semibold mt-0.5">
                      2
                    </div>
                    <p>상담 시 운동 목표와 체력 수준을 확인하겠습니다.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-sm font-semibold mt-0.5">
                      3
                    </div>
                    <p>맞춤형 프로그램을 추천하고 첫 수업을 예약하겠습니다.</p>
                  </div>
                </div>
              </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <button className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-8 py-4 rounded-lg transition-colors">
                        <Home className="w-5 h-5" />
                        <span>홈으로 돌아가기</span>
                      </button>
                    </Link>
                    <Link href="/classes">
                      <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-lg transition-colors">
                        <Calendar className="w-5 h-5" />
                        <span>수업 일정 보기</span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-6">
              문의사항이 있으시면 언제든 연락주세요
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center text-gray-300">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="text-lg">02-1234-5678</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="text-lg">info@luxegym.com</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default function ReservationCompletePage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </MainLayout>
    }>
      <ReservationContent />
    </Suspense>
  );
}
