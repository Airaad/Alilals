// utils/pdfGenerator.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

/**
 * Converts hex color to RGB array
 * @param {string} hex - Hex color code
 * @returns {number[]} RGB array
 */
const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

/**
 * Generates a downloadable PDF with the provided data
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
  let currentY = 20; // Track vertical position

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

  // Save the PDF
  doc.save(filename);
};

// Example usage with TypeScript type definition:
/**
 * @example
 * // Basic usage
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
 * // Advanced usage with custom styling
 * generatePDF({
 *   title: "Invoice",
 *   filename: "invoice_123.pdf",
 *   data: [
 *     { label: "Invoice Number", value: "INV-123" },
 *     { label: "Amount", value: "$500" }
 *   ],
 *   styling: {
 *     titleColor: "#000000",
 *     headerColor: "#4a90e2",
 *     alternateRowColor: "#f5f5f5"
 *   },
 *   additionalInfo: {
 *     "Customer ID": "CUST-456",
 *     "Payment Status": "Paid"
 *   },
 *   footerText: "Payment is due within 30 days",
 *   includeDateTime: true
 * });
 */
