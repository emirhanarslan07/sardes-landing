-- ========================================
-- SARDES FINAL SETUP - KESİNLEŞMİŞ FORM YAPISI
-- ========================================

-- 1. INTEREST SUBMISSIONS (Bireysel İlgi Formu)
-- ========================================
CREATE TABLE interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100) NOT NULL, -- Artık zorunlu
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CLUB APPLICATIONS (Kulüp Başvuruları)
-- ========================================
CREATE TABLE club_applications (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL, -- Temsilci email
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CONTACT MESSAGES (İletişim Formu - mevcut)
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
-- ÖRNEK VERİ YAPISI
-- ========================================
-- interest_submissions tablosu:
-- | id | email              | interest_reason           | source  | created_at          |
-- |----|--------------------|--------------------------|---------|--------------------|
-- | 1  | user@example.com   | behavioral_analysis      | website | 2025-12-25 10:30  |
-- | 2  | user2@example.com  | realistic_scenarios      | website | 2025-12-25 10:31  |
-- | 3  | user3@example.com  | self_awareness           | website | 2025-12-25 10:32  |
-- | 4  | user4@example.com  | educational_potential    | website | 2025-12-25 10:33  |
-- | 5  | user5@example.com  | exploring                | website | 2025-12-25 10:34  |

-- club_applications tablosu:
-- | id | club_name        | university           | email              | status | created_at          |
-- |----|------------------|--------------------- |--------------------|--------|-------------------- |
-- | 1  | Finans Kulübü    | İstanbul Üniversitesi| kulup@istanbul.edu | new    | 2025-12-25 10:30   |
-- | 2  | Girişim Kulübü   | ODTÜ                 | girisim@metu.edu   | new    | 2025-12-25 10:31   |