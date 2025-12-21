-- Update existing waitlist table or create new one
DROP TABLE IF EXISTS waitlist;
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated reads" ON waitlist;

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for anonymous users (more permissive)
CREATE POLICY "Enable insert for anonymous users" ON waitlist
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users
CREATE POLICY "Enable read for authenticated users" ON waitlist
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Alternative: If the above doesn't work, you can temporarily disable RLS
-- ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Create contact_messages table for contact form
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

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Enable Row Level Security for contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for anonymous users
CREATE POLICY "Enable insert for anonymous users on contact_messages" ON contact_messages
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Enable read for authenticated users on contact_messages" ON contact_messages
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_messages_updated_at 
    BEFORE UPDATE ON contact_messages 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create club_applications table for club application form
CREATE TABLE IF NOT EXISTS club_applications (
  id SERIAL PRIMARY KEY,
  club_name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  member_count VARCHAR(100),
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  linkedin_profile VARCHAR(500),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_club_applications_created_at ON club_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_club_applications_status ON club_applications(status);
CREATE INDEX IF NOT EXISTS idx_club_applications_email ON club_applications(email);
CREATE INDEX IF NOT EXISTS idx_club_applications_university ON club_applications(university);

-- Enable Row Level Security for club_applications
ALTER TABLE club_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for anonymous users
CREATE POLICY "Enable insert for anonymous users on club_applications" ON club_applications
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Enable read for authenticated users on club_applications" ON club_applications
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create trigger to automatically update updated_at for club_applications
CREATE TRIGGER update_club_applications_updated_at 
    BEFORE UPDATE ON club_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();