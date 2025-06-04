// src/components/PhotoSubmissionForm.tsx
"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import * as exifr from "exifr";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SubmissionData {
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

interface PhotoSubmissionFormProps {
  onSuccess: (data: SubmissionData) => void;
}

const PhotoSubmissionForm: React.FC<PhotoSubmissionFormProps> = ({ onSuccess }) => {
  const [growerName, setGrowerName] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [cropType, setCropType] = useState("");
  const [productUsed, setProductUsed] = useState("");
  const [uploadType, setUploadType] = useState("Treated");
  const [notes, setNotes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setErrorMessage("");

    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    setSubmitting(true);

    // Step 1: Attempt EXIF extraction
    let latitude: number | null = null;
    let longitude: number | null = null;
    let timestamp: string | null = null;

    try {
      const exifData = await exifr.parse(imageFile, { gps: true });
      latitude = exifData?.latitude ?? null;
      longitude = exifData?.longitude ?? null;
      timestamp = exifData?.DateTimeOriginal
        ? new Date(exifData.DateTimeOriginal).toISOString()
        : null;
    } catch (exifError) {
      console.warn("EXIF data extraction failed:", exifError);
    }

    // Step 2: Upload image to Supabase Storage
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { error: storageError } = await supabase.storage
      .from("canopeo-photos")
      .upload(fileName, imageFile);

    if (storageError) {
      console.error("Image upload failed:", storageError);
      setErrorMessage("Image upload failed. Please try again.");
      setSubmitting(false);
      return;
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/canopeo-photos/${fileName}`;

    // Step 3: Insert metadata into Supabase
    const { error: insertError } = await supabase.from("photo_submissions").insert([
      {
        grower_name: growerName,
        dealer_name: dealerName,
        crop_type: cropType,
        product_used: productUsed,
        notes,
        upload_type: uploadType,
        image_url: imageUrl,
        latitude,
        longitude,
        timestamp,
      },
    ]);

    if (insertError) {
      console.error("Metadata insert failed:", insertError);
      setErrorMessage("Metadata submission failed.");
    } else {
      setSuccess(true);
      onSuccess({
        grower_name: growerName,
        dealer_name: dealerName,
        crop_type: cropType,
        product_used: productUsed,
        notes,
        upload_type: uploadType,
        image_url: imageUrl,
        latitude,
        longitude,
        timestamp,
      });

      // Reset form
      setGrowerName("");
      setDealerName("");
      setCropType("");
      setProductUsed("");
      setUploadType("Treated");
      setNotes("");
      setImageFile(null);
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Submit Field Photo</h2>

      <label className="block mb-2">Grower / Cooperator / Knowledge Plot Name</label>
      <input
        type="text"
        value={growerName}
        onChange={(e) => setGrowerName(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
        required
      />

      <label className="block mb-2">Dealer / Account Manager Name</label>
      <input
        type="text"
        value={dealerName}
        onChange={(e) => setDealerName(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
      />

      <label className="block mb-2">Crop Type</label>
      <select
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
        required
      >
        <option value="">Select Crop</option>
        <option value="Corn">Corn</option>
        <option value="Soybeans">Soybeans</option>
        <option value="Wheat">Wheat</option>
        <option value="Sorghum">Sorghum</option>
        <option value="Other">Other</option>
      </select>

      <label className="block mb-2">Product Used</label>
      <input
        type="text"
        value={productUsed}
        onChange={(e) => setProductUsed(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
        required
      />

      <label className="block mb-2">Upload Type</label>
      <select
        value={uploadType}
        onChange={(e) => setUploadType(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
      >
        <option value="Treated">Treated</option>
        <option value="Untreated">Untreated</option>
      </select>

      <label className="block mb-2">Optional Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800"
      />

      <label className="block mb-2">Photo Upload</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="mb-4"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>

      {success && <p className="text-green-600 mt-4">✅ Submission successful!</p>}
      {errorMessage && <p className="text-red-600 mt-4">❌ {errorMessage}</p>}
    </form>
  );
};

export default PhotoSubmissionForm;
