'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TweetCard } from './TweetCard'
import type { TweetWithProfile } from '@/types'

interface TweetListProps {
  userId: string
  replyToId?: string
  refreshTrigger?: number
  onReplyDeleted?: () => void
  isInModal?: boolean
}

export function TweetList({ userId, replyToId, refreshTrigger, onReplyDeleted, isInModal = false }: TweetListProps) {
  const [tweets, setTweets] = useState<TweetWithProfile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTweets = async () => {
    try {
      const supabase = createClient()
      
      let query = supabase
        .from('tweets')
        .select(`
          *,
          profile:profiles(*)
        `)
        .order('created_at', { ascending: false })

      if (replyToId) {
        query = query.eq('reply_to_id', replyToId)
      } else {
        query = query.is('reply_to_id', null)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching tweets:', error)
        return
      }

      setTweets(data as TweetWithProfile[])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTweets()

    const supabase = createClient()
    
    // 고유한 채널 이름 생성 (타임스탬프 대신 랜덤 ID 사용)
    const channelName = `tweets-${replyToId || 'main'}-${Math.random().toString(36).substr(2, 9)}`
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'tweets'
        },
        (payload) => {
          console.log('[Realtime] Tweets changed:', payload.eventType)
          fetchTweets()
        }
      )
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'likes'
        },
        (payload) => {
          console.log('[Realtime] Likes changed:', payload.eventType)
          fetchTweets()
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Realtime] Connected successfully')
        } else if (status === 'CHANNEL_ERROR') {
          console.warn('[Realtime] Connection error - functionality will continue without realtime updates')
        } else if (status === 'TIMED_OUT') {
          console.warn('[Realtime] Connection timed out')
        } else {
          console.log('[Realtime] Status:', status)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [replyToId, refreshTrigger])

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        로딩 중...
      </div>
    )
  }

  if (tweets.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        {replyToId ? '아직 답글이 없습니다.' : '아직 트윗이 없습니다.'}
      </div>
    )
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          currentUserId={userId}
          onUpdate={() => {
            fetchTweets()
            // 답글이 삭제된 경우 부모 컴포넌트에 알림
            if (replyToId && onReplyDeleted) {
              onReplyDeleted()
            }
          }}
          refreshTrigger={refreshTrigger}
          isInModal={isInModal}
        />
      ))}
    </div>
  )
}

