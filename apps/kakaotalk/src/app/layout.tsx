import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: '카카오톡 채팅방 클론코딩',
  description: '카카오톡과 유사한 채팅방 경험을 제공하는 웹 애플리케이션',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
