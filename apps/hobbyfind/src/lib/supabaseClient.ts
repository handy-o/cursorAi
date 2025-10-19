import { createClient } from '@supabase/supabase-js'

// 환경변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 환경변수가 없으면 더미 클라이언트 생성
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// 환경변수 존재 여부 확인
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}
