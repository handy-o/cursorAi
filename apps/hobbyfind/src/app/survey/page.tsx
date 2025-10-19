'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SurveyData, SurveyAnswer, SurveyResultType } from '@/types/survey'

export default function SurveyPage() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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

  const handleAnswerSelect = (questionId: number, selectedType: string) => {
    const newAnswer: SurveyAnswer = { questionId, selectedType }
    const updatedAnswers = answers.filter(answer => answer.questionId !== questionId)
    updatedAnswers.push(newAnswer)
    setAnswers(updatedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < (surveyData?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    const typeScores: Record<string, number> = {}
    
    answers.forEach(answer => {
      typeScores[answer.selectedType] = (typeScores[answer.selectedType] || 0) + 1
    })

    const sortedTypes = Object.entries(typeScores)
      .map(([type, score]) => ({ type, score }))
      .sort((a, b) => b.score - a.score)

    const resultType = sortedTypes[0]?.type || '미술'
    
    router.push(`/survey/result?type=${encodeURIComponent(resultType)}`)
  }

  const getCurrentAnswer = () => {
    return answers.find(answer => answer.questionId === surveyData?.questions[currentQuestion]?.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-500">설문 데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!surveyData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-neutral-500">설문 데이터를 불러올 수 없습니다.</p>
            <button 
              onClick={() => router.push('/')}
              className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestionData = surveyData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / surveyData.questions.length) * 100
  const currentAnswer = getCurrentAnswer()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-500 mb-4">
            {surveyData.title}
          </h1>
          <p className="text-lg text-neutral-400 mb-6">
            {surveyData.description}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-neutral-400">
            {currentQuestion + 1} / {surveyData.questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-500 mb-8 text-center">
            {currentQuestionData.question}
          </h2>
          
          <div className="space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionData.id, option.type)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentAnswer?.selectedType === option.type
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-neutral-600 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            이전
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
              !currentAnswer
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {currentQuestion === surveyData.questions.length - 1 ? '결과 보기' : '다음'}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
