import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ChannelTalk from '@/components/ChannelTalk'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HobbyFind',
  description: 'Find your perfect hobby',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChannelTalk />
      </body>
    </html>
  )
}

