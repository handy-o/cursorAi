'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { useWishlist } from '@/hooks/useWishlist'
import { useAuth } from '@/hooks/useAuth'
import { Star, MapPin, Heart, Filter, SlidersHorizontal } from 'lucide-react'

interface HobbyItem {
  id: number
  title: string
  location: string
  price: string
  priceValue: number
  rating: number
  reviewCount: number
  image: string
  isWished: boolean
  category: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])
  
  const [selectedCategory, setSelectedCategory] = useState('전체')

  // URL 파라미터로 전달된 카테고리를 필터에 반영
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      const categories = ['전체', '미술', '요리', '운동', '음악', '공예', '독서']
      if (categories.includes(query)) {
        setSelectedCategory(query)
        // 카테고리로 검색한 경우 검색어는 초기화
        setSearchQuery('')
      } else {
        // 검색어가 카테고리가 아닌 경우 전체로 설정하고 검색어 유지
        setSelectedCategory('전체')
        setSearchQuery(query)
      }
    }
  }, [searchParams])
  const [selectedLocation, setSelectedLocation] = useState('전체')
  const [priceRange, setPriceRange] = useState('전체')
  const [sortBy, setSortBy] = useState('인기순')
  const [showFilters, setShowFilters] = useState(false)
  const { isWished, toggleWishlist } = useWishlist()
  const { user } = useAuth()
  const router = useRouter()

  const allHobbies: HobbyItem[] = [
    {
      id: 1,
      title: '수채화 드로잉 클래스',
      location: '강남구',
      price: '50,000원',
      priceValue: 50000,
      rating: 4.8,
      reviewCount: 127,
      image: 'https://picsum.photos/300/200?random=1',
      isWished: false,
      category: '미술',
    },
    {
      id: 2,
      title: '디지털 드로잉 입문',
      location: '서초구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://picsum.photos/300/200?random=2',
      isWished: true,
      category: '미술',
    },
    {
      id: 3,
      title: '캐릭터 드로잉 워크샵',
      location: '마포구',
      price: '35,000원',
      priceValue: 35000,
      rating: 4.9,
      reviewCount: 156,
      image: 'https://picsum.photos/300/200?random=3',
      isWished: false,
      category: '미술',
    },
    {
      id: 4,
      title: '펜 드로잉 기초',
      location: '송파구',
      price: '30,000원',
      priceValue: 30000,
      rating: 4.6,
      reviewCount: 73,
      image: 'https://picsum.photos/300/200?random=4',
      isWished: false,
      category: '미술',
    },
    {
      id: 5,
      title: '아크릴 드로잉',
      location: '영등포구',
      price: '55,000원',
      priceValue: 55000,
      rating: 4.5,
      reviewCount: 94,
      image: 'https://picsum.photos/300/200?random=5',
      isWished: true,
      category: '미술',
    },
    {
      id: 6,
      title: '드로잉 테라피',
      location: '용산구',
      price: '40,000원',
      priceValue: 40000,
      rating: 4.8,
      reviewCount: 112,
      image: 'https://picsum.photos/300/200?random=6',
      isWished: false,
      category: '미술',
    },
    {
      id: 7,
      title: '홈베이킹 클래스',
      location: '서초구',
      price: '35,000원',
      priceValue: 35000,
      rating: 4.9,
      reviewCount: 203,
      image: 'https://picsum.photos/300/200?random=7',
      isWished: false,
      category: '요리',
    },
    {
      id: 8,
      title: '한식 요리 교실',
      location: '강남구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.7,
      reviewCount: 156,
      image: 'https://picsum.photos/300/200?random=8',
      isWished: false,
      category: '요리',
    },
    {
      id: 9,
      title: '파스타 마스터 클래스',
      location: '마포구',
      price: '40,000원',
      priceValue: 40000,
      rating: 4.6,
      reviewCount: 89,
      image: 'https://picsum.photos/300/200?random=9',
      isWished: false,
      category: '요리',
    },
    {
      id: 10,
      title: '요가 & 명상',
      location: '마포구',
      price: '40,000원',
      priceValue: 40000,
      rating: 4.7,
      reviewCount: 134,
      image: 'https://picsum.photos/300/200?random=10',
      isWished: false,
      category: '운동',
    },
    {
      id: 11,
      title: '필라테스 기초',
      location: '송파구',
      price: '50,000원',
      priceValue: 50000,
      rating: 4.8,
      reviewCount: 98,
      image: 'https://picsum.photos/300/200?random=11',
      isWished: false,
      category: '운동',
    },
    {
      id: 12,
      title: '헬스 트레이닝',
      location: '강남구',
      price: '60,000원',
      priceValue: 60000,
      rating: 4.5,
      reviewCount: 167,
      image: 'https://picsum.photos/300/200?random=12',
      isWished: false,
      category: '운동',
    },
    {
      id: 13,
      title: '기타 레슨',
      location: '서초구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.6,
      reviewCount: 78,
      image: 'https://picsum.photos/300/200?random=13',
      isWished: false,
      category: '음악',
    },
    {
      id: 14,
      title: '피아노 입문',
      location: '영등포구',
      price: '55,000원',
      priceValue: 55000,
      rating: 4.8,
      reviewCount: 145,
      image: 'https://picsum.photos/300/200?random=14',
      isWished: false,
      category: '음악',
    },
    {
      id: 15,
      title: '플라워 아레인지먼트',
      location: '송파구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.6,
      reviewCount: 112,
      image: 'https://picsum.photos/300/200?random=15',
      isWished: false,
      category: '공예',
    },
    {
      id: 16,
      title: '도자기 만들기',
      location: '용산구',
      price: '55,000원',
      priceValue: 55000,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://picsum.photos/300/200?random=16',
      isWished: false,
      category: '공예',
    },
    {
      id: 17,
      title: '독서 모임',
      location: '마포구',
      price: '25,000원',
      priceValue: 25000,
      rating: 4.4,
      reviewCount: 67,
      image: 'https://picsum.photos/300/200?random=17',
      isWished: false,
      category: '독서',
    },
    {
      id: 18,
      title: '책 리뷰 클럽',
      location: '강남구',
      price: '30,000원',
      priceValue: 30000,
      rating: 4.5,
      reviewCount: 43,
      image: 'https://picsum.photos/300/200?random=18',
      isWished: false,
      category: '독서',
    },
    {
      id: 19,
      title: '수영 기초',
      location: '송파구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://picsum.photos/300/200?random=19',
      isWished: false,
      category: '운동',
    },
    {
      id: 20,
      title: '테니스 레슨',
      location: '강남구',
      price: '65,000원',
      priceValue: 65000,
      rating: 4.6,
      reviewCount: 67,
      image: 'https://picsum.photos/300/200?random=20',
      isWished: false,
      category: '운동',
    },
    {
      id: 21,
      title: '바리스타 자격증',
      location: '마포구',
      price: '120,000원',
      priceValue: 120000,
      rating: 4.8,
      reviewCount: 156,
      image: 'https://picsum.photos/300/200?random=21',
      isWished: false,
      category: '요리',
    },
    {
      id: 22,
      title: '일본어 회화',
      location: '서초구',
      price: '40,000원',
      priceValue: 40000,
      rating: 4.5,
      reviewCount: 98,
      image: 'https://picsum.photos/300/200?random=22',
      isWished: false,
      category: '독서',
    },
    {
      id: 23,
      title: '스크래치보드 아트',
      location: '영등포구',
      price: '35,000원',
      priceValue: 35000,
      rating: 4.4,
      reviewCount: 54,
      image: 'https://picsum.photos/300/200?random=23',
      isWished: false,
      category: '미술',
    },
    {
      id: 24,
      title: '드럼 레슨',
      location: '용산구',
      price: '50,000원',
      priceValue: 50000,
      rating: 4.7,
      reviewCount: 78,
      image: 'https://picsum.photos/300/200?random=24',
      isWished: false,
      category: '음악',
    },
    {
      id: 25,
      title: '양봉 체험',
      location: '송파구',
      price: '45,000원',
      priceValue: 45000,
      rating: 4.6,
      reviewCount: 34,
      image: 'https://picsum.photos/300/200?random=25',
      isWished: false,
      category: '공예',
    },
    {
      id: 26,
      title: '명상 & 요가',
      location: '강남구',
      price: '40,000원',
      priceValue: 40000,
      rating: 4.8,
      reviewCount: 123,
      image: 'https://picsum.photos/300/200?random=26',
      isWished: false,
      category: '운동',
    },
    {
      id: 27,
      title: '캘리그래피',
      location: '마포구',
      price: '35,000원',
      priceValue: 35000,
      rating: 4.5,
      reviewCount: 87,
      image: 'https://picsum.photos/300/200?random=27',
      isWished: false,
      category: '미술',
    },
    {
      id: 28,
      title: '스시 만들기',
      location: '서초구',
      price: '80,000원',
      priceValue: 80000,
      rating: 4.9,
      reviewCount: 145,
      image: 'https://picsum.photos/300/200?random=28',
      isWished: false,
      category: '요리',
    },
    {
      id: 29,
      title: '퍼즐 모임',
      location: '영등포구',
      price: '20,000원',
      priceValue: 20000,
      rating: 4.3,
      reviewCount: 45,
      image: 'https://picsum.photos/300/200?random=29',
      isWished: false,
      category: '독서',
    },
    {
      id: 30,
      title: '볼링 레슨',
      location: '용산구',
      price: '35,000원',
      priceValue: 35000,
      rating: 4.4,
      reviewCount: 56,
      image: 'https://picsum.photos/300/200?random=30',
      isWished: false,
      category: '운동',
    },
    {
      id: 31,
      title: '집중력 향상 미술 치료',
      location: '강남구',
      price: '60,000원',
      priceValue: 60000,
      rating: 4.7,
      reviewCount: 89,
      image: 'https://picsum.photos/300/200?random=31',
      isWished: false,
      category: '미술',
    },
  ]

  // 필터링 및 정렬 로직
  const filteredAndSortedResults = useMemo(() => {
    let filtered = allHobbies.filter(hobby => {
      // 검색어 필터 (제목과 카테고리 모두 검색)
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = hobby.title.toLowerCase().includes(query)
        const matchesCategory = hobby.category.toLowerCase().includes(query)
        
        if (!matchesTitle && !matchesCategory) {
          return false
        }
      }
      
      // 카테고리 필터
      if (selectedCategory !== '전체' && hobby.category !== selectedCategory) {
        return false
      }
      
      // 지역 필터
      if (selectedLocation !== '전체' && hobby.location !== selectedLocation) {
        return false
      }
      
      // 가격 필터
      if (priceRange !== '전체') {
        switch (priceRange) {
          case '~30,000원':
            if (hobby.priceValue > 30000) return false
            break
          case '30,000~50,000원':
            if (hobby.priceValue <= 30000 || hobby.priceValue > 50000) return false
            break
          case '50,000~100,000원':
            if (hobby.priceValue <= 50000 || hobby.priceValue > 100000) return false
            break
          case '100,000원~':
            if (hobby.priceValue <= 100000) return false
            break
        }
      }
      
      return true
    })

    // 정렬
    switch (sortBy) {
      case '인기순':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case '최신순':
        filtered.sort((a, b) => b.id - a.id)
        break
      case '가격낮은순':
        filtered.sort((a, b) => a.priceValue - b.priceValue)
        break
      case '가격높은순':
        filtered.sort((a, b) => b.priceValue - a.priceValue)
        break
      case '평점순':
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy])


  const categories = ['전체', '미술', '요리', '운동', '음악', '공예', '독서']
  const locations = ['전체', '강남구', '서초구', '마포구', '송파구', '영등포구', '용산구']
  const priceRanges = ['전체', '~30,000원', '30,000~50,000원', '50,000~100,000원', '100,000원~']

  const FilterPanel = () => (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      <h3 className="font-semibold text-neutral-500 mb-4 flex items-center">
        <Filter className="h-4 w-4 mr-2" />
        필터
      </h3>
      
      {/* 카테고리 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-500 mb-3">카테고리</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-neutral-400">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 지역 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-500 mb-3">지역</h4>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center">
              <input
                type="radio"
                name="location"
                value={location}
                checked={selectedLocation === location}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-neutral-400">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 가격대 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-neutral-500 mb-3">가격대</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range}
                checked={priceRange === range}
                onChange={(e) => setPriceRange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-neutral-400">{range}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 검색 헤더 */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-500">
                {searchQuery ? `"${searchQuery}" 검색 결과` : selectedCategory !== '전체' ? `${selectedCategory} 카테고리` : '전체 취미'}
              </h1>
              <p className="text-neutral-400 mt-1">
                {searchQuery ? `"${searchQuery}"` : selectedCategory !== '전체' ? `${selectedCategory}` : '전체'} 검색 결과: {filteredAndSortedResults.length}개의 취미를 찾았습니다
              </p>
            </div>
            
            {/* 정렬 옵션 */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="인기순">인기순</option>
                <option value="최신순">최신순</option>
                <option value="가격낮은순">가격 낮은순</option>
                <option value="가격높은순">가격 높은순</option>
                <option value="평점순">평점순</option>
              </select>
              
              {/* 모바일 필터 버튼 */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 border border-neutral-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4" />
                필터
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 데스크탑 필터 패널 */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <FilterPanel />
          </div>

          {/* 모바일 필터 패널 */}
          {showFilters && (
            <div className="lg:hidden mb-6">
              <FilterPanel />
            </div>
          )}

          {/* 검색 결과 */}
          <div className="flex-1">
            {filteredAndSortedResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedResults.map((hobby) => (
                  <div key={hobby.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                    <div className="relative">
                      <div className="overflow-hidden rounded-t-lg">
                        <img
                          src={hobby.image}
                          alt={hobby.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <button 
                        onClick={() => {
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
                      <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold sr-only">
                        {hobby.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-neutral-500 mb-2">{hobby.title}</h3>
                      <div className="flex items-center text-sm text-neutral-400 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hobby.location}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-medium mr-1">{hobby.rating}</span>
                          <span className="text-xs text-neutral-400">({hobby.reviewCount})</span>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">{hobby.price}</span>
                      </div>
                      <Link href={`/hobby/${hobby.id}`}>
                        <button className="w-full border-2 border-neutral-400 text-neutral-500 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors">
                          자세히 보기
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😅</div>
                <h3 className="text-xl font-semibold text-neutral-500 mb-2">검색 결과가 없습니다</h3>
                <p className="text-neutral-400 mb-6">
                  다른 키워드로 검색해보시거나 필터를 조정해보세요
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  추천 취미 보기
                </button>
              </div>
            )}

            {/* 페이지네이션 */}
            {filteredAndSortedResults.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-gray-50">
                    이전
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    1
                  </button>
                  <button className="px-3 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-2 border border-neutral-200 rounded-lg text-sm hover:bg-gray-50">
                    다음
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
