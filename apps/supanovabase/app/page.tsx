'use client';

import Image from "next/image";
import UserProfile from "@/components/auth/user-profile";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <header className="text-center mb-8 sm:mb-12">
          <Image
            className="dark:invert mx-auto mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Supanovabase
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Next.js + Supabase + NextAuth 통합 인증 시스템
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <UserProfile />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                안전한 인증
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                NextAuth와 Supabase를 활용한 보안 인증 시스템
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3.15C5.29688 3.15 2.25 5.48438 2.25 8.325C2.25 10.1719 3.46875 11.7844 5.34375 12.6844L4.59375 15.5156C4.54688 15.7031 4.75781 15.8438 4.92188 15.7312L8.34375 13.3594C8.5625 13.3781 8.78125 13.5 9 13.5C12.7031 13.5 15.75 11.1656 15.75 8.325C15.75 5.48438 12.7031 3.15 9 3.15Z"
                    fill="#000000"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                소셜 로그인
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                카카오 계정으로 간편하게 로그인
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                빠른 구축
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Next.js 15 기반의 최신 풀스택 솔루션
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex gap-4 flex-wrap justify-center">
              <Link
                href="/auth/login-idpw"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                로그인 페이지
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                회원가입
              </Link>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 Supanovabase. Built with Next.js, Supabase & NextAuth</p>
        </footer>
      </div>
    </div>
  );
}
