-- Create interest_submissions table for InterestModal form
CREATE TABLE IF NOT EXISTS interest_submissions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  interest_reason VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_interest_submissions_created_at ON interest_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_email ON interest_submissions(email);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_interest_reason ON interest_submissions(interest_reason);

-- Enable Row Level Security
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for anonymous users
CREATE POLICY "Enable insert for anonymous users on interest_submissions" ON interest_submissions
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads for authenticated users only
CREATE POLICY "Enable read for authenticated users on interest_submissions" ON interest_submissions
  FOR SELECT 
  TO authenticated 
  USING (true);