import { createClient } from '@/lib/supabase/client';

export interface Category {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
}

export interface Regulation {
  id: string;
  category_id: string;
  title: string;
  content: string;
  sort_order: number;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

export async function getRegulationsByCategory(categoryId: string): Promise<Regulation[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('regulations')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching regulations:', error);
    return [];
  }

  return data || [];
}

export async function getRegulationById(regulationId: string): Promise<Regulation | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('regulations')
    .select('*')
    .eq('id', regulationId)
    .single();

  if (error) {
    console.error('Error fetching regulation:', error);
    return null;
  }

  return data;
}


