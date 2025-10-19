'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react'
import { SurveyData, SurveyAnswer, SurveyResultType } from '@/types/survey'
import { useAuth } from '@/hooks/useAuth'
import { getSurveyResult, saveSurveyResult } from '@/lib/surveyApi'
import { testSupabaseConnection, testSurveyResultSave } from '@/lib/testSupabase'

export default function SurveyPage() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSurvey, setShowSurvey] = useState(false)
  const [previousResult, setPreviousResult] = useState<{ resultType: string; completedAt: Date } | null>(null)
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

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

  useEffect(() => {
    const checkPreviousResult = async () => {
      if (user && !authLoading) {
        const { data } = await getSurveyResult(user.id)
        setPreviousResult(data)
      }
    }

    checkPreviousResult()
  }, [user, authLoading])

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

  const calculateResult = async () => {
    const typeScores: Record<string, number> = {}
    
    answers.forEach(answer => {
      typeScores[answer.selectedType] = (typeScores[answer.selectedType] || 0) + 1
    })

    const sortedTypes = Object.entries(typeScores)
      .map(([type, score]) => ({ type, score }))
      .sort((a, b) => b.score - a.score)

    const resultType = sortedTypes[0]?.type || '미술'
    
    // 로그인한 사용자라면 결과를 저장
    if (user) {
      await saveSurveyResult(user.id, resultType)
    }
    
    router.push(`/survey/result?type=${encodeURIComponent(resultType)}`)
  }

  const handleStartSurvey = () => {
    setShowSurvey(true)
  }

  const handleRetakeSurvey = () => {
    setShowSurvey(true)
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleTestSupabase = async () => {
    if (user) {
      await testSupabaseConnection()
      await testSurveyResultSave(user.id)
    }
  }

  const getCurrentAnswer = () => {
    return answers.find(answer => answer.questionId === surveyData?.questions[currentQuestion]?.id)
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-500">데이터를 불러오는 중...</p>
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

  // 설문을 시작하지 않은 상태에서 보여줄 메인 화면
  if (!showSurvey) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-500 mb-4">
              {surveyData.title}
            </h1>
            <p className="text-lg text-neutral-400 mb-8">
              {surveyData.description}
            </p>
          </div>

          {/* 로그인하지 않은 사용자 */}
          {!user && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Play className="h-8 w-8 text-primary-500" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-500 mb-2">
                  취미 유형 테스트 시작하기
                </h2>
                <p className="text-neutral-400 mb-6">
                  간단한 질문을 통해 당신에게 어울리는 취미 유형을 찾아보세요
                </p>
              </div>
              
              <button
                onClick={handleStartSurvey}
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors mb-4"
              >
                시작하기
              </button>
              
              <p className="text-sm text-neutral-400">
                로그인하시면 결과를 저장하고 언제든 다시 볼 수 있어요
              </p>
            </div>
          )}

          {/* 로그인한 사용자 - 이전 결과가 없는 경우 */}
          {user && !previousResult && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <Play className="h-8 w-8 text-primary-500" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-500 mb-2">
                  취미 유형 테스트 시작하기
                </h2>
                <p className="text-neutral-400 mb-6">
                  간단한 질문을 통해 당신에게 어울리는 취미 유형을 찾아보세요
                </p>
              </div>
              
              <button
                onClick={handleStartSurvey}
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                시작하기
              </button>
              
              {/* 디버깅용 버튼 */}
              <button
                onClick={handleTestSupabase}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Supabase 연결 테스트
              </button>
            </div>
          )}

          {/* 로그인한 사용자 - 이전 결과가 있는 경우 */}
          {user && previousResult && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <span className="text-2xl">
                    {previousResult.resultType === '미술' && '🎨'}
                    {previousResult.resultType === '요리' && '👨‍🍳'}
                    {previousResult.resultType === '운동' && '🏃‍♀️'}
                    {previousResult.resultType === '음악' && '🎵'}
                    {previousResult.resultType === '공예' && '✂️'}
                    {previousResult.resultType === '독서' && '📚'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-neutral-500 mb-2">
                  이전 테스트 결과
                </h2>
                <p className="text-neutral-400 mb-4">
                  마지막 테스트에서 <strong>{previousResult.resultType}</strong> 유형이 나왔어요
                </p>
                <p className="text-sm text-neutral-400">
                  {previousResult.completedAt.toLocaleDateString('ko-KR')}에 완료
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push(`/survey/result?type=${encodeURIComponent(previousResult.resultType)}`)}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                >
                  이전 결과 보기
                </button>
                
                <button
                  onClick={handleRetakeSurvey}
                  className="flex items-center gap-2 border-2 border-primary-500 text-primary-500 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  다시 테스트하기
                </button>
              </div>
            </div>
          )}
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
