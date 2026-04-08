-- City Stats: Supabase Table Creation
-- Run this in Supabase SQL Editor AFTER the 'states' table is created

CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  population INTEGER NOT NULL,
  population_year INTEGER DEFAULT 2024,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON cities
  FOR SELECT USING (true);

-- Insert Top US Cities (Linking to states by name)
-- Note: This assumes states table is populated.
-- If state name doesn't match exactly, the state_id will be null.

INSERT INTO cities (name, population, population_year, state_id)
SELECT 'New York City', 8258035, 2024, (SELECT id FROM states WHERE name = 'New York') UNION ALL
SELECT 'Los Angeles', 3820914, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Chicago', 2664452, 2024, (SELECT id FROM states WHERE name = 'Illinois') UNION ALL
SELECT 'Houston', 2314157, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Phoenix', 1708127, 2024, (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Philadelphia', 1550542, 2024, (SELECT id FROM states WHERE name = 'Pennsylvania') UNION ALL
SELECT 'San Antonio', 1495295, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'San Diego', 1388320, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Dallas', 1302868, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Jacksonville', 985843, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Austin', 979882, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Fort Worth', 956749, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'San Jose', 938019, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Columbus', 907971, 2024, (SELECT id FROM states WHERE name = 'Ohio') UNION ALL
SELECT 'Charlotte', 897720, 2024, (SELECT id FROM states WHERE name = 'North Carolina') UNION ALL
SELECT 'Indianapolis', 880693, 2024, (SELECT id FROM states WHERE name = 'Indiana') UNION ALL
SELECT 'San Francisco', 808988, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Seattle', 749256, 2024, (SELECT id FROM states WHERE name = 'Washington') UNION ALL
SELECT 'Denver', 711463, 2024, (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
SELECT 'Oklahoma City', 694800, 2024, (SELECT id FROM states WHERE name = 'Oklahoma') UNION ALL
SELECT 'Nashville', 683622, 2024, (SELECT id FROM states WHERE name = 'Tennessee') UNION ALL
SELECT 'El Paso', 678958, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Washington', 671803, 2024, (SELECT id FROM states WHERE name = 'District of Columbia') UNION ALL
SELECT 'Las Vegas', 656274, 2024, (SELECT id FROM states WHERE name = 'Nevada') UNION ALL
SELECT 'Boston', 650706, 2024, (SELECT id FROM states WHERE name = 'Massachusetts') UNION ALL
SELECT 'Portland', 635067, 2024, (SELECT id FROM states WHERE name = 'Oregon') UNION ALL
SELECT 'Louisville', 628594, 2024, (SELECT id FROM states WHERE name = 'Kentucky') UNION ALL
SELECT 'Memphis', 621056, 2024, (SELECT id FROM states WHERE name = 'Tennessee') UNION ALL
SELECT 'Detroit', 620376, 2024, (SELECT id FROM states WHERE name = 'Michigan') UNION ALL
SELECT 'Baltimore', 569931, 2024, (SELECT id FROM states WHERE name = 'Maryland');
