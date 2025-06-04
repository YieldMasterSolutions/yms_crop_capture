// File: exifUtils.ts

import * as exifr from 'exifr';

export async function extractGPS(file: File): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  try {
    const gpsData = await exifr.gps(file);
    if (gpsData && gpsData.latitude && gpsData.longitude) {
      return {
        latitude: gpsData.latitude,
        longitude: gpsData.longitude,
      };
    }
    return null;
  } catch (error) {
    console.error("EXIF GPS extraction failed:", error);
    return null;
  }
}
