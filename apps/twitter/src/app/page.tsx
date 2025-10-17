'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { TweetComposer } from '@/components/tweet/TweetComposer'
import { TweetList } from '@/components/tweet/TweetList'

export default function Home() {
  const { data: session, status } = useSession()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTweetCreated = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <MainLayout user={session.user}>
      <div>
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
          <h1 className="text-xl font-bold px-4 py-4">홈</h1>
        </header>

        <TweetComposer 
          userId={session.user.id} 
          onTweetCreated={handleTweetCreated}
        />

        <div className="border-t border-border">
          <TweetList 
            userId={session.user.id} 
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </MainLayout>
  )
}
