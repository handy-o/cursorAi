import { supabase } from './supabase'

export interface SurveyResult {
  resultType: string
  completedAt: Date
}

export async function saveSurveyResult(userId: string, resultType: string): Promise<{ error: Error | null }> {
  try {
    console.log('Saving survey result:', { userId, resultType })
    
    // 먼저 사용자 프로필이 존재하는지 확인
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('id', userId)
      .single()

    console.log('Profile check before save:', { profileData, profileError })

    if (profileError) {
      console.error('Profile not found:', profileError)
      return { error: profileError as Error }
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        survey_result_type: resultType,
        survey_completed_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()

    console.log('Save result:', { data, error })

    if (error) {
      console.error('Error saving survey result:', error)
      return { error }
    }

    if (!data || data.length === 0) {
      console.error('No rows updated - user might not exist or RLS policy issue')
      return { error: new Error('No rows updated') }
    }

    console.log('Survey result saved successfully:', data[0])
    return { error: null }
  } catch (error) {
    console.error('Error saving survey result:', error)
    return { error: error as Error }
  }
}

export async function getSurveyResult(userId: string): Promise<{ data: SurveyResult | null, error: Error | null }> {
  try {
    console.log('Fetching survey result for user:', userId)
    
    const { data, error } = await supabase
      .from('profiles')
      .select('survey_result_type, survey_completed_at')
      .eq('id', userId)
      .single()

    console.log('Fetch result:', { data, error })

    if (error) {
      console.error('Error fetching survey result:', error)
      return { data: null, error }
    }

    if (!data.survey_result_type) {
      console.log('No survey result found for user')
      return { data: null, error: null }
    }

    console.log('Survey result found:', data)
    return {
      data: {
        resultType: data.survey_result_type,
        completedAt: new Date(data.survey_completed_at)
      },
      error: null
    }
  } catch (error) {
    console.error('Error fetching survey result:', error)
    return { data: null, error: error as Error }
  }
}
