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
 * @property {boolean} [includeTerms] - Whether to include t&c in the PDF
 * @property {Object} customerDetails - Customer details (name, address, phone)
 * @property {string} referenceNo - Reference number
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

// Static bank details
const BANK_DETAILS = {
  title: "Bank Details for Booking",
  desc: "Booking Amount Rs. 10000/- per site",
  details: [
    "Bank Name: Jammu & Kashmir Bank Limited, Chadura",
    "Account Number: 0008010100004555",
    "IFSC Code: JAKA0CHADUR",
    "Account Holder : Alilals Agrico Pvt Ltd",
  ],
};

/**
 * Generates a PDF with the provided data and handles device-specific output
 * @param {PDFConfig} config - Configuration object for PDF generation
 */
export const generateInvoice = ({
  title,
  filename,
  data,
  styling = {},
  includeDateTime = true,
  includeTerms = false,
  customerDetails,
  referenceNo,
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

  // Add green background with logo
  const logoUrl = "/assets/logo/logo.png";
  const companyName = "Alilals Agrico Pvt. Ltd";
  const companyNameColor = [255, 255, 255];
  const bgColor = hexToRGB("#035803");

  // Set the green background
  doc.setFillColor(...bgColor);
  doc.rect(10, 10, 190, 20, "F"); // Green rectangle background

  // Add logo inside the green background
  doc.addImage(logoUrl, "PNG", 12, 12, 14, 14); // Logo inside green background

  // Add company name inside the green background, aligned next to the logo
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...companyNameColor);
  doc.text(companyName, 30, 22);

  // Add static company details below the green background
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0); // Black text for details

  currentY = 35; // Start below the green background
  doc.text(
    "address: H.O: Murad House-56, Pine Lane, Rajbagh Srinagar-190008 J&K",
    14,
    currentY,
  );
  doc.text("Email: info@alilals.com", 120, currentY);
  doc.text("Phone: +91 88998 88983", 160, currentY);
  currentY += 5;
  doc.text(
    "Sub Office: Circular Road, Pulwama, Near Tahab Crossing",
    25,
    currentY,
  );
  doc.text("Website: www.alilals.com", 120, currentY);
  doc.text("GSTIN: 01AAXCA5112D1Z4", 160, currentY);
  currentY += 5;
  doc.text(
    "B.O: Chadoora, Srinagar Road, Opp. Khyber Girls School-191113",
    25,
    currentY,
  );

  currentY += 5;
  doc.setFillColor(...bgColor);
  doc.rect(14, currentY, 182, 0.5, "F");
  currentY += 10;

  // Add customer details
  doc.setFontSize(12);
  doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details:", 14, currentY);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  currentY += 7;
  doc.text(`Name: ${customerDetails.name}`, 14, currentY);

  currentY += 7;
  doc.text(`Address: ${customerDetails.address}`, 14, currentY);

  currentY += 7;
  doc.text(`Phone: ${customerDetails.phone}`, 14, currentY);

  currentY += 7;
  doc.text(`Reference No: ${referenceNo}`, 14, currentY);

  // Add reference number and date/time
  if (includeDateTime) {
    doc.text(`Date: ${new Date().toLocaleString()}`, 140, currentY);
  }

  currentY += 5;
  doc.setFillColor(...bgColor);
  doc.rect(14, currentY, 182, 0.5, "F");
  currentY += 10;

  // Add title
  doc.setFontSize(12);
  doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, currentY);
  currentY += 5;

  // Prepare data for the table
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  // Add main data table with two rows (one for labels, one for values)
  autoTable(doc, {
    startY: currentY,
    body: [
      labels, // First row: labels
      values, // Second row: corresponding values
    ],
    theme: "grid",
    headStyles: {
      fillColor: hexToRGB(defaultStyling.headerColor),
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: hexToRGB(defaultStyling.alternateRowColor),
    },
    margin: { top: 10 },
    didDrawPage: (data) => {
      currentY = data.cursor.y + 5;
    },
  });

  doc.setFillColor(...bgColor);
  doc.rect(14, currentY, 182, 0.5, "F");
  currentY += 10;

  // Add terms and conditions
  if (currentY + 30 > doc.internal.pageSize.height) {
    doc.addPage();
    currentY = 20;
  }

  if (includeTerms) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
    doc.text(TERMS_AND_CONDITIONS.title, 12, currentY);

    currentY += 7;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);

    TERMS_AND_CONDITIONS.terms.forEach((term, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${term}`, 180); // Automatically wrap the text to fit the width

      // Check if the currentY position can accommodate all lines for this term
      lines.forEach((line, lineIndex) => {
        if (currentY + 7 > doc.internal.pageSize.height) {
          doc.addPage();
          currentY = 20;
        }

        // Add the line of the term
        doc.text(line, 14, currentY);
        currentY += 5;
      });
    });

    doc.setFillColor(...bgColor);
    doc.rect(14, currentY, 182, 0.5, "F");
    currentY += 10;

    // Add bank details
    const qr = "/assets/images/alilalsQR.png";
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...hexToRGB(defaultStyling.titleColor));
    doc.addImage(qr, "PNG", 14, currentY - 3, 30, 30);
    doc.text(BANK_DETAILS.title, 50, currentY);
    doc.setFontSize(8);
    doc.text(BANK_DETAILS.desc, 150, currentY);
    currentY += 7;
    doc.setTextColor(0, 0, 0);
    BANK_DETAILS.details.forEach((line) => {
      doc.text(line, 50, currentY);
      currentY += 5;
    });
  }

  // footer
  // Get the page height and calculate the footer position
  const pageHeight = doc.internal.pageSize.height;
  const footerY = pageHeight - 10; // Position it 10 units above the page bottom

  // Add footer text at the bottom center of the page
  const footerText = "This is an auto generated document";
  const footerX = doc.internal.pageSize.width / 2; // Centered horizontally

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150); // Light gray color for the footer

  // Add the footer text
  doc.text(footerText, footerX, footerY, { align: "center" });

  // Handle PDF output based on device type
  if (!isIOS()) {
    const pdfOutput = doc.output("bloburl");
    window.open(pdfOutput, "_blank");
    doc.name = filename;
  } else {
    doc.save(filename);
  }
};
