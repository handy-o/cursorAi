'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Menu, User, Heart, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useWishlist } from '@/hooks/useWishlist'
// import { useProfile } from '@/hooks/useProfile' // 새로운 인증 시스템에서는 useAuth에서 user 정보를 가져옴

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, signOut } = useAuth()
  const { wishlist } = useWishlist()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold text-neutral-500">HobbyMate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="text-neutral-500 hover:text-primary-500 transition-colors">
              탐색
            </Link>
            <Link href="/survey" className="text-neutral-500 hover:text-primary-500 transition-colors">
              취미 찾기
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="취미를 검색하세요 (예: 드로잉)"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden p-2 text-neutral-500 hover:text-primary-500">
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => {
                if (!user) {
                  router.push('/login')
                  return
                }
                router.push('/mypage')
              }}
              className="p-2 text-neutral-500 hover:text-primary-500 relative"
              title={user ? "찜한 취미" : "로그인하여 찜하기 기능 사용"}
            >
              <Heart className="h-5 w-5" />
              {user && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => router.push('/mypage')}
                  className="flex items-center gap-2 p-2 text-neutral-500 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition-colors"
                  title="마이페이지"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block text-sm">
                    {user?.name || user?.email}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-neutral-500 hover:text-primary-500"
                  title="로그아웃"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                로그인
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral-500 hover:text-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="space-y-2">
              <Link href="/search" className="block px-3 py-2 text-neutral-500 hover:text-primary-500">
                탐색
              </Link>
              <Link href="/survey" className="block px-3 py-2 text-neutral-500 hover:text-primary-500">
                취미 찾기
              </Link>
            </div>
            {/* Mobile Search */}
            <div className="mt-4 px-3">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="취미를 검색하세요"
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
