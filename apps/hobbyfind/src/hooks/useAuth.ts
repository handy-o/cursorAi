'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export interface CustomUser {
  id: string
  email: string
  name: string | null
  phone: string | null
  avatar_url: string | null
  email_verified: boolean
  created_at: string
}

export function useAuth() {
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userId = localStorage.getItem('user_id')
    if (userId) {
      fetchUser(userId)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        localStorage.removeItem('user_id')
        setUser(null)
      } else {
        setUser(data)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      localStorage.removeItem('user_id')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // 먼저 커스텀 함수 시도
      try {
        const { data, error } = await supabase.rpc('login_user', {
          user_email: email,
          user_password: password,
        })

        if (!error && data && data.length > 0 && data[0].success) {
          localStorage.setItem('user_id', data[0].user_id)
          await fetchUser(data[0].user_id)
          return { data: data[0], error: null }
        }
      } catch (rpcError) {
        console.log('Custom auth not available, trying Supabase auth...')
      }

      // 커스텀 함수가 없으면 Supabase 기본 인증 사용
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { data: null, error }
      }

      if (data.user) {
        // Supabase auth 사용자 정보를 profiles 테이블에서 가져오기
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (profileData) {
          setUser(profileData)
        }
        return { data: data.user, error: null }
      }

      return { data: null, error: { message: '로그인에 실패했습니다.' } }
    } catch (error) {
      return { data: null, error: { message: '로그인 중 오류가 발생했습니다.' } }
    }
  }

  const signUp = async (email: string, password: string, name?: string, phone?: string) => {
    try {
      // 먼저 커스텀 함수 시도
      try {
        const { data, error } = await supabase.rpc('signup_user', {
          user_email: email,
          user_password: password,
          user_name: name,
          user_phone: phone,
        })

        if (!error && data && data.length > 0 && data[0].success) {
          return { data: data[0], error: null }
        }
        
        if (error) {
          return { data: null, error }
        }
        
        if (data && data.length > 0 && !data[0].success) {
          return { data: null, error: { message: data[0]?.message || '회원가입에 실패했습니다.' } }
        }
      } catch (rpcError) {
        console.log('Custom signup not available, trying Supabase auth...')
      }

      // 커스텀 함수가 없으면 Supabase 기본 인증 사용
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
          },
        },
      })

      if (error) {
        return { data: null, error }
      }

      return { data: data.user, error: null }
    } catch (error) {
      return { data: null, error: { message: '회원가입 중 오류가 발생했습니다.' } }
    }
  }

  const signOut = async () => {
    localStorage.removeItem('user_id')
    setUser(null)
    return { error: null }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.rpc('request_password_reset', {
        user_email: email,
      })

      return { data: null, error }
    } catch (error) {
      return { data: null, error: { message: '비밀번호 재설정 요청 중 오류가 발생했습니다.' } }
    }
  }

  const verifyEmail = async (email: string, token: string) => {
    try {
      const { error } = await supabase.rpc('verify_email', {
        user_email: email,
        token: token,
      })

      return { data: null, error }
    } catch (error) {
      return { data: null, error: { message: '이메일 확인 중 오류가 발생했습니다.' } }
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    verifyEmail,
  }
}
