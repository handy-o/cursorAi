'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
import { Star, MapPin, Heart, Calendar, Clock, Settings, User, Mail, Phone } from 'lucide-react'
import { hobbyData } from '@/lib/hobbyData'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('wishlist')
  const { user, loading } = useAuth()
  const { wishlist, removeFromWishlist } = useWishlist()
  const router = useRouter()

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!loading && !user) {
    router.push('/login')
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-neutral-500">로딩 중...</div>
        </div>
      </div>
    )
  }

  const userProfile = {
    name: user?.name || '사용자',
    email: user?.email || '',
    phone: user?.phone || '',
    joinDate: new Date(user?.created_at || '').toLocaleDateString('ko-KR'),
    avatar: user?.avatar_url || 'https://picsum.photos/100/100?random=user',
  }


  const reservations = [
    {
      id: 1,
      hobbyId: 1, // 수채화 드로잉
      title: '수채화 드로잉',
      location: '강남구',
      price: '50,000원',
      image: 'https://picsum.photos/300/200?random=1',
      date: '2024.04.15',
      time: '14:00 - 16:00',
      status: 'confirmed',
      bookingDate: '2024.03.20',
    },
    {
      id: 2,
      hobbyId: 3, // 요가 & 명상
      title: '요가 & 명상',
      location: '마포구',
      price: '40,000원',
      image: 'https://picsum.photos/300/200?random=3',
      date: '2024.04.20',
      time: '10:00 - 11:30',
      status: 'pending',
      bookingDate: '2024.03.22',
    },
    {
      id: 3,
      hobbyId: 10, // 캘리그래피
      title: '캘리그래피',
      location: '마포구',
      price: '35,000원',
      image: 'https://picsum.photos/300/200?random=10',
      date: '2024.03.30',
      time: '15:00 - 17:00',
      status: 'completed',
      bookingDate: '2024.03.15',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '확정됨'
      case 'pending':
        return '대기중'
      case 'completed':
        return '완료됨'
      case 'cancelled':
        return '취소됨'
      default:
        return '알 수 없음'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 프로필 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={userProfile.avatar}
                alt="프로필"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-neutral-500">안녕하세요, {userProfile.name}님 👋</h2>
                <p className="text-neutral-400">가입일: {userProfile.joinDate}</p>
              </div>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-neutral-500 hover:bg-gray-50">
                <Settings className="h-4 w-4" />
                설정
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                <User className="h-4 w-4" />
                프로필 편집
              </button>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-neutral-400" />
                <span className="text-neutral-500">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-neutral-400" />
                <span className="text-neutral-500">{userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <span className="text-neutral-500">가입 {new Date().getMonth() - new Date(userProfile.joinDate).getMonth() + 1}개월</span>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'wishlist'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              찜한 취미 ({wishlist.length})
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'reservations'
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-neutral-400 hover:text-neutral-500'
              }`}
            >
              예약 내역 ({reservations.length})
            </button>
          </div>
        </div>

        {/* 찜한 취미 탭 */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((hobby) => (
                  <div key={hobby.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                    <div className="relative">
                      <div 
                        className="overflow-hidden rounded-t-lg cursor-pointer"
                        onClick={() => router.push(`/hobby/${hobby.id}`)}
                      >
                        <img
                          src={hobby.image}
                          alt={hobby.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold sr-only">
                        {hobby.category}
                      </div>
                      <button 
                        onClick={() => removeFromWishlist(hobby.id)}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 opacity-100"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 
                        className="font-semibold text-neutral-500 mb-2 cursor-pointer hover:text-primary-500 transition-colors"
                        onClick={() => router.push(`/hobby/${hobby.id}`)}
                      >
                        {hobby.title}
                      </h3>
                      <div className="flex items-center text-sm text-neutral-400 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {hobby.location}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{hobby.rating}</span>
                        </div>
                        <span className="text-sm font-semibold text-primary-500">{hobby.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">찜한 날: {hobby.addedDate}</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => router.push(`/hobby/${hobby.id}`)}
                            className="flex-1 border-2 border-neutral-400 text-neutral-500 py-2 px-4 rounded-lg font-semibold hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-colors text-sm"
                          >
                            예약하기
                          </button>
                          <button 
                            onClick={() => removeFromWishlist(hobby.id)}
                            className="px-3 py-2 border border-neutral-200 rounded-lg text-neutral-500 hover:bg-gray-50 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-500 mb-2">찜한 취미가 없습니다</h3>
                <p className="text-neutral-400 mb-6">
                  마음에 드는 취미를 찜해보세요!
                </p>
                <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                  취미 둘러보기
                </button>
              </div>
            )}
          </div>
        )}

        {/* 예약 내역 탭 */}
        {activeTab === 'reservations' && (
          <div>
            {reservations.length > 0 ? (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={reservation.image}
                        alt={reservation.title}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-neutral-500 mb-1">{reservation.title}</h3>
                            <div className="flex items-center text-sm text-neutral-400 mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {reservation.location}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reservation.status)}`}>
                            {getStatusText(reservation.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-neutral-400" />
                            <span className="text-sm text-neutral-500">{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-neutral-400" />
                            <span className="text-sm text-neutral-500">{reservation.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-primary-500">{reservation.price}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-3">
                          <span className="text-xs text-neutral-400">예약일: {reservation.bookingDate}</span>
                          <div className="flex gap-2 ml-auto">
                            <button 
                              onClick={() => router.push(`/hobby/${reservation.hobbyId}`)}
                              className="px-4 py-2 border border-neutral-200 rounded-lg text-neutral-500 hover:bg-gray-50 text-sm"
                            >
                              상세보기
                            </button>
                            {reservation.status === 'confirmed' && (
                              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                                취소하기
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Calendar className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-500 mb-2">예약 내역이 없습니다</h3>
                <p className="text-neutral-400 mb-6">
                  관심 있는 취미를 예약해보세요!
                </p>
                <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                  취미 둘러보기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
