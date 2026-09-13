import { createClient } from "@supabase/supabase-js";
import { MatchedLegalSection } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function searchRegulatorySections(
  queryEmbedding: number[],
  matchThreshold: number = 0.5,
  matchCount: number = 5,
  filterJurisdiction?: string
): Promise<MatchedLegalSection[]> {
  const { data, error } = await supabaseAdmin.rpc("match_legal_sections", {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
    filter_jurisdiction: filterJurisdiction || null,
  });

  if (error) {
    console.error("Vector search RPC error:", error);
    throw new Error(`Failed to match legal sections: ${error.message}`);
  }

  return (data as MatchedLegalSection[]) || [];
}