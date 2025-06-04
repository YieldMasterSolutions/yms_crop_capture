// src/components/PDFDownloadButton.tsx
"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFResults from "./PDFResults";

interface PDFDownloadButtonProps {
  data: {
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
  };
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ data }) => {
  return (
    <div className="mt-4 flex justify-end">
      <PDFDownloadLink
        document={<PDFResults data={data} />}
        fileName="YMS_Crop_Capture_Submission.pdf"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded"
      >
        {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF Summary")}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFDownloadButton;
