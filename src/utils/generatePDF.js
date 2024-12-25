// utils/pdfGenerator.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Checks if the device is running iOS
 * @returns {boolean}
 */
const isIOS = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

/**
 * Configuration object for PDF generation
 * @typedef {Object} PDFConfig
 * @property {string} title - PDF document title
 * @property {string} filename - Name of the PDF file to be downloaded
 * @property {Array<{label: string, value: string | number}>} data - Array of data objects to be displayed in the table
 * @property {Object} [styling] - Optional styling configuration
 * @property {string} [styling.titleColor] - Title color in hex
 * @property {string} [styling.headerColor] - Table header background color in hex
 * @property {string} [styling.alternateRowColor] - Alternate row background color in hex
 * @property {string} [footerText] - Optional footer text
 * @property {boolean} [includeDateTime] - Whether to include date and time in the PDF
 * @property {Object} [additionalInfo] - Any additional information to display before the table
 */

const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

/**
 * Generates a PDF with the provided data and handles device-specific output
 * @param {PDFConfig} config - Configuration object for PDF generation
 */
export const generatePDF = ({
  title,
  filename,
  data,
  styling = {},
  footerText,
  includeDateTime = true,
  additionalInfo = {},
}) => {
  // Initialize default styling
  const defaultStyling = {
    titleColor: "#035803",
    headerColor: "#035803",
    alternateRowColor: "#F6F2EF",
    ...styling,
  };

  // Initialize PDF document
  const doc = new jsPDF();
  let currentY = 20;

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
  doc.text(title, 14, currentY);
  currentY += 15;

  // Add date and time if requested
  if (includeDateTime) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, currentY);
    currentY += 10;
  }

  // Add additional info if provided
  if (Object.keys(additionalInfo).length > 0) {
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    Object.entries(additionalInfo).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 14, currentY);
      currentY += 7;
    });
    currentY += 5;
  }

  // Prepare data for table
  const tableData = data.map((item) => [item.label, item.value]);

  // Add table
  autoTable(doc, {
    startY: currentY,
    head: [["Detail", "Value"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: hexToRGB(defaultStyling.headerColor),
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    alternateRowStyles: {
      fillColor: hexToRGB(defaultStyling.alternateRowColor),
    },
    margin: { top: 10 },
  });

  // Add footer if provided
  if (footerText) {
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(footerText, 14, pageHeight - 10);
  }

  // Handle PDF output based on device type
  if (!isIOS()) {
    // For iOS devices, open in new tab
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  } else {
    // For other devices, trigger download
    doc.save(filename);
  }
};

// Example usage in a component:
/**
 * @example
 * // Basic usage with iOS handling
 * generatePDF({
 *   title: "Booking Details",
 *   filename: "booking_details.pdf",
 *   data: [
 *     { label: "Name", value: "John Doe" },
 *     { label: "Phone", value: "1234567890" }
 *   ],
 *   footerText: "Thank you for your business!"
 * });
 *
 * // Advanced usage with custom blob URL handling
 * const pdfURL = getPDFBlobURL({
 *   title: "Invoice",
 *   filename: "invoice_123.pdf",
 *   data: pdfData
 * });
 * // Use pdfURL as needed (e.g., in an iframe or custom download logic)
 */
