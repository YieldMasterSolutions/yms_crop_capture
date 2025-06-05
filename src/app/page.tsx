// src/app/page.tsx
"use client";

import React, { useState } from "react";
import PhotoSubmissionForm from "../components/PhotoSubmissionForm";
import ResultsDisplay from "../components/ResultsDisplay";
import PDFDownloadButton from "../components/PDFDownloadButton";
import { SubmissionData } from "../types/submission";

export default function HomePage() {
  const [submittedData, setSubmittedData] = useState<SubmissionData | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        YMS Crop Capture App
      </h1>

      <div className="max-w-3xl mx-auto">
        {/* FIXED: Now uses explicit function to satisfy type */}
        <PhotoSubmissionForm onSuccess={(data) => setSubmittedData(data)} />

        {submittedData && (
          <>
            <ResultsDisplay data={submittedData} />
            <div className="mt-6 text-center">
              <PDFDownloadButton data={submittedData} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
