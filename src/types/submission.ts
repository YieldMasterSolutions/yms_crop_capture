// src/types/submission.ts
export interface SubmissionData {
  grower_name: string;
  dealer_name: string;
  crop_type: string;
  product_used: string;
  upload_type: string;
  notes: string;
  image_url: string;
  latitude: number | null;
  longitude: number | null;
  timestamp: string | null;
}
