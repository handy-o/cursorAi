import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // 현재 인증 상태 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('Auth user:', user)
    console.log('Auth error:', authError)
    
    // 간단한 테스트 쿼리
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email')
      .limit(1)

    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error }
    }

    console.log('Supabase connection successful:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Supabase connection error:', error)
    return { success: false, error }
  }
}

export async function testSurveyResultSave(userId: string) {
  try {
    console.log('Testing survey result save for user ID:', userId)
    
    // 현재 인증 상태 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('Current auth user:', user?.id)
    console.log('Target user ID:', userId)
    console.log('User IDs match:', user?.id === userId)
    
    // 먼저대한 프로필이 존재하는지 확인
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, survey_result_type')
      .eq('id', userId)
      .single()

    console.log('Profile check result:', { profileData, profileError })

    if (profileError) {
      console.error('Profile not found:', profileError)
      return { success: false, error: profileError }
    }

    // 실제 업데이트 시도
    const { data, error } = await supabase
      .from('profiles')
      .update({
        survey_result_type: 'test',
        survey_completed_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()

    console.log('Test save result:', { data, error })
    return { success: !error, data, error }
  } catch (error) {
    console.error('Test save error:', error)
    return { success: false, error }
  }
}
