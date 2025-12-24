-- Sardes Landing Page - Simple Database Setup
-- Run this in Supabase SQL Editor

-- 1. Waitlist table (Bireysel kullanıcılar için)
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Club inquiries table (Kulüp başvuruları için)
CREATE TABLE club_inquiries (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  member_count VARCHAR(100),
  linkedin_profile VARCHAR(500),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Interest submissions table (Hero modal ilgi kayıtları için)
CREATE TABLE interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100),
  source VARCHAR(50) DEFAULT 'hero_modal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for simplicity (development mode)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE club_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);
CREATE INDEX idx_club_inquiries_email ON club_inquiries(email);
CREATE INDEX idx_club_inquiries_created_at ON club_inquiries(created_at DESC);
CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX idx_interest_submissions_created_at ON interest_submissions(created_at DESC);

-- Test queries
SELECT 'Setup complete!' as status;
SELECT 'waitlist table ready' as table_name, count(*) as rows FROM waitlist;
SELECT 'club_inquiries table ready' as table_name, count(*) as rows FROM club_inquiries;
SELECT 'interest_submissions table ready' as table_name, count(*) as rows FROM interest_submissions;