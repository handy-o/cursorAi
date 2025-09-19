'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Dumbbell, Users, Calendar, FileText, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: '헬스장 소개', href: '/cursorAi/gpt/', icon: Dumbbell },
  { name: '강사진 소개', href: '/cursorAi/gpt/trainers/', icon: Users },
  { name: '수업', href: '/cursorAi/gpt/classes/', icon: Calendar },
  { name: '방문 예약', href: '/cursorAi/gpt/reservation/', icon: FileText },
  { name: '예약 완료', href: '/cursorAi/gpt/reservation/complete/', icon: CheckCircle },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 backdrop-blur-sm"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold font-montserrat">LUXE GYM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-yellow-400 text-gray-800'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="p-4 border-t border-gray-700">
            <Link href="/cursorAi/gpt/reservation/" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold">
                지금 예약하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
