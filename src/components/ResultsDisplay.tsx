// ResultsDisplay.tsx
"use client";

import React from "react";
import Image from "next/image";

interface PhotoData {
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  cropType?: string;
  fieldName?: string;
  notes?: string;
}

interface ResultsDisplayProps {
  photoDataList: PhotoData[];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ photoDataList }) => {
  if (photoDataList.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="section-header-blue">Uploaded Photo Summaries</h2>
      <div className="grid grid-cols-1 gap-6">
        {photoDataList.map((data, index) => (
          <div
            key={index}
            className="card-light p-4 rounded-lg shadow-md border border-gray-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-center items-center">
                {data.imageUrl ? (
                  <Image
                    src={data.imageUrl}
                    alt={`Uploaded photo ${index + 1}`}
                    width={300}
                    height={300}
                    className="rounded-lg object-contain"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="label-yellow">Crop Type</div>
                <div>{data.cropType || "—"}</div>
                <div className="label-yellow">Field Name</div>
                <div>{data.fieldName || "—"}</div>
                <div className="label-yellow">Latitude</div>
                <div>{data.latitude?.toFixed(6) || "—"}</div>
                <div className="label-yellow">Longitude</div>
                <div>{data.longitude?.toFixed(6) || "—"}</div>
                <div className="label-yellow">Timestamp</div>
                <div>{data.timestamp || "—"}</div>
                <div className="label-yellow">Notes</div>
                <div>{data.notes || "—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
