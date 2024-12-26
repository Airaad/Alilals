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
 * @property {boolean} [showTerms] - Whether to show terms and conditions below the table
 * @property {boolean} [showBankDetails] - Whether to show bank details table
 */

/**
 * Converts hex color to RGB array
 * @param {string} hex - Hex color code
 * @returns {Array<number>} RGB values array
 */
const hexToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

// Static terms and conditions
const TERMS_AND_CONDITIONS = {
  title: "Terms and Conditions",
  terms: [
    "This estimate is for reference purposes only and is subject to change. The actual charges will be calculated more precisely after the completion of the orchard layout and site evaluation.",
    "The final cost may vary depending on site-specific factors, including but not limited to access to the site, soil conditions and head load.",
    "The estimate covers services and inputs as per the standard orchard development process. Any additional requirements or customisations requested by the client may result in additional charges.",
    "This estimate is valid for 15 days from the date of generation. Beyond this period, revisions may apply based on market rates and resource availability.",
    "Taxes and Duties: The charges mentioned in the estimate are exclusive of applicable taxes and duties unless explicitly stated otherwise.",
    "Service Booking: A revised Estimate will be generated within 7-days of Booking of services based on actual site layout.",
    "This estimate does not constitute a binding agreement. The final charges and terms will be agreed upon in a separate contract following site evaluation and layout finalization.",
  ],
};

// Bank details configuration
const BANK_DETAILS = {
  title: "Bank Transfer Details for Booking:",
  amount: "Booking Amount Rs. 10,000/- per site",
  details: [
    { label: "Bank Name", value: "J&K Bank Ltd" },
    { label: "Branch", value: "Chadoora, Budgam-191113" },
    { label: "Account No", value: "0008 0101 0000 4555" },
    { label: "Title", value: "Alilals Agrico Pvt. Ltd." },
    { label: "IFSC", value: "JAKA0CHADUR" },
  ],
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
  showTerms = false,
  showBankDetails = false,
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

  // Add logo and company name
  const companyName = "Alilals Agrico";
  const logoUrl = "/assets/logo/logo.png";
  const companyNameColor = hexToRGB("#035803");

  doc.addImage(logoUrl, "PNG", 14, 10, 30, 30);
  doc.setFontSize(24);
  doc.setTextColor(...companyNameColor);
  doc.text(companyName, 50, 25);
  currentY += 35;

  // Add title
  doc.setFontSize(20);
  doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
  doc.text(title, 14, currentY);
  currentY += 15;

  // Add date and time if requested
  if (includeDateTime) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Booked on: ${new Date().toLocaleString()}`, 14, currentY);
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

  // Add main data table
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
    didDrawPage: (data) => {
      currentY = data.cursor.y + 10;
    },
  });

  // Handle content overflow to additional pages
  const pageHeight = doc.internal.pageSize.height;
  if (currentY + 20 > pageHeight) {
    doc.addPage();
    currentY = 20;
  }

  // Add terms and conditions if requested
  if (showTerms) {
    const tableEndY = doc.lastAutoTable.finalY || currentY;
    let termsStartY = tableEndY + 15;

    if (termsStartY + TERMS_AND_CONDITIONS.terms.length * 15 > pageHeight) {
      doc.addPage();
      termsStartY = 20;
    }

    // Add terms title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(TERMS_AND_CONDITIONS.title, 14, termsStartY);
    currentY = termsStartY + 10;

    // Add terms content with increased spacing
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);

    TERMS_AND_CONDITIONS.terms.forEach((term, index) => {
      if (currentY + 15 > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
      if (term) {
        doc.text(`${index + 1}. ${term}`, 14, currentY, { maxWidth: 180 });
        currentY += 15; // Increased spacing between terms
      }
    });
  }

  // Add bank details if requested
  if (showBankDetails) {
    if (currentY + 80 > pageHeight) {
      doc.addPage();
      currentY = 20;
    }

    // Add title with green background
    const borderColor = hexToRGB("#035803");
    doc.setFillColor(...borderColor);
    doc.rect(14, currentY, 182, 10, "F");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(
      BANK_DETAILS.title,
      doc.internal.pageSize.width / 2,
      currentY + 7,
      { align: "center" },
    );

    // Add booking amount
    currentY += 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(BANK_DETAILS.amount, doc.internal.pageSize.width / 2, currentY, {
      align: "center",
    });
    currentY += 10;

    // Add simplified bank details table
    autoTable(doc, {
      startY: currentY,
      head: [["Field", "Details"]],
      body: BANK_DETAILS.details.map((item) => [item.label, item.value]),
      theme: "striped",
      styles: {
        fontSize: 10,
        cellPadding: 6,
        lineColor: [3, 88, 3],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      columnStyles: {
        0: {
          fontStyle: "bold",
          cellWidth: 60,
        },
        1: {
          cellWidth: "auto",
        },
      },
      margin: { left: 14, right: 14 },
    });
  }

  // Add footer if provided
  if (footerText) {
    const footerY = pageHeight - 10;
    if (currentY + 10 > footerY) {
      doc.addPage();
      currentY = 20;
    }
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(footerText, 14, footerY);
  }

  // Handle PDF output based on device type
  if (!isIOS()) {
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
  } else {
    doc.save(filename);
  }
};
