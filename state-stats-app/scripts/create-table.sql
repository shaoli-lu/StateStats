-- State Stats: Supabase Table Creation
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  abbreviation TEXT NOT NULL,
  capital TEXT NOT NULL,
  statehood_date TEXT NOT NULL,
  statehood_order INTEGER NOT NULL,
  area_sq_miles INTEGER NOT NULL,
  population INTEGER NOT NULL,
  population_year INTEGER DEFAULT 2024,
  motto TEXT,
  nickname TEXT,
  flag_description TEXT,
  flower TEXT,
  bird TEXT,
  famous_for TEXT,
  major_employer TEXT,
  political_orientation TEXT,
  senators JSONB DEFAULT '[]',
  representatives_count INTEGER DEFAULT 1,
  state_tax_rate DECIMAL(5,2) DEFAULT 0,
  state_tax_info TEXT,
  flag_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE states ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON states
  FOR SELECT USING (true);
