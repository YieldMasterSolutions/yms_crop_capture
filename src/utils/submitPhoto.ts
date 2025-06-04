// src/utils/submitPhoto.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PhotoSubmission {
  grower_name: string;
  dealer_name: string;
  crop_type: string;
  product_used: string;
  notes: string;
  upload_type: "Treated" | "Untreated";
  image_url: string;
  latitude: number;
  longitude: number;
}

export async function submitPhotoData(data: PhotoSubmission): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("photo_submissions").insert([data]);
  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
