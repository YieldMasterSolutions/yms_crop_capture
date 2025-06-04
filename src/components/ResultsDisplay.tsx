// src/components/ResultsDisplay.tsx
"use client";

import React from "react";
import { format } from "date-fns";

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

interface ResultsDisplayProps {
  data: SubmissionData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  const {
    grower_name,
    dealer_name,
    crop_type,
    product_used,
    upload_type,
    notes,
    image_url,
    latitude,
    longitude,
    timestamp,
  } = data;

  const formattedTimestamp = timestamp
    ? format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss")
    : "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Submission Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold text-yellow-600">Grower / Cooperator</p>
          <p>{grower_name}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Dealer / Account Manager</p>
          <p>{dealer_name}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Crop Type</p>
          <p>{crop_type}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Product Used</p>
          <p>{product_used}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Upload Type</p>
          <p>{upload_type}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Timestamp</p>
          <p>{formattedTimestamp}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Latitude</p>
          <p>{latitude ?? "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold text-yellow-600">Longitude</p>
          <p>{longitude ?? "N/A"}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="font-semibold text-yellow-600">Optional Notes</p>
          <p>{notes || "N/A"}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="font-semibold text-yellow-600 mb-2">Photo Preview</p>
        <img src={image_url} alt="Uploaded field" className="w-full max-w-lg rounded shadow" />
      </div>
    </div>
  );
};

export default ResultsDisplay;
