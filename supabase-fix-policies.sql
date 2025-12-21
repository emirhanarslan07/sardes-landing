-- Fix RLS Policies - Run this immediately
-- This will fix the form submission errors

-- 1. Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow anonymous inserts on waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts on club_inquiries" ON club_inquiries;
DROP POLICY IF EXISTS "Authenticated users can read waitlist" ON waitlist;
DROP POLICY IF EXISTS "Authenticated users can read club_inquiries" ON club_inquiries;

-- 2. Create correct policies for anonymous users
CREATE POLICY "Enable insert for anon users on waitlist" ON waitlist
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable insert for anon users on club_inquiries" ON club_inquiries
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- 3. Allow authenticated users to read (for admin)
CREATE POLICY "Enable read for authenticated users on waitlist" ON waitlist
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Enable read for authenticated users on club_inquiries" ON club_inquiries
  FOR SELECT 
  TO authenticated
  USING (true);

-- 4. Test insert (this should work now)
SELECT 'Policies fixed! Testing...' as status;

-- Test waitlist insert
INSERT INTO waitlist (email, user_type) VALUES ('policy-test@example.com', 'test');
SELECT 'Waitlist insert works!' as test_result;

-- Clean up test data
DELETE FROM waitlist WHERE email = 'policy-test@example.com';

SELECT 'Fix complete - forms should work now!' as final_status;