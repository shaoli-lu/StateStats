/**
 * Seed script: Insert all 50 US states into Supabase
 * 
 * Usage: node scripts/seed-supabase.mjs
 * 
 * Prerequisites:
 * 1. Run the SQL in scripts/create-table.sql in Supabase SQL Editor first
 * 2. Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars (or edit below)
 */

import { createClient } from '@supabase/supabase-js';

// Import all state data
import { statesAG } from '../src/data/states-ag.js';
import { statesHM } from '../src/data/states-hm.js';
import { statesMN } from '../src/data/states-mn.js';
import { statesNS } from '../src/data/states-ns.js';
import { statesTW } from '../src/data/states-tw.js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://cceejcsqxlaqlgfjrtve.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_publishable_Jln8sPZFHB_x8GAHNz1cAw_7euAeVDc';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const allStates = [
  ...statesAG,
  ...statesHM,
  ...statesMN,
  ...statesNS,
  ...statesTW,
];

async function seed() {
  console.log(`🌱 Seeding ${allStates.length} states into Supabase...`);

  // Upsert in batches of 10 to avoid rate limits
  const batchSize = 10;
  let inserted = 0;

  for (let i = 0; i < allStates.length; i += batchSize) {
    const batch = allStates.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('states')
      .upsert(batch, { onConflict: 'name' });

    if (error) {
      console.error(`❌ Error inserting batch starting at index ${i}:`, error.message);
      console.error('   Details:', error.details);
    } else {
      inserted += batch.length;
      console.log(`  ✅ Inserted batch ${Math.floor(i / batchSize) + 1}: ${batch.map(s => s.abbreviation).join(', ')}`);
    }
  }

  console.log(`\n🎉 Done! ${inserted}/${allStates.length} states seeded successfully.`);
}

seed().catch(console.error);
