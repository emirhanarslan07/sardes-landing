-- İleride RLS eklemek için (şimdi çalıştırma!)
-- Bu kodu ileride kullanıcı sistemi ekleyince çalıştır

-- 1. RLS'yi aktif et
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_inquiries ENABLE ROW LEVEL SECURITY;

-- 2. Anonymous kullanıcılar sadece INSERT yapabilir
CREATE POLICY "Anonymous can insert waitlist" ON waitlist
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anonymous can insert club_inquiries" ON club_inquiries  
  FOR INSERT TO anon WITH CHECK (true);

-- 3. Admin'ler her şeyi görebilir
CREATE POLICY "Admins can read all waitlist" ON waitlist
  FOR SELECT TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can read all club_inquiries" ON club_inquiries
  FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- 4. Kullanıcılar sadece kendi verilerini görebilir (ileride)
-- CREATE POLICY "Users see own data" ON user_profiles
--   FOR SELECT TO authenticated
--   USING (auth.uid() = user_id);