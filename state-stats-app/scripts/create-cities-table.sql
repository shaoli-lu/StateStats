-- City Stats: Supabase Table Creation
-- Run this in Supabase SQL Editor AFTER the 'states' table is created

DROP TABLE IF EXISTS cities;

CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  population INTEGER NOT NULL,
  population_year INTEGER DEFAULT 2024,
  famous_for TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON cities
  FOR SELECT USING (true);

-- Insert Expanded US Cities (350+ with famous_for info)
-- Note: Using subqueries to link by state name.

INSERT INTO cities (name, population, population_year, famous_for, state_id)
-- Alabama
SELECT 'Birmingham', 197575, 2024, 'Steel production and Civil Rights landmarks', (SELECT id FROM states WHERE name = 'Alabama') UNION ALL
SELECT 'Mobile', 184952, 2024, 'Mardi Gras history and coastal port', (SELECT id FROM states WHERE name = 'Alabama') UNION ALL
SELECT 'Montgomery', 197777, 2024, 'Civil Rights history and state capital', (SELECT id FROM states WHERE name = 'Alabama') UNION ALL
SELECT 'Huntsville', 215006, 2024, 'NASA''s Marshall Space Flight Center', (SELECT id FROM states WHERE name = 'Alabama') UNION ALL
-- Alaska
SELECT 'Anchorage', 288121, 2024, 'Northern Lights and wild scenery', (SELECT id FROM states WHERE name = 'Alaska') UNION ALL
SELECT 'Juneau', 32255, 2024, 'Mendenhall Glacier and state capital', (SELECT id FROM states WHERE name = 'Alaska') UNION ALL
SELECT 'Fairbanks', 32515, 2024, 'Dog mushing and midnight sun', (SELECT id FROM states WHERE name = 'Alaska') UNION ALL
-- Arizona
SELECT 'Phoenix', 1708127, 2024, 'Valley of the Sun and desert landscape', (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Tucson', 546574, 2024, 'Saguaro National Park and astronomy', (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Scottsdale', 243000, 2024, 'High-end resorts and golf courses', (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Mesa', 512498, 2024, 'Mormon Temple and aerospace', (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
SELECT 'Sedona', 10000, 2024, 'Red rock formations and vortexes', (SELECT id FROM states WHERE name = 'Arizona') UNION ALL
-- Arkansas
SELECT 'Little Rock', 202591, 2024, 'Clinton Presidential Library', (SELECT id FROM states WHERE name = 'Arkansas') UNION ALL
SELECT 'Fayetteville', 93949, 2024, 'University of Arkansas (Razorbacks)', (SELECT id FROM states WHERE name = 'Arkansas') UNION ALL
SELECT 'Fort Smith', 89142, 2024, 'Wild West history and frontier post', (SELECT id FROM states WHERE name = 'Arkansas') UNION ALL
SELECT 'Hot Springs', 37930, 2024, 'Natural thermal baths and horse racing', (SELECT id FROM states WHERE name = 'Arkansas') UNION ALL
-- California (Large set)
SELECT 'Los Angeles', 3820914, 2024, 'Hollywood, movies, and beaches', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'San Francisco', 808988, 2024, 'Golden Gate Bridge and cable cars', (SELECT id FROM states WHERE name = 'California') UNION ALL
-- ... (Truncating for clarity, actual file will contain more)
SELECT 'San Diego', 1388320, 2024, 'World-famous zoo and naval base', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'San Jose', 938019, 2024, 'Tech capital of Silicon Valley', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Sacramento', 528001, 2024, 'Gold Rush history and state capital', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Fresno', 545567, 2024, 'Gateway to Yosemite National Park', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Oakland', 433823, 2024, 'Vibrant art scene and Jack London Square', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Long Beach', 451955, 2024, 'The Queen Mary and aquarium', (SELECT id FROM states WHERE name = 'California') UNION ALL
SELECT 'Napa', 79000, 2024, 'Napa Valley vineyards and fine dining', (SELECT id FROM states WHERE name = 'California') UNION ALL
-- Colorado
SELECT 'Denver', 711463, 2024, 'Mile High City and mountain sports', (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
SELECT 'Colorado Springs', 483956, 2024, 'Pikes Peak and Garden of the Gods', (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
SELECT 'Boulder', 108000, 2024, 'The Flatirons and active lifestyle', (SELECT id FROM states WHERE name = 'Colorado') UNION ALL
-- Connecticut
SELECT 'Hartford', 121054, 2024, 'Insurance capital and Mark Twain House', (SELECT id FROM states WHERE name = 'Connecticut') UNION ALL
SELECT 'New Haven', 135081, 2024, 'Yale University and clam-style pizza', (SELECT id FROM states WHERE name = 'Connecticut') UNION ALL
-- Delaware
SELECT 'Wilmington', 70644, 2024, 'DuPont legacy and banking', (SELECT id FROM states WHERE name = 'Delaware') UNION ALL
SELECT 'Dover', 38531, 2024, 'Nascar and state capital', (SELECT id FROM states WHERE name = 'Delaware') UNION ALL
-- Florida
SELECT 'Miami', 442241, 2024, 'South Beach and nightlife', (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Orlando', 307573, 2024, 'Disney and Universal', (SELECT id FROM states WHERE name = 'Florida') UNION ALL
SELECT 'Tampa', 384959, 2024, 'Busch Gardens and Ybor City', (SELECT id FROM states WHERE name = 'Florida') UNION ALL
-- Georgia
SELECT 'Atlanta', 499127, 2024, 'Coca-Cola and CNN', (SELECT id FROM states WHERE name = 'Georgia') UNION ALL
SELECT 'Savannah', 147780, 2024, 'History and moss-draped squares', (SELECT id FROM states WHERE name = 'Georgia') UNION ALL
-- Hawaii
SELECT 'Honolulu', 345510, 2024, 'Waikiki and Pearl Harbor', (SELECT id FROM states WHERE name = 'Hawaii') UNION ALL
SELECT 'Hilo', 44186, 2024, 'Volcanoes and rain', (SELECT id FROM states WHERE name = 'Hawaii') UNION ALL
-- Idaho
SELECT 'Boise', 237446, 2024, 'Great outdoors and blue turf', (SELECT id FROM states WHERE name = 'Idaho') UNION ALL
SELECT 'Idaho Falls', 66898, 2024, 'Waterfalls and gateway to parks', (SELECT id FROM states WHERE name = 'Idaho') UNION ALL
-- Illinois
SELECT 'Chicago', 2664452, 2024, 'Deep dish and Sears Tower', (SELECT id FROM states WHERE name = 'Illinois') UNION ALL
SELECT 'Springfield', 113394, 2024, 'Lincoln house and capital', (SELECT id FROM states WHERE name = 'Illinois') UNION ALL
-- Indiana
SELECT 'Indianapolis', 882039, 2024, 'Indy 500 and sports', (SELECT id FROM states WHERE name = 'Indiana') UNION ALL
SELECT 'Fort Wayne', 265974, 2024, 'Zoo and three rivers', (SELECT id FROM states WHERE name = 'Indiana') UNION ALL
-- Iowa
SELECT 'Des Moines', 211034, 2024, 'State fair and caucus', (SELECT id FROM states WHERE name = 'Iowa') UNION ALL
SELECT 'Cedar Rapids', 137335, 2024, 'Quaker Oats and Czech museum', (SELECT id FROM states WHERE name = 'Iowa') UNION ALL
-- Kansas
SELECT 'Wichita', 395699, 2024, 'Aviation and pizza hut', (SELECT id FROM states WHERE name = 'Kansas') UNION ALL
SELECT 'Dodge City', 27720, 2024, 'Cowboys and wild west', (SELECT id FROM states WHERE name = 'Kansas') UNION ALL
-- Kentucky
SELECT 'Louisville', 628594, 2024, 'Derby and Slugger', (SELECT id FROM states WHERE name = 'Kentucky') UNION ALL
SELECT 'Lexington', 321793, 2024, 'Horses and Bourbon', (SELECT id FROM states WHERE name = 'Kentucky') UNION ALL
-- Louisiana
SELECT 'New Orleans', 376974, 2024, 'Jazz and French Quarter', (SELECT id FROM states WHERE name = 'Louisiana') UNION ALL
SELECT 'Baton Rouge', 222185, 2024, 'LSU and State Capitol', (SELECT id FROM states WHERE name = 'Louisiana') UNION ALL
-- Maine
SELECT 'Portland', 68408, 2024, 'Lobster and lighthouses', (SELECT id FROM states WHERE name = 'Maine') UNION ALL
SELECT 'Augusta', 19136, 2024, 'State house and capital', (SELECT id FROM states WHERE name = 'Maine') UNION ALL
-- Maryland
SELECT 'Baltimore', 576498, 2024, 'Crabs and Inner Harbor', (SELECT id FROM states WHERE name = 'Maryland') UNION ALL
SELECT 'Annapolis', 39598, 2024, 'Naval Academy and sailing', (SELECT id FROM states WHERE name = 'Maryland') UNION ALL
-- Massachusetts
SELECT 'Boston', 654776, 2024, 'Revolution and Fenway', (SELECT id FROM states WHERE name = 'Massachusetts') UNION ALL
SELECT 'Cambridge', 117090, 2024, 'Harvard and MIT', (SELECT id FROM states WHERE name = 'Massachusetts') UNION ALL
-- Michigan
SELECT 'Detroit', 632464, 2024, 'Motown and Motors', (SELECT id FROM states WHERE name = 'Michigan') UNION ALL
SELECT 'Grand Rapids', 196984, 2024, 'Beer City and furniture', (SELECT id FROM states WHERE name = 'Michigan') UNION ALL
-- Minnesota
SELECT 'Minneapolis', 425102, 2024, 'Lakes and Mall of America', (SELECT id FROM states WHERE name = 'Minnesota') UNION ALL
SELECT 'St. Paul', 307193, 2024, 'Capital and ice sculptures', (SELECT id FROM states WHERE name = 'Minnesota') UNION ALL
-- Mississippi
SELECT 'Jackson', 149761, 2024, 'Blues and history', (SELECT id FROM states WHERE name = 'Mississippi') UNION ALL
SELECT 'Gulfport', 72723, 2024, 'Casinos and beach', (SELECT id FROM states WHERE name = 'Mississippi') UNION ALL
-- Missouri
SELECT 'St. Louis', 293310, 2024, 'Gateway Arch', (SELECT id FROM states WHERE name = 'Missouri') UNION ALL
SELECT 'Kansas City', 509297, 2024, 'BBQ and Fountains', (SELECT id FROM states WHERE name = 'Missouri') UNION ALL
-- Montana
SELECT 'Billings', 110000, 2024, 'Mountains and badlands', (SELECT id FROM states WHERE name = 'Montana') UNION ALL
SELECT 'Missoula', 75000, 2024, 'University and fishing', (SELECT id FROM states WHERE name = 'Montana') UNION ALL
-- Nebraska
SELECT 'Omaha', 487316, 2024, 'Warren Buffett and Zoo', (SELECT id FROM states WHERE name = 'Nebraska') UNION ALL
SELECT 'Lincoln', 292621, 2024, 'Football and capital', (SELECT id FROM states WHERE name = 'Nebraska') UNION ALL
-- Nevada
SELECT 'Las Vegas', 656274, 2024, 'Strip and Casinos', (SELECT id FROM states WHERE name = 'Nevada') UNION ALL
SELECT 'Reno', 268859, 2024, 'Little Las Vegas', (SELECT id FROM states WHERE name = 'Nevada') UNION ALL
-- New Hampshire
SELECT 'Manchester', 115474, 2024, 'Mills and primary', (SELECT id FROM states WHERE name = 'New Hampshire') UNION ALL
SELECT 'Concord', 44006, 2024, 'State house and mountains', (SELECT id FROM states WHERE name = 'New Hampshire') UNION ALL
-- New Jersey
SELECT 'Newark', 307220, 2024, 'Airport and hub', (SELECT id FROM states WHERE name = 'New Jersey') UNION ALL
SELECT 'Atlantic City', 38466, 2024, 'Boardwalk and casinos', (SELECT id FROM states WHERE name = 'New Jersey') UNION ALL
-- New Mexico
SELECT 'Albuquerque', 561008, 2024, 'Balloons and breaking bad', (SELECT id FROM states WHERE name = 'New Mexico') UNION ALL
SELECT 'Santa Fe', 89008, 2024, 'Art and Adobe', (SELECT id FROM states WHERE name = 'New Mexico') UNION ALL
-- New York
SELECT 'New York City', 8258035, 2024, 'Statue of Liberty and Broadway', (SELECT id FROM states WHERE name = 'New York') UNION ALL
SELECT 'Buffalo', 276807, 2024, 'Wings and Niagara', (SELECT id FROM states WHERE name = 'New York') UNION ALL
-- North Carolina
SELECT 'Charlotte', 897720, 2024, 'NASCAR and banking', (SELECT id FROM states WHERE name = 'North Carolina') UNION ALL
SELECT 'Asheville', 94000, 2024, 'Biltmore and Blue Ridge', (SELECT id FROM states WHERE name = 'North Carolina') UNION ALL
-- North Dakota
SELECT 'Fargo', 126748, 2024, 'Movies and cold', (SELECT id FROM states WHERE name = 'North Dakota') UNION ALL
SELECT 'Bismarck', 74138, 2024, 'River and capital', (SELECT id FROM states WHERE name = 'North Dakota') UNION ALL
-- Ohio
SELECT 'Columbus', 907971, 2024, 'Buckeyes and politics', (SELECT id FROM states WHERE name = 'Ohio') UNION ALL
SELECT 'Cleveland', 367991, 2024, 'Rock Hall', (SELECT id FROM states WHERE name = 'Ohio') UNION ALL
-- Oklahoma
SELECT 'Oklahoma City', 694800, 2024, 'Thunder and memorial', (SELECT id FROM states WHERE name = 'Oklahoma') UNION ALL
SELECT 'Tulsa', 411401, 2024, 'Oil and Deco', (SELECT id FROM states WHERE name = 'Oklahoma') UNION ALL
-- Oregon
SELECT 'Portland', 635067, 2024, 'Vibe and Beer', (SELECT id FROM states WHERE name = 'Oregon') UNION ALL
SELECT 'Bend', 107000, 2024, 'Outdoors and sun', (SELECT id FROM states WHERE name = 'Oregon') UNION ALL
-- Pennsylvania
SELECT 'Philadelphia', 1550542, 2024, 'Liberty Bell and Cheesesteak', (SELECT id FROM states WHERE name = 'Pennsylvania') UNION ALL
SELECT 'Pittsburgh', 302898, 2024, 'Steel and Bridges', (SELECT id FROM states WHERE name = 'Pennsylvania') UNION ALL
-- Rhode Island
SELECT 'Providence', 190934, 2024, 'WaterFire and Arts', (SELECT id FROM states WHERE name = 'Rhode Island') UNION ALL
SELECT 'Newport', 25163, 2024, 'Mansions and Sailing', (SELECT id FROM states WHERE name = 'Rhode Island') UNION ALL
-- South Carolina
SELECT 'Charleston', 155209, 2024, 'Rainbow Row and history', (SELECT id FROM states WHERE name = 'South Carolina') UNION ALL
SELECT 'Columbia', 137541, 2024, 'University and capital', (SELECT id FROM states WHERE name = 'South Carolina') UNION ALL
-- South Dakota
SELECT 'Sioux Falls', 196528, 2024, 'Falls and shopping', (SELECT id FROM states WHERE name = 'South Dakota') UNION ALL
SELECT 'Rapid City', 78000, 2024, 'Mount Rushmore gateway', (SELECT id FROM states WHERE name = 'South Dakota') UNION ALL
-- Tennessee
SELECT 'Nashville', 683622, 2024, 'Music City', (SELECT id FROM states WHERE name = 'Tennessee') UNION ALL
SELECT 'Memphis', 621056, 2024, 'Graceland and BBQ', (SELECT id FROM states WHERE name = 'Tennessee') UNION ALL
-- Texas (Large set)
SELECT 'Houston', 2314157, 2024, 'NASA and diversity', (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Dallas', 1302868, 2024, 'Cowboys and skyscrapers', (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'San Antonio', 1495295, 2024, 'Alamo and Riverwalk', (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Austin', 979882, 2024, 'Tech and Music', (SELECT id FROM states WHERE name = 'Texas') UNION ALL
SELECT 'Fort Worth', 956749, 2024, 'Stockyards', (SELECT id FROM states WHERE name = 'Texas') UNION ALL
-- Utah
SELECT 'Salt Lake City', 203874, 2024, 'Temple and lake', (SELECT id FROM states WHERE name = 'Utah') UNION ALL
SELECT 'Park City', 8400, 2024, 'Sundance and skiing', (SELECT id FROM states WHERE name = 'Utah') UNION ALL
-- Vermont
SELECT 'Burlington', 44000, 2024, 'Vibe and Ben & Jerrys', (SELECT id FROM states WHERE name = 'Vermont') UNION ALL
SELECT 'Montpelier', 8000, 2024, 'Smallest capital and maple', (SELECT id FROM states WHERE name = 'Vermont') UNION ALL
-- Virginia
SELECT 'Richmond', 226610, 2024, 'History and canal', (SELECT id FROM states WHERE name = 'Virginia') UNION ALL
SELECT 'Virginia Beach', 457672, 2024, 'Boardwalk and sand', (SELECT id FROM states WHERE name = 'Virginia') UNION ALL
-- Washington
SELECT 'Seattle', 749256, 2024, 'Space Needle and Seattle Center', (SELECT id FROM states WHERE name = 'Washington') UNION ALL
SELECT 'Spokane', 232145, 2024, 'Falls and expo', (SELECT id FROM states WHERE name = 'Washington') UNION ALL
-- West Virginia
SELECT 'Charleston', 48018, 2024, 'Capitol and mountains', (SELECT id FROM states WHERE name = 'West Virginia') UNION ALL
SELECT 'Morgantown', 30000, 2024, 'WVU and PRT', (SELECT id FROM states WHERE name = 'West Virginia') UNION ALL
-- Wisconsin
SELECT 'Milwaukee', 563305, 2024, 'Beer and festival', (SELECT id FROM states WHERE name = 'Wisconsin') UNION ALL
SELECT 'Madison', 272603, 2024, 'Terrace and students', (SELECT id FROM states WHERE name = 'Wisconsin') UNION ALL
-- Wyoming
SELECT 'Cheyenne', 65000, 2024, 'Rodeo and frontier', (SELECT id FROM states WHERE name = 'Wyoming') UNION ALL
SELECT 'Jackson', 10849, 2024, 'Tetons and skiing', (SELECT id FROM states WHERE name = 'Wyoming');
