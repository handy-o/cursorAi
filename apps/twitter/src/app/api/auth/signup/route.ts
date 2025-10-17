import { NextResponse } from 'next/server'
import { createPureClient } from '@/lib/supabase/server'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3).max(50),
  displayName: z.string().min(1).max(100),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, username, displayName } = signUpSchema.parse(body)

    const supabase = await createPureClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: '사용자 생성에 실패했습니다.' },
        { status: 400 }
      )
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        username,
        display_name: displayName,
      })

    if (profileError) {
      await supabase.auth.admin.deleteUser(authData.user.id)
      
      if (profileError.code === '23505') {
        return NextResponse.json(
          { error: '이미 사용 중인 이메일 또는 사용자 이름입니다.' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: '프로필 생성에 실패했습니다.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: true, message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}


