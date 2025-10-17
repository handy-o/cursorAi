'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Heart, MapPin, Star } from 'lucide-react'

interface RelatedHobby {
  id: number
  title: string
  location: string
  price: string
  rating: number
  image: string
}

interface RelatedHobbiesProps {
  hobbies: RelatedHobby[]
}

export default function RelatedHobbies({ hobbies }: RelatedHobbiesProps) {
  const { user } = useAuth()
  const router = useRouter()

  const handleWishToggle = (e: React.MouseEvent, hobbyId: number) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      router.push('/login')
      return
    }
    // 찜하기 기능은 나중에 구현
    console.log('Wish toggle for hobby:', hobbyId)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-neutral-500 mb-4">관련 취미</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hobbies.map((hobby) => (
          <a 
            key={hobby.id} 
            href={`/hobby/${hobby.id}`}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={hobby.image}
                alt={hobby.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* 찜하기 버튼 */}
              <button 
                onClick={(e) => handleWishToggle(e, hobby.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
              >
                <Heart className="h-3 w-3 text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-neutral-500 mb-1">{hobby.title}</h4>
              <div className="flex items-center text-sm text-neutral-400 mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {hobby.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{hobby.rating}</span>
                </div>
                <span className="text-sm font-semibold text-neutral-700">{hobby.price}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
