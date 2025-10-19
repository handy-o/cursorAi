'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import { Share2, ArrowRight, Star, MapPin, Heart } from 'lucide-react'
import { SurveyData } from '@/types/survey'
import { hobbyData, Hobby } from '@/lib/hobbyData'

export default function SurveyResultPage() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const resultType = searchParams.get('type')

  useEffect(() => {
    const loadSurveyData = async () => {
      try {
        const response = await fetch('/docs/question.json')
        const data = await response.json()
        setSurveyData(data)
      } catch (error) {
        console.error('설문 데이터 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSurveyData()
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '나의 취미 유형 테스트 결과',
          text: `${resultType} 유형이 나에게 어울린다고 나왔어요!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('공유 취소됨')
      }
    } else {
      // 클립보드에 복사
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('링크가 클립보드에 복사되었습니다!')
      } catch (error) {
        alert('링크 복사에 실패했습니다.')
      }
    }
  }

  const getRecommendedHobbies = (type: string): Hobby[] => {
    return hobbyData.filter(hobby => hobby.category === type).slice(0, 4)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-500">결과를 분석하는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!surveyData || !resultType) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-neutral-500">결과를 불러올 수 없습니다.</p>
            <button 
              onClick={() => router.push('/survey')}
              className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              설문 다시하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const resultInfo = surveyData.result_types[resultType]
  const recommendedHobbies = getRecommendedHobbies(resultType)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Result Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <span className="text-3xl">
              {resultType === '미술' && '🎨'}
              {resultType === '요리' && '👨‍🍳'}
              {resultType === '운동' && '🏃‍♀️'}
              {resultType === '음악' && '🎵'}
              {resultType === '공예' && '✂️'}
              {resultType === '독서' && '📚'}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-500 mb-4">
            {resultInfo.title}
          </h1>
          
          <div className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {resultInfo.description.split('\n').map((line, index) => (
              <p key={index} className={index > 0 ? 'mt-2' : ''}>
                {line}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              결과 공유하기
            </button>
            
            <button
              onClick={() => router.push('/survey')}
              className="flex items-center gap-2 border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              다시 테스트하기
            </button>
          </div>
        </div>

        {/* Recommended Hobbies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-neutral-500 mb-6">
              당신에게 추천하는 {resultType} 취미
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              설문 결과를 바탕으로 추천하는 취미 활동들을 확인해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recommendedHobbies.map((hobby) => (
              <div 
                key={hobby.id} 
                onClick={() => router.push(`/hobby/${hobby.id}`)}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
              >
                <div className="relative">
                  <div className="overflow-hidden">
                    <img
                      src={hobby.image}
                      alt={hobby.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-500 mb-2 group-hover:text-primary-500 transition-colors">{hobby.title}</h3>
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

          <div className="text-center">
            <button
              onClick={() => router.push(`/search?q=${encodeURIComponent(resultType)}`)}
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-auto"
            >
              {resultType} 카테고리 전체 보기
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <div className="w-full bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-neutral-500 mb-4">
              더 많은 취미를 찾고 싶다면?
            </h3>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              다양한 카테고리의 취미를 탐색하고 새로운 경험을 시작해보세요
            </p>
            <button
              onClick={() => router.push('/search')}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              전체 취미 탐색하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
