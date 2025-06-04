// File: page.tsx

"use client";

import React from "react";
import PhotoSubmissionForm from "../components/PhotoSubmissionForm";
import ThemeToggle from "../components/ThemeToggle";
import Image from "next/image";

export default function YMSCropCaptureApp() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 space-y-6">
      {/* Header with logos */}
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Image src="/legend-logo.png" alt="Legend Logo" width={120} height={60} />
        <h1 className="text-3xl font-bold text-center flex-1 text-yellow-500 dark:text-yellow-300">
          YMS Crop Capture
        </h1>
        <Image src="/yms-logo.png" alt="YMS Logo" width={120} height={60} />
      </div>

      {/* Theme Toggle */}
      <div className="flex justify-end max-w-6xl mx-auto">
        <ThemeToggle />
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto">
        <PhotoSubmissionForm />
      </div>
    </div>
  );
}
