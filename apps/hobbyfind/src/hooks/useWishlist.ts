'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

interface WishlistItem {
  id: number
  title: string
  location: string
  price: string
  rating: number
  image: string
  category: string
  addedDate: string
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { user } = useAuth()

  // 사용자별 찜한 목록 불러오기
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`hobbyfind-wishlist-${user.id}`)
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      } else {
        setWishlist([])
      }
    } else {
      setWishlist([])
    }
  }, [user])

  // 찜한 목록을 사용자별 로컬 스토리지에 저장
  const saveWishlist = (newWishlist: WishlistItem[]) => {
    if (user) {
      localStorage.setItem(`hobbyfind-wishlist-${user.id}`, JSON.stringify(newWishlist))
      setWishlist(newWishlist)
    }
  }

  // 찜하기 추가
  const addToWishlist = (hobby: Omit<WishlistItem, 'addedDate'>) => {
    const newItem: WishlistItem = {
      ...hobby,
      addedDate: new Date().toLocaleDateString('ko-KR')
    }
    
    const updatedWishlist = [...wishlist, newItem]
    saveWishlist(updatedWishlist)
  }

  // 찜하기 제거
  const removeFromWishlist = (hobbyId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== hobbyId)
    saveWishlist(updatedWishlist)
  }

  // 찜한 상태 확인
  const isWished = (hobbyId: number) => {
    return wishlist.some(item => item.id === hobbyId)
  }

  // 찜하기 토글
  const toggleWishlist = (hobby: Omit<WishlistItem, 'addedDate'>) => {
    if (!user) {
      return // 로그인하지 않은 경우 아무것도 하지 않음
    }
    if (isWished(hobby.id)) {
      removeFromWishlist(hobby.id)
    } else {
      addToWishlist(hobby)
    }
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isWished,
    toggleWishlist
  }
}
