export type AuthProvider = 'credentials' | 'kakao' | 'google' | 'naver';

export interface RealAccount {
  id: string;
  username: string;
  password: string | null;
  name: string;
  email: string;
  provider: AuthProvider;
  provider_account_id: string | null;
  profile_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OAuthAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  provider: AuthProvider;
  provider_account_id: string;
  profile_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCredentialsAccountInput {
  username: string;
  password: string;
  name: string;
  email: string;
}

export interface UpsertOAuthAccountParams {
  p_email: string;
  p_name: string;
  p_provider: string;
  p_provider_account_id: string;
  p_profile_image_url?: string | null;
}


