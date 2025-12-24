-- ========================================
-- SARDES SIMPLE CLEAN SETUP
-- ========================================

-- 1. WAITLIST TABLE
-- ========================================
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INTEREST SUBMISSIONS TABLE (InterestModal için)
-- ========================================
CREATE TABLE interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100),
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CLUB APPLICATIONS TABLE
-- ========================================
CREATE TABLE club_applications (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  member_count VARCHAR(100),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin_profile VARCHAR(500),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CONTACT MESSAGES TABLE
-- ========================================
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX idx_interest_submissions_created_at ON interest_submissions(created_at DESC);

CREATE INDEX idx_club_applications_email ON club_applications(email);
CREATE INDEX idx_club_applications_created_at ON club_applications(created_at DESC);

CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ========================================
-- RLS KAPATILDI (Basitlik için)
-- ========================================
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- ========================================
-- HELPER FUNCTION
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Updated_at trigger'ları
CREATE TRIGGER update_club_applications_updated_at 
    BEFORE UPDATE ON club_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- KONTROL
-- ========================================
SELECT 
    tablename,
    schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;