import { createClient } from '@/lib/supabase/client';
import type { Account, CreateAccountInput, UpdateAccountInput } from '@/types/account';

export const accountApi = {
  async getAll() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Account[];
  },

  async getById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Account;
  },

  async getByEmail(email: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data as Account;
  },

  async getByNickname(nickname: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .eq('nickname', nickname)
      .single();

    if (error) throw error;
    return data as Account;
  },

  async create(input: CreateAccountInput) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data as Account;
  },

  async update(id: string, input: UpdateAccountInput) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('account')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Account;
  },

  async delete(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('account')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};


