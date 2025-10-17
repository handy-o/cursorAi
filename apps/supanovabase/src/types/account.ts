export type Gender = 'male' | 'female' | 'other';

export interface Account {
  id: string;
  name: string;
  nickname: string;
  gender: Gender;
  email: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountInput {
  name: string;
  nickname: string;
  gender: Gender;
  email: string;
  birth_date: string;
}

export interface UpdateAccountInput {
  name?: string;
  nickname?: string;
  gender?: Gender;
  email?: string;
  birth_date?: string;
}


