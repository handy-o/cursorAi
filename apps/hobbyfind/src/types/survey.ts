export interface SurveyQuestion {
  id: number
  question: string
  options: SurveyOption[]
}

export interface SurveyOption {
  text: string
  type: string
}

export interface SurveyResult {
  title: string
  description: string
}

export interface SurveyData {
  title: string
  description: string
  questions: SurveyQuestion[]
  result_types: Record<string, SurveyResult>
}

export interface SurveyAnswer {
  questionId: number
  selectedType: string
}

export interface SurveyResultType {
  type: string
  score: number
}

