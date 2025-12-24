-- Önce tabloyu kontrol et
SELECT * FROM interest_submissions LIMIT 5;

-- RLS'yi geçici olarak kapat (sadece test için)
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;

-- Manuel test verisi ekle
INSERT INTO interest_submissions (email, interest_reason) 
VALUES ('test@example.com', 'behavioral_analysis');

-- Veri eklenmiş mi kontrol et
SELECT * FROM interest_submissions;