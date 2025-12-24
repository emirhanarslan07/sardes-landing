-- Geçici olarak RLS'yi kapat (sadece test için)
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;

-- Tabloyu kontrol et
SELECT * FROM interest_submissions;

-- Tablo yapısını kontrol et
\d interest_submissions;