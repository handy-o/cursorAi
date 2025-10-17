'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import TextareaAutosize from 'react-textarea-autosize'
import { getUserColor, getUserInitial } from '@/lib/getUserColor'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'

interface TweetComposerProps {
  userId: string
  onTweetCreated?: () => void
  placeholder?: string
  replyToId?: string
}

export function TweetComposer({ userId, onTweetCreated, placeholder = "무슨 일이 일어나고 있나요?", replyToId }: TweetComposerProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const userColor = getUserColor(userId)
  const userInitial = getUserInitial(session?.user?.name, session?.user?.email)

  const handleSubmit = async () => {
    if (!content.trim() || loading) return

    setLoading(true)

    try {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('tweets')
        .insert({
          user_id: userId,
          content: content.trim(),
          reply_to_id: replyToId || null,
        })
        .select('id, reply_to_id')
        .single()

      if (error) {
        console.error('Error creating tweet:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        alert(`트윗 작성 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`)
        return
      }

      // 답글인 경우 부모 트윗의 replies_count 직접 업데이트
        if (replyToId && data) {
            // 현재 replies_count를 가져와서 +1
            const { data: parentTweet } = await supabase
            .from('tweets')
            .select('replies_count')
            .eq('id', replyToId)
            .single()
            
            if (parentTweet) {
            await supabase
                .from('tweets')
                .update({ replies_count: (parentTweet.replies_count || 0) + 1 })
                .eq('id', replyToId)
            }
        }

      console.log('[Tweet] Created successfully')
      setContent('')
      onTweetCreated?.()
    } catch (error) {
      console.error('Error:', error)
      alert('트윗 작성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const isOverLimit = content.length > 280

  return (
    <div className="border-b border-border p-4" data-tweet-composer>
      <div className="flex gap-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
          style={{ backgroundColor: userColor }}
        >
          {userInitial}
        </div>
        <div className="flex-1 min-w-0" data-tweet-textarea>
          <TextareaAutosize
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent text-xl placeholder:text-muted-foreground focus:outline-none"
            minRows={replyToId ? 2 : 3}
            maxRows={10}
            disabled={loading}
          />
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {content.length} / 280
              </span>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || loading || isOverLimit}
              size="sm"
              className="rounded-full px-5"
            >
              {loading ? '게시 중...' : replyToId ? '답글' : '게시'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

