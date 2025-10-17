'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Bell, Mail, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { getUserColor, getUserInitial } from '@/lib/getUserColor'

const navItems = [
  { icon: Home, label: '홈', href: '/' },
  { icon: Search, label: '검색', href: '/search' },
  { icon: Bell, label: '알림', href: '/notifications' },
  { icon: Mail, label: '메시지', href: '/messages' },
  { icon: User, label: '프로필', href: '/profile' },
]

interface SidebarProps {
  user?: {
    id?: string
    name?: string | null
    email?: string
    image?: string | null
  } | null
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' })
  }

  // 사용자별 색상
  const userColor = user?.id ? getUserColor(user.id) : '#3b82f6'
  const userInitial = getUserInitial(user?.name, user?.email)

  const handleTweetClick = () => {
    // 트윗 작성 영역으로 스크롤 (홈 타이틀에 가려지지 않도록 offset 추가)
    const tweetComposer = document.querySelector('[data-tweet-composer]')
    if (tweetComposer) {
      const elementRect = tweetComposer.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const offset = 80 // 홈 타이틀 높이만큼 offset
      
      window.scrollTo({
        top: absoluteElementTop - offset,
        behavior: 'smooth'
      })
      
      // 깜빡임 효과 추가
      const textareaContainer = tweetComposer.querySelector('[data-tweet-textarea]')
      if (textareaContainer) {
        const textarea = textareaContainer.querySelector('textarea') as HTMLTextAreaElement
        
        // 포커스 및 깜빡임 효과
        setTimeout(() => {
          if (textarea) {
            textarea.focus()
            
            // 깜빡임 효과 (2번 깜빡임) - textarea 배경색으로 적용
            let blinkCount = 0
            const blinkInterval = setInterval(() => {
              // 옅은 하늘색(#e0f2fe)과 투명 배경 번갈아가며
              textarea.style.backgroundColor = blinkCount % 2 === 0 ? '#e0f2fe' : 'transparent'
              blinkCount++
              
              if (blinkCount >= 4) { // 2번 깜빡임 (4번 색상 변경)
                clearInterval(blinkInterval)
                textarea.style.backgroundColor = 'transparent' // 원래 배경으로 복원
              }
            }, 200)
          }
        }, 500)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-[275px] border-r border-border px-4 py-4 sticky top-0">
      <div className="flex flex-col flex-1 gap-2">
        <Link href="/" className="mb-4 px-3">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-primary" aria-hidden="true">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
          </svg>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-full transition-colors hover:bg-accent',
                    isActive && 'font-bold'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xl">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        <Button 
          className="w-full mt-4 h-12 text-base"
          onClick={handleTweetClick}
        >
          트윗하기
        </Button>
      </div>

      {user && (
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-3 rounded-full hover:bg-accent cursor-pointer transition-colors">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: userColor }}
            >
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user.name || user.email}</p>
              <p className="text-sm text-muted-foreground truncate">@{user.email?.split('@')[0]}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full hover:bg-destructive/10 transition-colors"
              title="로그아웃"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

