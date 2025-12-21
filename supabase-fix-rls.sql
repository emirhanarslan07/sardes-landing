-- Fix RLS issues for waitlist and club_applications tables

-- OPTION 1: Disable RLS completely (Recommended for development)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- OPTION 2: If you want to keep RLS enabled, use these more permissive policies
-- Uncomment the lines below if you prefer to use RLS

-- First drop existing policies
-- DROP POLICY IF EXISTS "Enable insert for anonymous users" ON waitlist;
-- DROP POLICY IF EXISTS "Enable read for authenticated users" ON waitlist;
-- DROP POLICY IF EXISTS "Enable insert for anonymous users on club_applications" ON club_applications;
-- DROP POLICY IF EXISTS "Enable read for authenticated users on club_applications" ON club_applications;
-- DROP POLICY IF EXISTS "Enable insert for anonymous users on contact_messages" ON contact_messages;
-- DROP POLICY IF EXISTS "Enable read for authenticated users on contact_messages" ON contact_messages;

-- Re-enable RLS
-- ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE club_applications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create more permissive policies
-- CREATE POLICY "Allow all operations on waitlist" ON waitlist FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations on club_applications" ON club_applications FOR ALL USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow all operations on contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Test queries to verify everything works
SELECT 'waitlist table test' as status, count(*) as row_count FROM waitlist;
SELECT 'club_applications table test' as status, count(*) as row_count FROM club_applications;
SELECT 'contact_messages table test' as status, count(*) as row_count FROM contact_messages;

-- Test insert (this should work after running the above)
-- INSERT INTO waitlist (email, user_type) VALUES ('test@example.com', 'student');
-- SELECT * FROM waitlist WHERE email = 'test@example.com';
-- DELETE FROM waitlist WHERE email = 'test@example.com';