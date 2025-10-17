'use client'

import { useRouter } from 'next/navigation'
import { useWishlist } from '@/hooks/useWishlist'
import { useAuth } from '@/hooks/useAuth'
import { Heart, Share2 } from 'lucide-react'

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

interface HobbyDetailClientProps {
  hobbyDetail: HobbyDetail
  isReservation?: boolean
}

export default function HobbyDetailClient({ hobbyDetail, isReservation }: HobbyDetailClientProps) {
  const { isWished, toggleWishlist } = useWishlist()
  const { user } = useAuth()
  const router = useRouter()

  const handleWishToggle = () => {
    if (!user) {
      router.push('/login')
      return
    }
    toggleWishlist(hobbyDetail)
  }

  const handleReservation = () => {
    alert('예약 기능은 준비 중입니다.')
  }

  if (isReservation) {
    return (
      <button
        onClick={handleReservation}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
      >
        예약하기
      </button>
    )
  }

  return (
    <>
      <button
        onClick={handleWishToggle}
        className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-gray-50"
      >
        <Heart className={`h-4 w-4 ${user && isWished(hobbyDetail.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
        찜하기
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-gray-50">
        <Share2 className="h-4 w-4" />
        공유
      </button>
    </>
  )
}
