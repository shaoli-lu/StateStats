import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cceejcsqxlaqlgfjrtve.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Jln8sPZFHB_x8GAHNz1cAw_7euAeVDc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
