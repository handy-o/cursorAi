import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import HobbyDetailClient from './HobbyDetailClient'
import ImageGallery from './ImageGallery'
import RelatedHobbies from './RelatedHobbies'
import { Star, MapPin, Heart, Calendar, Clock, Users, Share2, ArrowLeft, Phone, Mail } from 'lucide-react'
import { hobbyData } from '@/lib/hobbyData'

// 정적 내보내기를 위한 매개변수 생성 함수 - 제거 (동적 라우팅 사용)
// export async function generateStaticParams() {
//   // additionalDetails에 정의된 ID만 정적 생성
//   const availableIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//   return availableIds.map((id) => ({
//     id: id.toString(),
//   }))
// }


interface HobbyDetail {
  id: number
  title: string
  category: string
  location: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  images: string[]
  description: string
  instructor: string
  instructorInfo: string
  schedule: string[]
  maxParticipants: number
  duration: string
  difficulty: string
  materials: string[]
  isWished: boolean
  contact: {
    phone: string
    email: string
  }
}

export default async function HobbyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const hobbyId = parseInt(id)

  // 공통 취미 데이터에서 기본 정보 가져오기
  const baseHobby = hobbyData.find(hobby => hobby.id === hobbyId)
  
  if (!baseHobby) {
    notFound()
  }

  // 추가 세부 정보 (공통 데이터에 없는 정보들)
  const additionalDetails: Record<number, Partial<HobbyDetail>> = {
    1: {
      originalPrice: '70,000원',
      reviewCount: 127,
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=12',
        'https://picsum.photos/800/600?random=13',
      ],
      description: `수채화의 기본부터 고급 기법까지 단계별로 학습할 수 있는 클래스입니다. 
      
물감의 특성을 이해하고, 다양한 브러시 기법을 익히며, 나만의 작품을 완성해보세요. 
초보자도 쉽게 따라할 수 있도록 친절하게 지도해드립니다.

📝 클래스 내용:
• 수채화 재료 이해하기
• 기본 브러시 기법 연습
• 색채 이론과 혼색법
• 구도와 명암 표현
• 실제 작품 제작

🎨 준비물은 모두 제공되며, 완성된 작품은 가져가실 수 있습니다.`,
      instructor: '김예술',
      instructorInfo: '홍익대학교 미술대학 졸업, 10년 경력의 전문 강사',
      schedule: [
        '2024.04.15 (월) 14:00 - 16:00',
        '2024.04.22 (월) 14:00 - 16:00',
        '2024.04.29 (월) 14:00 - 16:00',
        '2024.05.06 (월) 14:00 - 16:00',
      ],
      maxParticipants: 12,
      duration: '2시간',
      difficulty: '초급',
      materials: ['수채화 물감', '브러시 세트', '수채화지', '팔레트', '물통'],
      isWished: false,
      contact: {
        phone: '010-1234-5678',
        email: 'art@example.com',
      },
    },
    2: {
      reviewCount: 203,
      images: [
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=21',
        'https://picsum.photos/800/600?random=22',
      ],
      description: `집에서 쉽게 따라할 수 있는 베이킹 기초부터 고급 레시피까지 배워보세요.
      
달콤한 케이크와 쿠키를 직접 만들어보며 베이킹의 즐거움을 느껴보세요.
모든 재료와 도구가 준비되어 있어 편안하게 수업에 참여하실 수 있습니다.

🍰 클래스 내용:
• 베이킹 기초 이론
• 반죽 만들기 기법
• 오븐 사용법
• 데코레이션 기법
• 완성된 디저트 포장하기

👨‍🍳 수업 후 완성된 디저트는 모두 가져가실 수 있습니다.`,
      instructor: '박베이킹',
      instructorInfo: '파리 블루 셰프 졸업, 카페 사장 경력 8년',
      schedule: [
        '2024.04.16 (화) 10:00 - 12:00',
        '2024.04.23 (화) 10:00 - 12:00',
        '2024.04.30 (화) 10:00 - 12:00',
      ],
      maxParticipants: 10,
      duration: '2시간',
      difficulty: '초급',
      materials: ['밀가루', '설탕', '버터', '계란', '오븐'],
      isWished: false,
      contact: {
        phone: '010-2345-6789',
        email: 'baking@example.com',
      },
    },
    3: {
      reviewCount: 134,
      images: [
        'https://picsum.photos/800/600?random=3',
        'https://picsum.photos/800/600?random=31',
        'https://picsum.photos/800/600?random=32',
      ],
      description: `바쁜 일상에서 벗어나 몸과 마음을 치유하는 요가 클래스입니다.
      
전문 요가 강사와 함께 기본 동작부터 고급 포즈까지 차근차근 배워보세요.
명상과 함께하는 힐링 타임으로 스트레스를 해소하고 평온함을 찾아보세요.

🧘‍♀️ 클래스 내용:
• 기본 요가 동작
• 호흡법 연습
• 명상 기법
• 스트레칭
• 릴랙세이션

🧘‍♂️ 요가 매트는 제공되며, 편한 복장으로 참여해주세요.`,
      instructor: '이요가',
      instructorInfo: '요가 명상 지도사 자격증, 5년 경력',
      schedule: [
        '2024.04.17 (수) 19:00 - 20:30',
        '2024.04.24 (수) 19:00 - 20:30',
        '2024.05.01 (수) 19:00 - 20:30',
      ],
      maxParticipants: 15,
      duration: '1시간 30분',
      difficulty: '초급',
      materials: ['요가 매트', '요가 블록', '스트랩'],
      isWished: false,
      contact: {
        phone: '010-3456-7890',
        email: 'yoga@example.com',
      },
    },
    4: {
      reviewCount: 89,
      images: [
        'https://picsum.photos/800/600?random=4',
        'https://picsum.photos/800/600?random=41',
        'https://picsum.photos/800/600?random=42',
      ],
      description: `아름다운 꽃으로 나만의 꽃다발과 화분을 만드는 플라워 아레인지먼트 클래스입니다.
      
계절에 맞는 꽃들을 활용하여 자연스럽고 아름다운 작품을 완성해보세요.
꽃의 특성과 색상 조합을 배우며 예술적 감각을 기를 수 있습니다.

🌸 클래스 내용:
• 꽃의 종류와 특성 이해
• 색상 조합과 구도 배우기
• 꽃다발 만들기 기법
• 화분 꾸미기
• 꽃 관리 방법

🌺 모든 꽃과 도구는 제공되며, 완성된 작품은 가져가실 수 있습니다.`,
      instructor: '최플라워',
      instructorInfo: '플라워 디자이너 자격증, 7년 경력',
      schedule: [
        '2024.04.18 (목) 14:00 - 16:00',
        '2024.04.25 (목) 14:00 - 16:00',
        '2024.05.02 (목) 14:00 - 16:00',
      ],
      maxParticipants: 8,
      duration: '2시간',
      difficulty: '초급',
      materials: ['다양한 꽃', '꽃가위', '플라워 테이프', '리본', '화분'],
      isWished: false,
      contact: {
        phone: '010-4567-8901',
        email: 'flower@example.com',
      },
    },
    5: {
      reviewCount: 156,
      images: [
        'https://picsum.photos/800/600?random=5',
        'https://picsum.photos/800/600?random=51',
        'https://picsum.photos/800/600?random=52',
      ],
      description: `기타의 기본부터 고급 테크닉까지 체계적으로 배우는 음악 클래스입니다.
      
개인 수준에 맞는 맞춤형 레슨으로 효율적으로 기타 실력을 향상시킬 수 있습니다.
다양한 장르의 곡을 연주하며 음악의 즐거움을 느껴보세요.

🎸 클래스 내용:
• 기타 기본 자세와 코드
• 스트로킹과 핑거링 기법
• 리듬 패턴 연습
• 곡 연주하기
• 음악 이론 기초

🎵 기타는 대여 가능하며, 개인 기타 지참도 환영합니다.`,
      instructor: '김기타',
      instructorInfo: '음대 기타 전공, 밴드 활동 10년',
      schedule: [
        '2024.04.19 (금) 19:00 - 20:30',
        '2024.04.26 (금) 19:00 - 20:30',
        '2024.05.03 (금) 19:00 - 20:30',
      ],
      maxParticipants: 6,
      duration: '1시간 30분',
      difficulty: '초급',
      materials: ['기타', '픽', '악보', '메트로놈'],
      isWished: false,
      contact: {
        phone: '010-5678-9012',
        email: 'guitar@example.com',
      },
    },
    6: {
      reviewCount: 67,
      images: [
        'https://picsum.photos/800/600?random=6',
        'https://picsum.photos/800/600?random=61',
      ],
      description: `다양한 장르의 책을 함께 읽고 토론하는 독서 모임입니다.
      
매월 선정된 책을 읽고 모임에서 깊이 있는 토론을 나누어보세요.
독서 경험을 공유하며 새로운 관점과 지식을 얻을 수 있습니다.

📚 클래스 내용:
• 월간 독서 목표 설정
• 독서 노트 작성법
• 토론 발표 기법
• 독서 후기 공유
• 독서법 개선

📖 매월 새로운 책이 선정되며, 독서 자료가 제공됩니다.`,
      instructor: '이독서',
      instructorInfo: '문학 박사, 독서 지도사 자격증',
      schedule: [
        '2024.04.20 (토) 15:00 - 17:00',
        '2024.04.27 (토) 15:00 - 17:00',
        '2024.05.04 (토) 15:00 - 17:00',
      ],
      maxParticipants: 12,
      duration: '2시간',
      difficulty: '초급',
      materials: ['선정 도서', '독서 노트', '필기구'],
      isWished: false,
      contact: {
        phone: '010-6789-0123',
        email: 'book@example.com',
      },
    },
    7: {
      reviewCount: 98,
      images: [
        'https://picsum.photos/800/600?random=7',
        'https://picsum.photos/800/600?random=71',
        'https://picsum.photos/800/600?random=72',
      ],
      description: `점토를 이용해 나만의 도자기를 만드는 체험 클래스입니다.
      
물레를 이용한 성형부터 도예까지 전 과정을 경험할 수 있습니다.
완성된 작품은 가마에서 구워서 가져가실 수 있습니다.

🏺 클래스 내용:
• 도자기 기본 이론
• 물레 성형 기법
• 손 성형 기법
• 문양 그리기
• 유약 바르기

🎨 모든 재료와 도구는 제공되며, 완성된 도자기는 2주 후 픽업 가능합니다.`,
      instructor: '박도자기',
      instructorInfo: '도예 전문가, 전통 도자기 연구 15년',
      schedule: [
        '2024.04.21 (일) 10:00 - 12:30',
        '2024.04.28 (일) 10:00 - 12:30',
        '2024.05.05 (일) 10:00 - 12:30',
      ],
      maxParticipants: 10,
      duration: '2시간 30분',
      difficulty: '중급',
      materials: ['점토', '물레', '도예 도구', '유약', '브러시'],
      isWished: false,
      contact: {
        phone: '010-7890-1234',
        email: 'pottery@example.com',
      },
    },
    8: {
      reviewCount: 145,
      images: [
        'https://picsum.photos/800/600?random=8',
        'https://picsum.photos/800/600?random=81',
      ],
      description: `코어 근육을 강화하고 자세를 교정하는 필라테스 클래스입니다.
      
전문 강사와 함께 올바른 동작으로 몸의 균형과 유연성을 기를 수 있습니다.
일상생활에서의 자세 개선과 건강한 몸을 만들어보세요.

💪 클래스 내용:
• 필라테스 기본 원리
• 코어 강화 운동
• 자세 교정 동작
• 호흡법 연습
• 스트레칭

🧘‍♀️ 매트와 소도구는 제공되며, 편한 운동복을 착용해주세요.`,
      instructor: '정필라테스',
      instructorInfo: '필라테스 지도사 자격증, 8년 경력',
      schedule: [
        '2024.04.22 (월) 18:00 - 19:30',
        '2024.04.29 (월) 18:00 - 19:30',
        '2024.05.06 (월) 18:00 - 19:30',
      ],
      maxParticipants: 12,
      duration: '1시간 30분',
      difficulty: '초급',
      materials: ['필라테스 매트', '요가 블록', '밴드', '폼 롤러'],
      isWished: false,
      contact: {
        phone: '010-8901-2345',
        email: 'pilates@example.com',
      },
    },
    9: {
      reviewCount: 112,
      images: [
        'https://picsum.photos/800/600?random=9',
        'https://picsum.photos/800/600?random=91',
      ],
      description: `개인 수준에 맞는 피아노 레슨으로 음악 기초부터 고급 테크닉까지 배워보세요.
      
전문 피아니스트와 함께 체계적으로 피아노 실력을 향상시킬 수 있습니다.
다양한 장르의 곡을 연주하며 음악의 즐거움을 느껴보세요.

🎹 클래스 내용:
• 피아노 기본 자세와 손가락 위치
• 음계와 화음 연습
• 리듬과 박자 익히기
• 곡 연주하기
• 음악 이론

🎼 피아노는 제공되며, 개인 연습을 위한 악보도 제공됩니다.`,
      instructor: '김피아노',
      instructorInfo: '음대 피아노 전공, 연주 경력 12년',
      schedule: [
        '2024.04.23 (화) 19:00 - 20:30',
        '2024.04.30 (화) 19:00 - 20:30',
        '2024.05.07 (화) 19:00 - 20:30',
      ],
      maxParticipants: 4,
      duration: '1시간 30분',
      difficulty: '초급',
      materials: ['피아노', '악보', '메트로놈', '연습장'],
      isWished: false,
      contact: {
        phone: '010-9012-3456',
        email: 'piano@example.com',
      },
    },
    10: {
      reviewCount: 76,
      images: [
        'https://picsum.photos/800/600?random=10',
        'https://picsum.photos/800/600?random=101',
      ],
      description: `아름다운 손글씨로 감성을 표현하는 캘리그래피 클래스입니다.
      
다양한 펜과 브러시를 사용하여 아름다운 글씨를 써보세요.
완성된 작품으로 감성적인 카드나 포스터를 만들어보실 수 있습니다.

✍️ 클래스 내용:
• 캘리그래피 기본 이론
• 펜 잡는 방법과 자세
• 기본 획 연습
• 글자 구조 이해
• 작품 완성하기

📝 모든 펜과 종이는 제공되며, 완성된 작품은 가져가실 수 있습니다.`,
      instructor: '이캘리',
      instructorInfo: '캘리그래피 전문가, 디자인 학과 졸업',
      schedule: [
        '2024.04.24 (수) 14:00 - 16:00',
        '2024.05.01 (수) 14:00 - 16:00',
        '2024.05.08 (수) 14:00 - 16:00',
      ],
      maxParticipants: 8,
      duration: '2시간',
      difficulty: '초급',
      materials: ['브러시 펜', '캘리그래피 펜', '전문 종이', '잉크'],
      isWished: false,
      contact: {
        phone: '010-0123-4567',
        email: 'calligraphy@example.com',
      },
    },
    11: {
      reviewCount: 134,
      images: [
        'https://picsum.photos/800/600?random=11',
        'https://picsum.photos/800/600?random=111',
      ],
      description: `프로 셰프와 함께 다양한 요리를 배우는 쿠킹 클래스입니다.
      
한식, 일식, 양식 등 다양한 장르의 요리를 체험해보세요.
완성된 요리를 함께 맛보며 요리의 즐거움을 느껴보실 수 있습니다.

🍳 클래스 내용:
• 요리 기본 기법
• 칼질과 조리법
• 양념과 소스 만들기
• 플레이팅 기법
• 요리 완성하기

👨‍🍳 모든 재료와 도구는 제공되며, 완성된 요리는 함께 드실 수 있습니다.`,
      instructor: '박셰프',
      instructorInfo: '호텔 셰프 경력 10년, 요리 경연대회 수상',
      schedule: [
        '2024.04.25 (목) 18:00 - 20:30',
        '2024.05.02 (목) 18:00 - 20:30',
        '2024.05.09 (목) 18:00 - 20:30',
      ],
      maxParticipants: 10,
      duration: '2시간 30분',
      difficulty: '초급',
      materials: ['요리 재료', '조리 도구', '에이프론', '조리법서'],
      isWished: false,
      contact: {
        phone: '010-1234-5678',
        email: 'cooking@example.com',
      },
    },
    12: {
      reviewCount: 89,
      images: [
        'https://picsum.photos/800/600?random=12',
        'https://picsum.photos/800/600?random=121',
      ],
      description: `개인 맞춤형 헬스 트레이닝으로 건강한 몸을 만들어보세요.
      
전문 트레이너와 함께 개인 체력에 맞는 운동 계획을 세우고 실행합니다.
근력 향상과 체력 증진을 목표로 체계적인 운동을 진행합니다.

💪 클래스 내용:
• 개인 체력 측정 및 분석
• 맞춤형 운동 계획 수립
• 근력 운동 기법
• 유산소 운동
• 올바른 자세 교정

🏋️‍♂️ 모든 운동 기구는 제공되며, 개인별 맞춤 프로그램이 제공됩니다.`,
      instructor: '김트레이너',
      instructorInfo: '헬스 트레이너 자격증, 운동처방사 자격증',
      schedule: [
        '2024.04.26 (금) 19:00 - 20:30',
        '2024.05.03 (금) 19:00 - 20:30',
        '2024.05.10 (금) 19:00 - 20:30',
      ],
      maxParticipants: 6,
      duration: '1시간 30분',
      difficulty: '중급',
      materials: ['헬스 기구', '덤벨', '매트', '스트레칭 밴드'],
      isWished: false,
      contact: {
        phone: '010-2345-6789',
        email: 'fitness@example.com',
      },
    }
  }

  // 공통 데이터와 추가 세부 정보를 합쳐서 완전한 취미 정보 생성
  const hobbyDetail: HobbyDetail = {
    ...baseHobby,
    ...additionalDetails[hobbyId],
    location: baseHobby.location, // 공통 데이터의 location 사용
  } as HobbyDetail

  const relatedHobbies = (hobbyData || [])
    .filter(hobby => hobby.category === baseHobby.category && hobby.id !== hobbyId)
    .slice(0, 3)
    .map(hobby => ({
      id: hobby.id,
      title: hobby.title,
      location: hobby.location,
      price: hobby.price,
      rating: hobby.rating,
      image: hobby.image,
    }))

  const reviews = [
    {
      id: 1,
      name: '김수진',
      rating: 5,
      date: '2024.03.20',
      comment: '정말 친절하게 가르쳐주셔서 처음인 저도 쉽게 따라할 수 있었어요! 작품도 예쁘게 나왔습니다.',
    },
    {
      id: 2,
      name: '이민호',
      rating: 4,
      date: '2024.03.15',
      comment: '수채화 기초부터 차근차근 알려주셔서 좋았습니다. 재료도 모두 준비해주셔서 편했어요.',
    },
    {
      id: 3,
      name: '박지영',
      rating: 5,
      date: '2024.03.10',
      comment: '강사님이 전문적이시면서도 재미있게 수업해주셔서 시간이 금방 지나갔네요. 추천합니다!',
    },
  ]


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 뒤로가기 버튼 */}
        <a 
          href="/"
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          뒤로가기
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2">
            {/* 이미지 갤러리 */}
            <ImageGallery images={hobbyDetail.images || []} title={hobbyDetail.title} />

            {/* 기본 정보 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {hobbyDetail.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {hobbyDetail.difficulty}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-500 mb-2">{hobbyDetail.title}</h1>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hobbyDetail.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      {hobbyDetail.rating} ({hobbyDetail.reviewCount})
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <HobbyDetailClient hobbyDetail={hobbyDetail} />
                </div>
              </div>

              {/* 가격 */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-blue-600">{hobbyDetail.price}</span>
                {hobbyDetail.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">{hobbyDetail.originalPrice}</span>
                )}
              </div>

              {/* 클래스 설명 */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-neutral-500 mb-3">클래스 소개</h2>
                <p className="text-neutral-400 whitespace-pre-line leading-relaxed">
                  {hobbyDetail.description}
                </p>
              </div>

              {/* 클래스 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-neutral-500 mb-3">클래스 정보</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">소요시간</span>
                      <span className="text-neutral-500">{hobbyDetail.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">난이도</span>
                      <span className="text-neutral-500">{hobbyDetail.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">최대 인원</span>
                      <span className="text-neutral-500">{hobbyDetail.maxParticipants}명</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutral-500 mb-3">준비물</h3>
                  <ul className="space-y-1">
                    {(hobbyDetail.materials || []).map((material, index) => (
                      <li key={index} className="text-neutral-400">• {material}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 강사 정보 */}
              <div className="mb-6">
                <h3 className="font-semibold text-neutral-500 mb-3">강사 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="font-semibold text-neutral-500 mb-1">{hobbyDetail.instructor}</div>
                  <div className="text-neutral-400">{hobbyDetail.instructorInfo}</div>
                </div>
              </div>

              {/* 리뷰 */}
              <div>
                <h3 className="font-semibold text-neutral-500 mb-4">리뷰 ({hobbyDetail.reviewCount})</h3>
                <div className="space-y-4">
                  {(reviews || []).map((review) => (
                    <div key={review.id} className="border-b border-neutral-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-neutral-500">{review.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-neutral-400">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-400">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 관련 취미 */}
            <RelatedHobbies hobbies={relatedHobbies} />
          </div>

          {/* 사이드바 - 예약 정보 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-neutral-500 mb-4">예약하기</h3>
                
                {/* 일정 선택 */}
                <div className="mb-6">
                  <h4 className="font-semibold text-neutral-500 mb-3">일정 선택</h4>
                  <div className="space-y-2">
                    {(hobbyDetail.schedule || []).map((schedule, index) => (
                      <label key={index} className="flex items-center p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="schedule"
                          value={index}
                          defaultChecked={index === 0}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-neutral-500">{schedule}</div>
                          <div className="text-sm text-neutral-400">잔여 3자리</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 예약 요약 */}
                <div className="border-t border-neutral-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-neutral-400">클래스 요금</span>
                    <span className="text-neutral-500">{hobbyDetail.price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span className="text-neutral-500">총 결제금액</span>
                    <span className="text-blue-600">{hobbyDetail.price}</span>
                  </div>
                </div>

                {/* 예약 버튼 */}
                <HobbyDetailClient hobbyDetail={hobbyDetail} isReservation />

                {/* 문의하기 */}
                <div className="border-t border-neutral-200 pt-4">
                  <h4 className="font-semibold text-neutral-500 mb-3">문의하기</h4>
                  <div className="space-y-2">
                    {hobbyDetail.contact?.phone && (
                      <a
                        href={`tel:${hobbyDetail.contact.phone}`}
                        className="flex items-center gap-2 text-neutral-400 hover:text-neutral-500"
                      >
                        <Phone className="h-4 w-4" />
                        {hobbyDetail.contact.phone}
                      </a>
                    )}
                    {hobbyDetail.contact?.email && (
                      <a
                        href={`mailto:${hobbyDetail.contact.email}`}
                        className="flex items-center gap-2 text-neutral-400 hover:text-neutral-500"
                      >
                        <Mail className="h-4 w-4" />
                        {hobbyDetail.contact.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
