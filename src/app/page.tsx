// src/app/page.tsx
"use client";

import React, { useState } from "react";
import PhotoSubmissionForm from "../components/PhotoSubmissionForm";
import ResultsDisplay from "../components/ResultsDisplay";

interface SubmissionData {
  growerName: string;
  dealerName: string;
  cropType: string;
  productUsed: string;
  notes?: string;
  uploadType: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
}

export default function Home() {
  const [submittedData, setSubmittedData] = useState<SubmissionData | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
        YMS Crop Capture
      </h1>
      <div className="max-w-3xl mx-auto">
        <PhotoSubmissionForm onSuccess={setSubmittedData} />
        {submittedData && <ResultsDisplay data={submittedData} />}
      </div>
    </main>
  );
}
