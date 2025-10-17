import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcryptjs";
import { createPureClient } from "@/src/lib/supabase/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          return null;
        }

        try {
          const supabase = await createPureClient();
          
          const { data: user, error } = await supabase
            .from('realAccount')
            .select('id, username, password, name, email, is_active')
            .eq('username', credentials.id)
            .eq('is_active', true)
            .single();

          if (error || !user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login-idpw",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'kakao') {
        try {
          console.log('🔵 Kakao sign in started');
          console.log('User email:', user.email);
          console.log('Provider account ID:', account.providerAccountId);
          
          const supabase = await createPureClient();
          console.log('🔵 Supabase client created');
          
          const kakaoProfile = profile as any;
          const profileImageUrl = kakaoProfile?.properties?.profile_image || 
                                  kakaoProfile?.kakao_account?.profile?.profile_image_url ||
                                  user.image;
          
          console.log('🔵 Calling upsert_oauth_account...');
          
          // 이메일이 없으면 임시 이메일 생성
          const email = user.email || `kakao_${account.providerAccountId}@kakao.temp`;
          console.log('Final email to use:', email);
          
          const { data, error } = await supabase
            .rpc('upsert_oauth_account', {
              p_email: email,
              p_name: user.name || kakaoProfile?.properties?.nickname || '카카오 사용자',
              p_provider: 'kakao',
              p_provider_account_id: account.providerAccountId,
              p_profile_image_url: profileImageUrl,
            });

          if (error) {
            console.error('❌ Failed to upsert OAuth account:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            return false;
          }

          console.log('✅ User created/updated successfully. UUID:', data);
          user.id = data;
        } catch (error) {
          console.error('❌ Kakao sign in error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        if (token.provider) {
          session.user.provider = token.provider as string;
        }
        if (token.picture) {
          session.user.image = token.picture as string;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      
      if (account?.provider === 'kakao' && user?.email) {
        try {
          const supabase = await createPureClient();
          const { data } = await supabase
            .from('realAccount')
            .select('id, provider, profile_image_url')
            .eq('provider', 'kakao')
            .eq('provider_account_id', account.providerAccountId)
            .single();
          
          if (data) {
            token.sub = data.id;
            token.provider = data.provider;
            token.picture = data.profile_image_url;
          }
        } catch (error) {
          console.error('JWT callback error:', error);
        }
      }
      
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string;
    };
  }

  interface User {
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
  }
}

