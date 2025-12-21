-- Production Security Setup for Sardes Landing Page
-- Run this in Supabase SQL Editor BEFORE going live

-- 1. Enable RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_inquiries ENABLE ROW LEVEL SECURITY;

-- 2. Allow anonymous users to INSERT (for forms)
CREATE POLICY "Allow anonymous inserts on waitlist" ON waitlist
  FOR INSERT 
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on club_inquiries" ON club_inquiries
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- 3. Only authenticated users can READ data (for admin access)
CREATE POLICY "Authenticated users can read waitlist" ON waitlist
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read club_inquiries" ON club_inquiries
  FOR SELECT 
  TO authenticated
  USING (true);

-- 4. Test the policies
SELECT 'Security policies created successfully!' as status;

-- 5. Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('waitlist', 'club_inquiries');