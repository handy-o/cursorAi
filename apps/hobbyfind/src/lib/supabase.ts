// Supabase 클라이언트는 supabaseClient.ts에서 가져옴
export { supabase, isSupabaseConfigured } from './supabaseClient'

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          survey_result_type: string | null
          survey_completed_at: string | null
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          survey_result_type?: string | null
          survey_completed_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          survey_result_type?: string | null
          survey_completed_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          description: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          description?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      hobbies: {
        Row: {
          id: string
          title: string
          description: string | null
          category_id: string | null
          location: string
          price: number
          original_price: number | null
          rating: number
          review_count: number
          max_participants: number
          duration: string | null
          difficulty: string
          materials: string[] | null
          instructor_name: string | null
          instructor_info: string | null
          contact_phone: string | null
          contact_email: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category_id?: string | null
          location: string
          price: number
          original_price?: number | null
          rating?: number
          review_count?: number
          max_participants?: number
          duration?: string | null
          difficulty?: string
          materials?: string[] | null
          instructor_name?: string | null
          instructor_info?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category_id?: string | null
          location?: string
          price?: number
          original_price?: number | null
          rating?: number
          review_count?: number
          max_participants?: number
          duration?: string | null
          difficulty?: string
          materials?: string[] | null
          instructor_name?: string | null
          instructor_info?: string | null
          contact_phone?: string | null
          contact_email?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          hobby_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hobby_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hobby_id?: string
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          user_id: string
          hobby_id: string
          schedule_id: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'refunded'
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          hobby_id: string
          schedule_id?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded'
          total_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          hobby_id?: string
          schedule_id?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'refunded'
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}


