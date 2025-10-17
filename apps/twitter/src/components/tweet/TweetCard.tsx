'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Heart, MessageCircle, Trash2, Edit } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TweetComposer } from './TweetComposer'
import { TweetList } from './TweetList'
import type { TweetWithProfile } from '@/types'
import { cn } from '@/lib/utils'
import { getUserColor, getUserInitial } from '@/lib/getUserColor'
import Link from 'next/link'

interface TweetCardProps {
  tweet: TweetWithProfile
  currentUserId: string
  onUpdate: () => void
  refreshTrigger?: number
  isInModal?: boolean
}

export function TweetCard({ tweet, currentUserId, onUpdate, refreshTrigger, isInModal = false }: TweetCardProps) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [repliesCount, setRepliesCount] = useState(0)
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [replyRefreshTrigger, setReplyRefreshTrigger] = useState(0)

  const isOwnTweet = tweet.user_id === currentUserId

  // 모든 상태를 DB에서 직접 가져오기
  const fetchAllData = async () => {
    const supabase = createClient()
    
    // 1. 좋아요 상태 확인
    const { data: likeData } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', currentUserId)
      .eq('tweet_id', tweet.id)
      .maybeSingle()
    
    setLiked(!!likeData)

    // 2. 좋아요 수 확인 (실제 카운트)
    const { count: actualLikesCount } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('tweet_id', tweet.id)
    
    setLikesCount(actualLikesCount || 0)

    // 3. 답글 수 확인 (실제 카운트)
    const { count: actualRepliesCount } = await supabase
      .from('tweets')
      .select('*', { count: 'exact', head: true })
      .eq('reply_to_id', tweet.id)
    
    setRepliesCount(actualRepliesCount || 0)
  }

  // 초기 로딩 및 refreshTrigger 변경 시 데이터 가져오기
  useEffect(() => {
    fetchAllData()
  }, [currentUserId, tweet.id, refreshTrigger])

  const handleLike = async () => {
    const supabase = createClient()

    try {
      if (liked) {
        // 좋아요 취소
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', currentUserId)
          .eq('tweet_id', tweet.id)

        if (error) {
          console.error('Error unliking tweet:', error)
          return
        }

        // 트리거가 작동하지 않으면 직접 카운트 업데이트
        await supabase
          .from('tweets')
          .update({ likes_count: Math.max(0, likesCount - 1) })
          .eq('id', tweet.id)

      } else {
        // 좋아요 추가
        const { error } = await supabase
          .from('likes')
          .insert({
            user_id: currentUserId,
            tweet_id: tweet.id,
          })

        if (error) {
          console.error('Error liking tweet:', error)
          return
        }

        // 트리거가 작동하지 않으면 직접 카운트 업데이트
        await supabase
          .from('tweets')
          .update({ likes_count: likesCount + 1 })
          .eq('id', tweet.id)
      }

      // 성공 후 모든 데이터 다시 가져오기
      await fetchAllData()
    } catch (error) {
      console.error('Error in handleLike:', error)
    }
  }

  const handleDelete = async () => {
    if (!confirm('이 트윗을 삭제하시겠습니까?')) return
  
    const supabase = createClient()
    
    try {
      // 답글인 경우 부모 트윗의 replies_count 감소
      if (tweet.reply_to_id) {
        const { data: parentTweet } = await supabase
          .from('tweets')
          .select('replies_count')
          .eq('id', tweet.reply_to_id)
          .single()
        
        if (parentTweet) {
          await supabase
            .from('tweets')
            .update({ replies_count: Math.max(0, (parentTweet.replies_count || 0) - 1) })
            .eq('id', tweet.reply_to_id)
        }
      }
  
      const { error } = await supabase
        .from('tweets')
        .delete()
        .eq('id', tweet.id)
        .eq('user_id', currentUserId)
  
      if (error) {
        console.error('Error deleting tweet:', error)
        alert('트윗 삭제 중 오류가 발생했습니다.')
        return
      }
  
      // 삭제 성공 시 상위 컴포넌트 업데이트
      onUpdate()
    } catch (error) {
      console.error('Error:', error)
      alert('트윗 삭제 중 오류가 발생했습니다.')
    }
  }

  const timeAgo = formatDistanceToNow(new Date(tweet.created_at), {
    addSuffix: true,
    locale: ko,
  })

  // 사용자별 색상 및 이니셜
  const userColor = getUserColor(tweet.user_id)
  const userInitial = getUserInitial(tweet.profile?.display_name, tweet.profile?.username)

  return (
    <>
      <article className={cn(
        "p-4 hover:bg-accent/50 transition-colors",
        !isInModal && "border-b border-border"
      )}>
        <div className="flex gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
            style={{ backgroundColor: userColor }}
          >
            {userInitial}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold hover:underline cursor-pointer">
                {tweet.profile?.display_name || tweet.profile?.username}
              </span>
              <span className="text-muted-foreground text-sm">
                @{tweet.profile?.username}
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">{timeAgo}</span>
            </div>

            <p className="text-base whitespace-pre-wrap break-words mb-3">
              {tweet.content}
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  setReplyRefreshTrigger(prev => prev + 1)
                  setShowReplies(true)
                  setShowReplyDialog(true)
                }}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 pr-0 rounded-full group-hover:bg-primary/10 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-sm">{repliesCount}</span>
              </button>

              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1 transition-colors group",
                  liked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                )}
              >
                <div className="p-2 pr-0 rounded-full group-hover:bg-red-500/10 transition-colors">
                  <Heart className={cn("h-5 w-5", liked && "fill-current")} />
                </div>
                <span className="text-sm">{likesCount}</span>
              </button>

              {isOwnTweet && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors group"
                >
                  <div className="p-2 rounded-full group-hover:bg-destructive/10 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </div>
                </button>
              )}
            </div>

            {repliesCount > 0 && !showReplies && (
              <button
                onClick={() => setShowReplies(true)}
                className="mt-3 text-primary text-sm hover:underline"
              >
                답글 {repliesCount}개 보기
              </button>
            )}

            {showReplies && (
              <div className="mt-3 ml-12 border-l-2 border-border pl-4">
                <button
                  onClick={() => setShowReplies(false)}
                  className="text-primary text-sm hover:underline mb-3 block"
                >
                  답글 숨기기
                </button>
                <TweetList 
                  userId={currentUserId} 
                  replyToId={tweet.id} 
                  refreshTrigger={replyRefreshTrigger}
                  onReplyDeleted={fetchAllData}
                />
              </div>
            )}
          </div>
        </div>
      </article>

      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0">
          <div className="p-6">
            {/* 기존 답글 목록 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">답글</h3>
              <TweetList 
                userId={currentUserId} 
                replyToId={tweet.id} 
                refreshTrigger={replyRefreshTrigger}
                onReplyDeleted={fetchAllData}
                isInModal={true}
              />
            </div>

            {/* 답글 작성 */}
            <div className="border-t border-border pt-4">
              <TweetComposer
                userId={currentUserId}
                placeholder="답글 트윗하기"
                replyToId={tweet.id}
                onTweetCreated={() => {
                  // 답글 리스트 즉시 업데이트
                  setReplyRefreshTrigger(prev => prev + 1)
                  // 카운트 업데이트
                  fetchAllData()
                  onUpdate()
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

