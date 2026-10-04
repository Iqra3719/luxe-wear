import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once real Supabase credentials are set (see .env.example / README). */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// `supabase` is null until NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY are set — every
// caller must handle that (see lib/getProducts.ts for the pattern), so the
// site still renders demo products instead of crashing when it isn't
// configured yet.
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

export const PRODUCT_IMAGES_BUCKET = "product-images";
