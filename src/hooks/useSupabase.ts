import { createClient, SupabaseClient } from '@supabase/supabase-js';

const project = process.env.NEXT_PUBLIC_SUPABASE_PROJECT;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseClient: SupabaseClient | null = null;

if (!project || !anonKey) {
  throw new Error('Supabase project and anon key must be provided');
}

if (!supabaseClient) {
  supabaseClient = createClient(
    `https://${project}.supabase.co`,
    anonKey || ''
  );
}

const useSupabase = () => {
  return supabaseClient;
};

export default useSupabase;
