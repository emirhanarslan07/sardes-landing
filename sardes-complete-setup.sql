-- ========================================
-- SARDES COMPLETE DATABASE SETUP
-- ========================================

-- 1. WAITLIST TABLE (Mevcut)
-- ========================================
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INTEREST SUBMISSIONS TABLE (Yeni - InterestModal için)
-- ========================================
CREATE TABLE IF NOT EXISTS interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100),
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CLUB APPLICATIONS TABLE (Mevcut)
-- ========================================
CREATE TABLE IF NOT EXISTS club_applications (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  member_count VARCHAR(100),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin_profile VARCHAR(500),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CONTACT MESSAGES TABLE (Mevcut)
-- ========================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Waitlist indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Interest submissions indexes
CREATE INDEX IF NOT EXISTS idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_created_at ON interest_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_interest_reason ON interest_submissions(interest_reason);

-- Club applications indexes
CREATE INDEX IF NOT EXISTS idx_club_applications_email ON club_applications(email);
CREATE INDEX IF NOT EXISTS idx_club_applications_created_at ON club_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_club_applications_status ON club_applications(status);
CREATE INDEX IF NOT EXISTS idx_club_applications_university ON club_applications(university);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- ========================================
-- ROW LEVEL SECURITY (RLS) - BASIT VE ÇALIŞIR
-- ========================================

-- Tüm tablolar için RLS'yi devre dışı bırak (basitlik için)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Updated_at otomatik güncelleme fonksiyonu
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
-- TEST DATA (İsteğe bağlı)
-- ========================================

-- Test verisi eklemek isterseniz bu satırları uncomment edin:
-- INSERT INTO waitlist (email, user_type) VALUES ('test@sardes.com', 'individual');
-- INSERT INTO interest_submissions (email, interest_reason) VALUES ('test@sardes.com', 'behavioral_analysis');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Tabloları kontrol et
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN ('waitlist', 'interest_submissions', 'club_applications', 'contact_messages')
ORDER BY tablename;

-- Tablo yapılarını kontrol et
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('waitlist', 'interest_submissions', 'club_applications', 'contact_messages')
ORDER BY table_name, ordinal_position;