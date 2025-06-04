// File: PhotoSubmissionForm.tsx

"use client";

import React, { useState } from "react";
import { extractGPS } from "../utils/exifUtils";
import ResultsDisplay from "./ResultsDisplay";
import { seedTypes, productsSeedTreatment } from "../utils/data";

interface PhotoData {
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  cropType?: string;
  fieldName?: string;
  notes?: string;
  productUsed?: string;
}

const PhotoSubmissionForm: React.FC = () => {
  const [growerName, setGrowerName] = useState("");
  const [repName, setRepName] = useState("");
  const [cropType, setCropType] = useState("");
  const [productUsed, setProductUsed] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [notes, setNotes] = useState("");
  const [treatedPhotos, setTreatedPhotos] = useState<PhotoData[]>([]);
  const [untreatedPhotos, setUntreatedPhotos] = useState<PhotoData[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, isTreated: boolean) => {
    const files = e.target.files;
    if (!files) return;

    const photoDataList: PhotoData[] = await Promise.all(
      Array.from(files).map(async (file) => {
        const gps = await extractGPS(file);
        const timestamp = file.lastModified ? new Date(file.lastModified).toISOString() : undefined;
        return {
          imageUrl: URL.createObjectURL(file),
          latitude: gps?.latitude,
          longitude: gps?.longitude,
          timestamp,
          cropType,
          fieldName,
          notes,
          productUsed,
        };
      })
    );

    isTreated ? setTreatedPhotos(photoDataList) : setUntreatedPhotos(photoDataList);
  };

  const allPhotos = [...untreatedPhotos, ...treatedPhotos];

  return (
    <div className="space-y-8">
      <form className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md space-y-6">
        <h2 className="section-header-blue">YMS Crop Capture Submission</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label-yellow">Grower / Cooperator / Plot Name</label>
            <input value={growerName} onChange={(e) => setGrowerName(e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="label-yellow">YMS Dealer or Account Manager</label>
            <input value={repName} onChange={(e) => setRepName(e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="label-yellow">Crop Type</label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full"
            >
              <option value="">Select Crop</option>
              {seedTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-yellow">Product Used</label>
            <select
              value={productUsed}
              onChange={(e) => setProductUsed(e.target.value)}
              className="w-full"
            >
              <option value="">Select Product</option>
              {productsSeedTreatment.map((p) => (
                <option key={p["Product Name"]} value={p["Product Name"]}>{p["Product Name"]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-yellow">Field Name</label>
            <input value={fieldName} onChange={(e) => setFieldName(e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="label-yellow">Optional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>
        </div>

        <div>
          <label className="section-header-blue">Upload Untreated Control Photos</label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e, false)} />
        </div>

        <div>
          <label className="section-header-blue">Upload Treated Photos</label>
          <input type="file" accept="image/*" multiple onChange={(e) => handleUpload(e, true)} />
        </div>
      </form>

      {allPhotos.length > 0 && <ResultsDisplay photoDataList={allPhotos} />}
    </div>
  );
};

export default PhotoSubmissionForm;
