import { createClient } from '@supabase/supabase-js'
import { env } from 'process'

// Create a single supabase client for interacting with your database
export const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

