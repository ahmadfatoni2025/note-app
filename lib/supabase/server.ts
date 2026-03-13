import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Minimal Supabase client for file storage only (not for DB queries — use Prisma)
export async function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
