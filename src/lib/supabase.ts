import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Debug logging
console.log('Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface WaitlistEntry {
  email: string;
  user_type?: string;
}

export interface ClubInquiry {
  club_name: string;
  university: string;
  contact_name: string;
  email: string;
  member_count?: string;
  linkedin_profile?: string;
  message?: string;
}

// Waitlist function
export async function addToWaitlist(data: WaitlistEntry) {
  try {
    console.log('Adding to waitlist:', data);
    
    const { data: result, error } = await supabase
      .from('waitlist')
      .insert([{
        email: data.email,
        user_type: data.user_type || null,
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      if (error.code === '23505') {
        throw new Error('Bu email adresi zaten kayıtlı.');
      }
      
      throw new Error('Kayıt sırasında hata oluştu. Lütfen tekrar deneyin.');
    }

    console.log('Waitlist success:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Waitlist error:', error);
    throw error;
  }
}

// Club inquiry function
export async function submitClubInquiry(data: ClubInquiry) {
  try {
    console.log('Submitting club inquiry:', data);
    
    const { data: result, error } = await supabase
      .from('club_inquiries')
      .insert([data])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Başvuru gönderilirken hata oluştu. Lütfen tekrar deneyin.');
    }

    console.log('Club inquiry success:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Club inquiry error:', error);
    throw error;
  }
}