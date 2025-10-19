'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
import { Star, MapPin, Heart, Play } from 'lucide-react'
import { hobbyData } from '@/lib/hobbyData'

export default function Home() {
  const { wishlist, isWished, toggleWishlist } = useWishlist()
  const { user } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>('미술')

  const recommendedHobbies = hobbyData.slice(0, 12)


  const events = [
    {
      id: 1,
      title: '봄맞이 특강: 신선한 꽃꽂이',
      date: '2024.04.15',
      originalPrice: '50,000원',
      discountedPrice: '35,000원',
      discountRate: '30%',
      image: 'https://picsum.photos/400/250?random=5',
    },
    {
      id: 2,
      title: '집중력 향상 미술 치료',
      date: '2024.04.20',
      originalPrice: '60,000원',
      discountedPrice: '45,000원',
      discountRate: '25%',
      image: 'https://picsum.photos/400/250?random=6',
    },
    {
      id: 3,
      title: '나만의 도자기 만들기',
      date: '2024.04.25',
      originalPrice: '70,000원',
      discountedPrice: '55,000원',
      discountRate: '21%',
      image: 'https://picsum.photos/400/250?random=7',
    },
  ]

  const categories = [
    { name: '미술', icon: '🎨', count: 128 },
    { name: '요리', icon: '👨‍🍳', count: 95 },
    { name: '운동', icon: '🏃‍♀️', count: 87 },
    { name: '음악', icon: '🎵', count: 73 },
    { name: '공예', icon: '✂️', count: 156 },
    { name: '독서', icon: '📚', count: 42 },
  ]

  const categoryHobbies = {
    '미술': [
      '수채화 드로잉', '아크릴 페인팅', '유화', '디지털 드로잉', '캐릭터 일러스트',
      '펜 드로잉', '색연필 드로잉', '목탄 드로잉', '캘리그래피', '타이포그래피',
      '패션 일러스트', '건축 스케치', '인물화', '풍경화', '정물화',
      '추상화', '팝아트', '워터컬러', '파스텔화', '목판화'
    ],
    '요리': [
      '홈베이킹', '한식 요리', '일식 요리', '중식 요리', '양식 요리',
      '이탈리안 요리', '프렌치 요리', '태국 요리', '인도 요리', '멕시칸 요리',
      '디저트 만들기', '케이크 데코레이션', '쿠키 만들기', '빵 만들기', '파스타',
      '피자 만들기', '스시 만들기', '라면 만들기', '샐러드', '스무디'
    ],
    '운동': [
      '요가', '필라테스', '헬스 트레이닝', '수영', '테니스',
      '배드민턴', '탁구', '볼링', '골프', '스키',
      '스노보드', '서핑', '스쿠버다이빙', '등산', '트레킹',
      '자전거', '마라톤', '복싱', '무에타이', '주짓수'
    ],
    '음악': [
      '기타', '피아노', '드럼', '베이스', '바이올린',
      '첼로', '플루트', '색소폰', '트럼펫', '클라리넷',
      '우쿨렐레', '하모니카', '키보드', '보컬', '작곡',
      '음향 엔지니어링', 'DJ', '비트메이킹', '밴드', '합창'
    ],
    '공예': [
      '도자기 만들기', '플라워 아레인지먼트', '양봉 체험', '목공예', '금속공예',
      '가죽공예', '섬유공예', '종이공예', '비누 만들기', '캔들 만들기',
      '액세서리 만들기', '가방 만들기', '모자 만들기', '스카프 뜨개질', '바느질',
      '자수', '패치워크', '퀼팅', '마크라메', '천연 염색'
    ],
    '독서': [
      '독서 모임', '책 리뷰 클럽', '일본어 회화', '영어 회화', '중국어 회화',
      '프랑스어 회화', '스페인어 회화', '독일어 회화', '러시아어 회화', '아랍어 회화',
      '한자 공부', '문학 작품 감상', '시 낭송', '에세이 쓰기', '창작 소설',
      '번역', '편집', '출판', '독서 토론', '독서법'
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Banner */}
      <section 
        className="relative text-white py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500"
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              나만의 취미를 찾아보세요
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              새로운 경험과 함께하는 특별한 취미 생활을 시작해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  if (user) {
                    router.push('/search')
                  } else {
                    router.push('/login')
                  }
                }}
                className="bg-white text-neutral-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                지금 시작하기
              </button>
              {!user && (
                <button 
                  onClick={() => router.push('/login')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-neutral-700 transition-all duration-200"
                >
                  더 알아보기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-500 mb-4">카테고리별 취미 탐색</h2>
            <p className="text-lg text-neutral-400">관심 있는 카테고리를 클릭하여 다양한 취미를 확인해보세요</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedCategory(category.name)}
                className="p-6 text-center transition-all duration-200 cursor-pointer rounded-lg border-2 border-transparent hover:border-primary-200"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3                 className={`font-semibold transition-all duration-200 px-3 py-1 ${
                  selectedCategory === category.name 
                    ? 'bg-blue-600 text-white rounded-full' 
                    : 'text-neutral-500'
                }`}>
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">{category.count}개</p>
              </div>
            ))}
          </div>

          {/* 카테고리별 취미 목록 */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-neutral-500">
                {selectedCategory} 카테고리 취미
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categoryHobbies[selectedCategory as keyof typeof categoryHobbies]?.map((hobby, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-transparent transition-all duration-200 cursor-default text-center"
                >
                  <span className="text-sm text-neutral-600 font-medium">{hobby}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-400 mb-4">
                관심 있는 취미가 있으신가요? 검색에서 더 자세히 알아보세요!
              </p>
              <button 
                onClick={() => router.push(`/search?q=${selectedCategory}`)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {selectedCategory} 취미 탐색하기
              </button>
            </div>
          </div>
        </div>
      </section>

       {/* 추천 취미 */}
       <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-500 mb-4">추천 취미 활동</h2>
            <p className="text-lg text-neutral-400">인기 있는 취미들을 만나보세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedHobbies.map((hobby) => (
              <div key={hobby.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden relative group">
                <div className="relative">
                  <Link href={`/hobby/${hobby.id}`}>
                    <div className="overflow-hidden rounded-t-lg">
                      <img
                        src={hobby.image}
                        alt={hobby.title}
                        className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold sr-only">
                    {hobby.category}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      if (!user) {
                        router.push('/login')
                        return
                      }
                      toggleWishlist(hobby)
                    }}
                    className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 z-10 transition-opacity duration-200 ${
                      user && isWished(hobby.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${user && isWished(hobby.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <Link href={`/hobby/${hobby.id}`}>
                    <h3 className="font-semibold text-neutral-500 mb-2 cursor-pointer">{hobby.title}</h3>
                  </Link>
                  <div className="flex items-center text-sm text-neutral-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hobby.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hobby.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-neutral-700">{hobby.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/search" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              추천 취미 더보기
            </a>
          </div>
          
        </div>
      </section>

      {/* 할인 중인 클래스 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-500 mb-4">지금 할인 중인 취미</h2>
            <p className="text-lg text-neutral-400">한정 시간 특가로 만나는 특별한 취미 클래스</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/hobby/event/${event.id}`}>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {event.discountRate} 할인
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-neutral-500 mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-400 line-through">{event.originalPrice}</span>
                      <span className="text-neutral-700 font-semibold">{event.discountedPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href="/search?sale=할인중" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              할인 중인 취미 더보기
            </a>  
          </div>
        </div>
      </section>
    </div>
  )
}
