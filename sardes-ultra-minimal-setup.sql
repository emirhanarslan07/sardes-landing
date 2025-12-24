-- ========================================
-- SARDES ULTRA MINIMAL SETUP - SADECE 2 FORM
-- ========================================

-- 1. INTEREST SUBMISSIONS (Bireysel İlgi - InterestModal)
-- ========================================
CREATE TABLE interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100),
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CLUB APPLICATIONS (Kulüp Başvuruları)
-- ========================================
CREATE TABLE club_applications (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CONTACT MESSAGES (İletişim Formu - mevcut kalabilir)
-- ========================================
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES (Performans için)
-- ========================================
CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX idx_interest_submissions_created_at ON interest_submissions(created_at DESC);
CREATE INDEX idx_interest_submissions_interest_reason ON interest_submissions(interest_reason);

CREATE INDEX idx_club_applications_email ON club_applications(email);
CREATE INDEX idx_club_applications_university ON club_applications(university);
CREATE INDEX idx_club_applications_created_at ON club_applications(created_at DESC);

CREATE INDEX idx_contact_messages_email ON contact_messages(email);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ========================================
-- RLS KAPATILDI (Basitlik için)
-- ========================================
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- ========================================
-- KONTROL
-- ========================================
SELECT 
    tablename,
    schemaname
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;

-- ========================================
-- TEST VERİSİ (Opsiyonel)
-- ========================================
-- INSERT INTO interest_submissions (email, interest_reason) VALUES ('test@sardes.com', 'behavioral_analysis');
-- INSERT INTO club_applications (club_name, university, email) VALUES ('Test Kulübü', 'Test Üniversitesi', 'test@kulup.com');