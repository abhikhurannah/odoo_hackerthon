import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env from project .env (when running outside Vite)
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

// Table to test can be provided via TEST_TABLE env var or first CLI arg
const table = process.env.TEST_TABLE || process.argv[2] || 'profiles';

if (!url || !key) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(url, key);

(async () => {
  try {
    console.log(`Testing Supabase table: ${table}`);
    const { data, error } = await supabase.from(table).select('id').limit(1);
    if (error) {
      console.error('Supabase query error:', error);
      process.exit(2);
    }
    console.log('Connected to Supabase. Example response:', data);
    process.exit(0);
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    process.exit(3);
  }
})();
