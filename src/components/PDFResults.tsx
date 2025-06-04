// src/components/PDFResults.tsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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

interface PDFResultsProps {
  data: SubmissionData;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 14,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  heading: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: "bold",
    borderBottom: "1pt solid #000",
    paddingBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#b7791f",
    marginBottom: 2,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  column: {
    width: "48%",
  },
  fullWidth: {
    marginBottom: 12,
  },
  box: {
    border: "1pt solid #ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    marginTop: 10,
    maxHeight: 300,
  },
});

const PDFResults: React.FC<PDFResultsProps> = ({ data }) => {
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>YMS Crop Capture Submission Summary</Text>

        <View style={styles.box}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Grower / Cooperator:</Text>
              <Text>{grower_name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Dealer / Account Manager:</Text>
              <Text>{dealer_name}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Crop Type:</Text>
              <Text>{crop_type}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Product Used:</Text>
              <Text>{product_used}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Upload Type:</Text>
              <Text>{upload_type}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Timestamp:</Text>
              <Text>{timestamp || "N/A"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Latitude:</Text>
              <Text>{latitude ?? "N/A"}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Longitude:</Text>
              <Text>{longitude ?? "N/A"}</Text>
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Optional Notes:</Text>
            <Text>{notes || "N/A"}</Text>
          </View>
        </View>

        {image_url && (
          <View style={styles.fullWidth}>
            <Text style={styles.label}>Photo Preview:</Text>
            <Image style={styles.image} src={image_url} />
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFResults;
