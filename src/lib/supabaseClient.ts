import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY ) {
  throw new Error('Missing Supabase environment variables')
}

//  URL first, then key otherwise it won't work
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
  auth : {
    persistSession:true,
    autoRefreshToken: true,
    detectSessionInUrl:true,
  }
});

export type { User, Session, AuthError } from "@supabase/supabase-js";
