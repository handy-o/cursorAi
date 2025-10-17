import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { Star, MapPin, Heart, Clock, Users, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// 정적 내보내기를 위한 매개변수 생성 함수
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const eventId = id

  const eventDetails = {
    '1': {
      title: '봄맞이 특강: 신선한 꽃꽂이',
      instructor: '김플라워',
      location: '강남구 테헤란로 123',
      date: '2024.04.15',
      time: '14:00 - 16:00',
      duration: '2시간',
      maxParticipants: 12,
      currentParticipants: 8,
      rating: 4.9,
      reviewCount: 156,
      originalPrice: 50000,
      discountedPrice: 35000,
      discountRate: 30,
      image: 'https://picsum.photos/800/400?random=5',
      description: '봄의 신선함을 담은 꽃꽂이 클래스입니다. 계절의 아름다움을 느끼며 창의적인 꽃꽂이 기법을 배워보세요.',
      materials: ['신선한 봄꽃', '꽃병', '꽃가위', '리본'],
      highlights: [
        '프로 꽃꽂이사가 직접 지도',
        '신선한 계절 꽃 사용',
        '완성된 작품 가져가기',
        '소규모 클래스로 개별 맞춤 지도'
      ]
    },
    '2': {
      title: '집중력 향상 미술 치료',
      instructor: '박아트',
      location: '서초구 서초대로 456',
      date: '2024.04.20',
      time: '10:00 - 12:30',
      duration: '2시간 30분',
      maxParticipants: 10,
      currentParticipants: 6,
      rating: 4.8,
      reviewCount: 89,
      originalPrice: 60000,
      discountedPrice: 45000,
      discountRate: 25,
      image: 'https://picsum.photos/800/400?random=6',
      description: '미술을 통한 집중력 향상과 스트레스 해소 프로그램입니다. 전문 아트테라피스트와 함께하는 힐링 타임을 경험해보세요.',
      materials: ['아크릴 물감', '붓 세트', '캔버스', '팔레트'],
      highlights: [
        '전문 아트테라피스트 지도',
        '스트레스 해소 효과',
        '집중력 향상 프로그램',
        '개인별 맞춤 상담'
      ]
    },
    '3': {
      title: '나만의 도자기 만들기',
      instructor: '이도예',
      location: '마포구 홍대입구역 789',
      date: '2024.04.25',
      time: '15:00 - 18:00',
      duration: '3시간',
      maxParticipants: 8,
      currentParticipants: 5,
      rating: 4.7,
      reviewCount: 134,
      originalPrice: 70000,
      discountedPrice: 55000,
      discountRate: 21,
      image: 'https://picsum.photos/800/400?random=7',
      description: '직접 만든 도자기로 특별한 추억을 만들어보세요. 도예 기초부터 완성까지 전 과정을 체험할 수 있습니다.',
      materials: ['점토', '물레', '도예 도구', '유약'],
      highlights: [
        '전문 도예가 직접 지도',
        '물레 체험',
        '완성된 작품 가져가기',
        '소규모 클래스로 충분한 지도'
      ]
    }
  }

  const event = eventDetails[eventId as keyof typeof eventDetails]

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-500 mb-4">이벤트를 찾을 수 없습니다</h1>
            <Link href="/" className="text-primary-500 hover:text-primary-600">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 */}
        <Link href="/" className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          홈으로 돌아가기
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            {/* 이미지 */}
            <div className="mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>

            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-500 mb-2">{event.title}</h1>
                  <div className="flex items-center text-sm text-neutral-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-neutral-400 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date} {event.time}
                  </div>
                  <div className="flex items-center text-sm text-neutral-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.duration}
                  </div>
                </div>
                <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  {event.discountRate}% 할인
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium mr-1">{event.rating}</span>
                  <span className="text-xs text-neutral-400">({event.reviewCount}개 리뷰)</span>
                </div>
                <div className="flex items-center text-sm text-neutral-400">
                  <Users className="h-4 w-4 mr-1" />
                  {event.currentParticipants}/{event.maxParticipants}명 참여
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed">{event.description}</p>
            </div>

            {/* 강사 정보 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-neutral-500 mb-4">강사 정보</h3>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">
                    {event.instructor.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-500">{event.instructor}</h4>
                  <p className="text-sm text-neutral-400">전문 강사</p>
                </div>
              </div>
            </div>

            {/* 준비물 및 특징 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-neutral-500 mb-4">준비물</h3>
                <ul className="space-y-2">
                  {event.materials.map((material, index) => (
                    <li key={index} className="flex items-center text-sm text-neutral-600">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-neutral-500 mb-4">클래스 특징</h3>
                <ul className="space-y-2">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center text-sm text-neutral-600">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 예약 섹션 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-neutral-500 mb-4">예약하기</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">정가</span>
                  <span className="text-sm text-neutral-400 line-through">{event.originalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-400">할인가</span>
                  <span className="text-lg font-semibold text-primary-500">{event.discountedPrice.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">할인율</span>
                  <span className="text-sm font-semibold text-red-500">{event.discountRate}% 할인</span>
                </div>
              </div>

              <button className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors mb-4">
                지금 예약하기
              </button>

              <div className="text-center">
                <p className="text-xs text-neutral-400">
                  {event.maxParticipants - event.currentParticipants}자리 남음
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
