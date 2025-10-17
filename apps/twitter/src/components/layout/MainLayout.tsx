'use client'

import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
  user?: {
    id?: string
    name?: string | null
    email?: string
    image?: string | null
  } | null
}

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      
      <main className="flex-1 max-w-[600px] border-r border-border">
        {children}
      </main>

      <aside className="w-[350px] px-8 py-4 hidden xl:block">
        <div className="sticky top-4">
          <div className="bg-muted rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">무슨 일이 일어나고 있나요</h2>
            <p className="text-sm text-muted-foreground">새로운 소식이 없습니다</p>
          </div>
        </div>
      </aside>
    </div>
  )
}

