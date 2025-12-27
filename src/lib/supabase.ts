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

export interface ClubApplication {
  club_name: string;
  university: string;
  email: string;
}

export interface InterestSubmission {
  email: string;
  interest_reason: string; // Now required
}

// Waitlist function - now uses interest_submissions table
export async function addToWaitlist(data: WaitlistEntry) {
  try {
    console.log('Adding to waitlist (interest_submissions):', data);
    
    // Map user_type to appropriate interest_reason
    const userTypeToInterestMap: Record<string, string> = {
      'student': 'educational_potential',
      'graduate': 'behavioral_analysis', 
      'working': 'realistic_scenarios',
      'other': 'exploring'
    };
    
    const interest_reason = data.user_type ? userTypeToInterestMap[data.user_type] || 'exploring' : 'exploring';
    
    const { data: result, error } = await supabase
      .from('interest_submissions')
      .insert([{
        email: data.email,
        interest_reason: interest_reason,
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

// Club application function
export async function submitClubApplication(data: ClubApplication) {
  try {
    console.log('Submitting club application:', data);
    
    const { data: result, error } = await supabase
      .from('club_applications')
      .insert([data])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Başvuru gönderilirken hata oluştu. Lütfen tekrar deneyin.');
    }

    console.log('Club application success:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Club application error:', error);
    throw error;
  }
}

// Interest submission function
export async function submitInterest(data: InterestSubmission) {
  try {
    console.log('Submitting interest:', data);
    
    const { data: result, error } = await supabase
      .from('interest_submissions')
      .insert([{
        email: data.email,
        interest_reason: data.interest_reason, // Now required
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      
      if (error.code === '23505') {
        throw new Error('Bu email adresi zaten kayıtlı.');
      }
      
      throw new Error('İlgi kaydı sırasında hata oluştu. Lütfen tekrar deneyin.');
    }

    console.log('Interest submission success:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Interest submission error:', error);
    throw error;
  }
}