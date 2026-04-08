-- City Stats: Supabase Table Creation
-- Run this in Supabase SQL Editor AFTER the 'states' table is created

DROP TABLE IF EXISTS cities;

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

-- Insert Expanded US Cities
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
SELECT 'San Jose', 938019, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Austin', 979882, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Jacksonville', 985843, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Fort Worth', 956749, 2024, (SELECT id FROM states WHERE name = 'Texas') UNION ALL
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
SELECT 'Baltimore', 569931, 2024, (SELECT id FROM states WHERE name = 'Maryland') UNION ALL
SELECT 'Milwaukee', 563305, 2024, (SELECT id FROM states WHERE name = 'Wisconsin') UNION ALL
SELECT 'Albuquerque', 561008, 2024, (SELECT id FROM states WHERE name = 'New Mexico') UNION ALL
SELECT 'Tucson', 546574, 2024, (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Fresno', 545567, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Sacramento', 528001, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Kansas City', 509297, 2024, (SELECT id FROM states WHERE name = 'Missouri') UNION ALL
SELECT 'Atlanta', 499127, 2024, (SELECT id FROM states WHERE name = 'Georgia') UNION ALL
SELECT 'Miami', 450000, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Raleigh', 476587, 2024, (SELECT id FROM states WHERE name = 'North Carolina') UNION ALL
SELECT 'Omaha', 487316, 2024, (SELECT id FROM states WHERE name = 'Nebraska') UNION ALL
SELECT 'Minneapolis', 425102, 2024, (SELECT id FROM states WHERE name = 'Minnesota') UNION ALL
SELECT 'New Orleans', 376974, 2024, (SELECT id FROM states WHERE name = 'Louisiana') UNION ALL
SELECT 'Cleveland', 367991, 2024, (SELECT id FROM states WHERE name = 'Ohio') UNION ALL
SELECT 'Honolulu', 345510, 2024, (SELECT id FROM states WHERE name = 'Hawaii') UNION ALL
SELECT 'Orlando', 312242, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'St. Louis', 293310, 2024, (SELECT id FROM states WHERE name = 'Missouri') UNION ALL
SELECT 'Pittsburgh', 302898, 2024, (SELECT id FROM states WHERE name = 'Pennsylvania') UNION ALL
SELECT 'Cincinnati', 310111, 2024, (SELECT id FROM states WHERE name = 'Ohio') UNION ALL
SELECT 'Anchorage', 288121, 2024, (SELECT id FROM states WHERE name = 'Alaska') UNION ALL
SELECT 'Buffalo', 276807, 2024, (SELECT id FROM states WHERE name = 'New York') UNION ALL
SELECT 'Madison', 272603, 2024, (SELECT id FROM states WHERE name = 'Wisconsin') UNION ALL
SELECT 'Reno', 268859, 2024, (SELECT id FROM states WHERE name = 'Nevada') UNION ALL
SELECT 'Scottsdale', 243000, 2024, (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Boise', 237446, 2024, (SELECT id FROM states WHERE name = 'Idaho') UNION ALL
SELECT 'Richmond', 226610, 2024, (SELECT id FROM states WHERE name = 'Virginia') UNION ALL
SELECT 'Salt Lake City', 203874, 2024, (SELECT id FROM states WHERE name = 'Utah') UNION ALL
SELECT 'Huntsville', 221933, 2024, (SELECT id FROM states WHERE name = 'Alabama') UNION ALL
SELECT 'Des Moines', 212031, 2024, (SELECT id FROM states WHERE name = 'Iowa') UNION ALL
SELECT 'Little Rock', 202591, 2024, (SELECT id FROM states WHERE name = 'Arkansas') UNION ALL
SELECT 'Providence', 190934, 2024, (SELECT id FROM states WHERE name = 'Rhode Island') UNION ALL
SELECT 'Charleston', 155209, 2024, (SELECT id FROM states WHERE name = 'South Carolina') UNION ALL
SELECT 'Savannah', 147780, 2024, (SELECT id FROM states WHERE name = 'Georgia') UNION ALL
SELECT 'Santa Fe', 89008, 2024, (SELECT id FROM states WHERE name = 'New Mexico') UNION ALL
SELECT 'Asheville', 94000, 2024, (SELECT id FROM states WHERE name = 'North Carolina') UNION ALL
SELECT 'Napa', 79000, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Boulder', 108000, 2024, (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
SELECT 'Bend', 107000, 2024, (SELECT id FROM states WHERE name = 'Oregon') UNION ALL
SELECT 'Portland', 68408, 2024, (SELECT id FROM states WHERE name = 'Maine') UNION ALL
SELECT 'Key West', 26444, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Newport', 25163, 2024, (SELECT id FROM states WHERE name = 'Rhode Island') UNION ALL
SELECT 'Sedona', 10000, 2024, (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Aspen', 7004, 2024, (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
SELECT 'Bar Harbor', 5500, 2024, (SELECT id FROM states WHERE name = 'Maine') UNION ALL
SELECT 'Gettysburg', 7700, 2024, (SELECT id FROM states WHERE name = 'Pennsylvania') UNION ALL
SELECT 'St. Augustine', 15000, 2024, (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Carmel-by-the-Sea', 3800, 2024, (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Park City', 8400, 2024, (SELECT id FROM states WHERE name = 'Utah');
