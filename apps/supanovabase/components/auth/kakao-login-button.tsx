'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function KakaoLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    setLoading(true);
    try {
      await signIn('kakao', { 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Kakao login error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      disabled={loading}
      className="group relative flex w-full justify-center items-center gap-2 rounded-md bg-[#FEE500] py-2 px-3 text-sm font-semibold text-[#000000] hover:bg-[#FDD835] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEE500] disabled:bg-[#FDD835] disabled:opacity-70"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3.15C5.29688 3.15 2.25 5.48438 2.25 8.325C2.25 10.1719 3.46875 11.7844 5.34375 12.6844L4.59375 15.5156C4.54688 15.7031 4.75781 15.8438 4.92188 15.7312L8.34375 13.3594C8.5625 13.3781 8.78125 13.5 9 13.5C12.7031 13.5 15.75 11.1656 15.75 8.325C15.75 5.48438 12.7031 3.15 9 3.15Z"
          fill="#000000"
        />
      </svg>
      {loading ? '카카오 로그인 중...' : '카카오로 시작하기'}
    </button>
  );
}


