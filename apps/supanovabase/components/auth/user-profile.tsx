'use client';

import { useSession, signOut } from 'next-auth/react';
import { User, Mail, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            서비스를 이용하려면 로그인해주세요
          </p>
          <Link
            href="/auth/login-idpw"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  const { user } = session;
  const isOAuthUser = user.provider === 'kakao';

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || '사용자'}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
          {isOAuthUser && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FEE500] rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
              <svg
                width="14"
                height="14"
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
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            {user.name || '사용자'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            환영합니다!
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {user.email && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {user.email}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {isOAuthUser ? '카카오 계정' : '일반 계정'}
          </span>
        </div>

        {user.id && (
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              사용자 ID
            </p>
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate">
              {user.id}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        로그아웃
      </button>
    </div>
  );
}



