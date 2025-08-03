"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaWallet } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ButtonComponent } from "./ButtonComponent";
import { useSuccessDialog } from "@/context/DialogContext";
import { generateInvoice } from "@/utils/generatePDF";
import { addBooking, checkBookingExists } from "@/utils/BookOrchard";
import { getReferenceNo, incrementReferenceNo } from "@/utils/GenerateId";

const BookOrchid = () => {
  // New pricing structure based on the image
  const basicPrices = {
    // Per kanal rates for different row gaps
    perKanalRates: {
      10: 185000, // 10ft gap
      9: 205555, // 9ft gap
      8: 226111, // 8ft gap
    },
    // Add-on variable costs per kanal
    addOnVariableCosts: {
      sideAnchors: {
        10: 1500,
        9: 1666,
        8: 1833,
      },
      crossWire: {
        10: 3000,
        9: 3333,
        8: 3666,
      },
      postCaps: {
        10: 5500,
        9: 6111,
        8: 6722,
      },
      topWireHailNet: {
        10: 3200,
        9: 3555,
        8: 3911,
      },
    },
    // Add-on constant costs (per site order)
    addOnConstantCosts: {
      headerAssembly: 5500,
      venturyInjector: 4500,
      hydrocycloneFilter: 6500,
    },
  };

  const { toast } = useToast();
  const router = useRouter();
  const { openDialog } = useSuccessDialog();

  const formRef = useRef(null);
  const prevPhoneNumberRef = useRef("");

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [landSizeKanals, setLandSizeKanals] = useState("1");
  const [landSizeMarlas, setLandSizeMarlas] = useState("0");

  // Step 2 - Structure Details
  const [rowToRowGap, setRowToRowGap] = useState("");
  const [trellisType, setTrellisType] = useState("");

  // Step 3 - Add-on Services
  const [sideAnchors, setSideAnchors] = useState("");
  const [crossWire, setCrossWire] = useState("");
  const [postCaps, setPostCaps] = useState("");
  const [topWireHailNet, setTopWireHailNet] = useState("");
  const [headerAssembly, setHeaderAssembly] = useState("");
  const [venturyInjector, setVenturyInjector] = useState("");
  const [hydrocycloneFilter, setHydrocycloneFilter] = useState("");

  const [open, setOpen] = useState(false);
  const [disableBookingBtn, setDisableBookingBtn] = useState(false);

  // OTP related states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  //Errors
  const [kanalsError, setKanalsError] = useState(false);
  const [marlasError, setMarlasError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Get base URL from environment or use default
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
  };

  // Handle resend timer
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Send OTP function
  const sendOTP = async () => {
    if (!groverNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number first.",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }

    if (!checkPhoneNumber()) {
      return;
    }

    // Additional validation for Indian mobile numbers
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(groverNumber)) {
      toast({
        title: "Invalid phone number",
        description:
          "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }

    setSendingOtp(true);
    setOtpError("");

    try {
      const response = await fetch(`${getBaseUrl()}/api/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: groverNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setOtpVerified(false);
        setOtp("");
        setResendTimer(60); // 60 seconds cooldown
        toast({
          title: "OTP Sent",
          description: "OTP has been sent to your phone number.",
          className: "bg-green-500 text-white border border-green-700",
        });
      } else {
        setOtpError(data.error || "Failed to send OTP");
        toast({
          title: "Failed to send OTP",
          description: data.error || "Please try again later.",
          className: "bg-red-500 text-white border border-red-700",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Network error. Please try again.");
      toast({
        title: "Network Error",
        description: "Failed to send OTP. Please check your connection.",
        className: "bg-red-500 text-white border border-red-700",
      });
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);
    setOtpError("");

    try {
      const response = await fetch(`${getBaseUrl()}/api/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: groverNumber, otp: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpVerified(true);
        setOtpError("");
        toast({
          title: "Phone Verified",
          description: "Your phone number has been verified successfully.",
          className: "bg-green-500 text-white border border-green-700",
        });
      } else {
        const errorMessage = data.error || "Invalid OTP";
        const remainingAttempts = data.remaining_attempts;
        setOtpError(errorMessage);
        toast({
          title: "Verification Failed",
          description: remainingAttempts
            ? `${errorMessage}. ${remainingAttempts} attempts remaining.`
            : errorMessage,
          className: "bg-red-500 text-white border border-red-700",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Network error. Please try again.");
      toast({
        title: "Network Error",
        description: "Failed to verify OTP. Please check your connection.",
        className: "bg-red-500 text-white border border-red-700",
      });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const fillError = () => {
    toast({
      title: "Action required",
      description: "Please fill out all required fields.",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  const checkName = () => {
    const isValidName = /^[A-Za-z\s]+$/.test(groverName);
    const isLengthValid = groverName.length >= 3;
    if (isValidName && isLengthValid) {
      return true;
    }
    setNameError(true);
    return false;
  };

  const checkPhoneNumber = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(groverNumber);
    if (isValidPhoneNumber) {
      return true;
    }
    setPhoneError(true);
    return false;
  };

  const checkKanal = () => {
    if (Number(landSizeKanals) < 1) {
      setKanalsError(true);
      return false;
    }
    return true;
  };

  const checkMarla = () => {
    if (Number(landSizeMarlas) > 19 || Number(landSizeMarlas) < 0) {
      setMarlasError(true);
      return false;
    }
    return true;
  };

  const goToNext = async () => {
    setNameError(false);
    setPhoneError(false);
    setKanalsError(false);
    setMarlasError(false);
    try {
      if (formStage === 1) {
        if (!checkName() || !checkPhoneNumber()) {
          return;
        }

        // Check if phone number is verified
        if (!otpVerified) {
          toast({
            title: "Phone verification required",
            description:
              "Please verify your phone number with OTP before proceeding.",
            className: "bg-red-500 text-white border border-red-700",
          });
          return;
        }

        const numberExists = await checkBookingExists(groverNumber);

        if (numberExists) {
          toast({
            title: "Phone number already exists",
            description:
              "A booking with this phone number already exists. Choose another number",
            className: "bg-red-500 text-white border border-red-700",
          });
          return;
        }
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error checking phone number",
        description: "An error occurred while checking phone number.",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }
    if (formStage === 1 && (!groverAddress || !groverName || !groverNumber)) {
      fillError();
      return;
    }
    if (formStage === 2 && (!checkKanal() || !checkMarla())) {
      return;
    }
    if (formStage === 2 && !landSizeKanals && !landSizeMarlas) {
      fillError();
      return;
    }
    if (formStage === 2 && (!rowToRowGap || !trellisType)) {
      fillError();
      return;
    }
    setFormStage((prevStep) => Math.min(prevStep + 1, 4));
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const goToPrev = () => {
    setNameError(false);
    setPhoneError(false);
    setKanalsError(false);
    setMarlasError(false);
    setFormStage((prevStep) => Math.max(prevStep - 1, 1));
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateEstimation = () => {
    goToNext();
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    toast({
      title: "Cost Calculated",
      className: "bg-green-500 text-white border border-green-700",
    });
  };

  const handleReset = () => {
    setFormStage(1);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setGroverName("");
    setGroverAddress("");
    setGroverNumber("");
    setLandSizeKanals("1");
    setLandSizeMarlas("0");
    setRowToRowGap("");
    setTrellisType("");
    setSideAnchors("");
    setCrossWire("");
    setPostCaps("");
    setTopWireHailNet("");
    setHeaderAssembly("");
    setVenturyInjector("");
    setHydrocycloneFilter("");
    // Reset OTP states
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setOtpError("");
    setResendTimer(0);
    toast({
      title: "Form Resetted",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  const formatAmount = (amount) => {
    const formatRupee = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

    return formatRupee;
  };

  const totalLand = () => {
    const marlaToKanal = Number(landSizeMarlas) / 20;
    return Number(landSizeKanals) + marlaToKanal;
  };

  // New calculation system based on the image
  const calculateBasicCost = () => {
    if (!rowToRowGap) return 0;
    const perKanalRate = basicPrices.perKanalRates[rowToRowGap];
    return perKanalRate * totalLand();
  };

  const calculateAddOnVariableCosts = () => {
    if (!rowToRowGap) return 0;
    let total = 0;

    if (sideAnchors === "yes") {
      total +=
        basicPrices.addOnVariableCosts.sideAnchors[rowToRowGap] * totalLand();
    }

    if (crossWire === "yes") {
      total +=
        basicPrices.addOnVariableCosts.crossWire[rowToRowGap] * totalLand();
    }

    if (postCaps === "yes") {
      total +=
        basicPrices.addOnVariableCosts.postCaps[rowToRowGap] * totalLand();
    }

    if (topWireHailNet === "yes") {
      total +=
        basicPrices.addOnVariableCosts.topWireHailNet[rowToRowGap] *
        totalLand();
    }

    return total;
  };

  const calculateAddOnConstantCosts = () => {
    let total = 0;

    if (headerAssembly === "yes") {
      total += basicPrices.addOnConstantCosts.headerAssembly;
    }

    if (venturyInjector === "yes") {
      total += basicPrices.addOnConstantCosts.venturyInjector;
    }

    if (hydrocycloneFilter === "yes") {
      total += basicPrices.addOnConstantCosts.hydrocycloneFilter;
    }

    return total;
  };

  const totalPrice = () => {
    const basicCost = calculateBasicCost();
    const variableCosts = calculateAddOnVariableCosts();
    const constantCosts = calculateAddOnConstantCosts();

    return Math.ceil(basicCost + variableCosts + constantCosts);
  };

  // Get quantities based on row gap (from the image)
  const getQuantities = () => {
    const quantities = {
      10: { posts: 18, plants: 150, anchors: 4 },
      9: { posts: 20, plants: 166, anchors: 4.4 },
      8: { posts: 22, plants: 183, anchors: 4.8 },
    };

    return quantities[rowToRowGap] || { posts: 0, plants: 0, anchors: 0 };
  };

  const bookingHandler = async (e) => {
    e.preventDefault();
    setOpen(false);
    toast({
      title: "Sending Booking...",
      description: "Please wait for a moment.",
      className: "bg-yellow-500 text-white border border-yellow-700",
    });

    const referenceNo = await getReferenceNo();

    if (!referenceNo) {
      toast({
        title: "Failed to book orchard",
        description: "An error occurred while generating reference number",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }

    const quantities = getQuantities();
    const totalPosts = Math.ceil(quantities.posts * totalLand());
    const totalPlants = Math.ceil(quantities.plants * totalLand());
    const totalAnchors = Math.ceil(quantities.anchors * totalLand());

    // For Storing to firestore
    const orchardData = {
      name: groverName,
      address: groverAddress,
      phone: groverNumber,
      totalLand: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      rowToRowGap: rowToRowGap,
      trellisType: trellisType,
      sideAnchors: sideAnchors,
      crossWire: crossWire,
      postCaps: postCaps,
      topWireHailNet: topWireHailNet,
      headerAssembly: headerAssembly,
      venturyInjector: venturyInjector,
      hydrocycloneFilter: hydrocycloneFilter,
      totalPosts: totalPosts,
      totalPlants: totalPlants,
      totalAnchors: totalAnchors,
      estimatedCost: formatAmount(totalPrice()),
      referenceNo: referenceNo,
    };

    // For creating PDF - separate main data and add-on services
    const mainPdfData = [
      {
        label: "Total Land",
        value: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      },
      { label: "Row-to-Row Gap", value: `${rowToRowGap} ft` },
      { label: "Trellis Type", value: trellisType },
      {
        label: "Total Posts",
        value: `${totalPosts} posts`,
      },
      {
        label: "Total Plants",
        value: `${totalPlants} plants`,
      },
      {
        label: "Total Anchors",
        value: `${totalAnchors} anchors`,
      },
      { label: "Estimated Cost", value: formatAmount(totalPrice()).slice(1) },
    ];

    // Add-on services data
    const addOnPdfData = [];
    if (sideAnchors === "yes") {
      addOnPdfData.push({ label: "Side Anchors", value: "Yes" });
    }
    if (crossWire === "yes") {
      addOnPdfData.push({ label: "Cross Wire", value: "Yes" });
    }
    if (postCaps === "yes") {
      addOnPdfData.push({ label: "Post Caps", value: "Yes" });
    }
    if (topWireHailNet === "yes") {
      addOnPdfData.push({ label: "Top-wire for Hail Net", value: "Yes" });
    }
    if (headerAssembly === "yes") {
      addOnPdfData.push({ label: "Header Assembly", value: "Yes" });
    }
    if (venturyInjector === "yes") {
      addOnPdfData.push({
        label: "Ventury Injector/Fertigation Tank",
        value: "Yes",
      });
    }
    if (hydrocycloneFilter === "yes") {
      addOnPdfData.push({ label: "Hydrocyclone Filter", value: "Yes" });
    }

    setDisableBookingBtn(true);

    const bookingResult = await addBooking(orchardData);

    if (bookingResult.success) {
      setDisableBookingBtn(false);
      openDialog();
      router.push("/");

      generateInvoice({
        title: "Orchard Estimation",
        filename: `${referenceNo}.pdf`,
        data: mainPdfData,
        addOnData: addOnPdfData,
        referenceNo: referenceNo,
        includeDateTime: true,
        includeEstTerms: true,
        includeBanking: true,
        customerDetails: {
          name: groverName,
          address: groverAddress,
          phone: groverNumber,
        },
        toast: toast,
      });

      await incrementReferenceNo();
    } else {
      setDisableBookingBtn(false);
      toast({
        title: "Failed to send booking",
        description: bookingResult.message,
        className: "bg-red-500 text-white border border-red-700",
      });
    }
  };

  return (
    <div>
      <div ref={formRef} className="font-[Raleway] mb-10">
        <b>
          Before we book your orchard, you must be curious about the cost to set
          up your agricultural field?
        </b>{" "}
        Our easy-to-use cost estimator tool helps you get an instant estimate
        for your field setup. Simply enter the details about your land and
        requirements, and the calculator will provide an almost precise quote.
      </div>

      <div className="md:h-[55rem] bg-[#F6F2EF] rounded-xl relative shadow-lg">
        <div className="grid grid-cols-4 bg-white border rounded-t-xl mb-10 shadow-sm">
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] rounded-tl-xl transition-all duration-300 ${formStage === 1 ? "bg-[#035803] text-white shadow-lg" : "bg-white hover:bg-gray-50"}`}
          >
            Customer Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] transition-all duration-300 ${formStage === 2 ? "bg-[#035803] text-white shadow-lg" : "bg-white hover:bg-gray-50"}`}
          >
            Structure Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] transition-all duration-300 ${formStage === 3 ? "bg-[#035803] text-white shadow-lg" : "bg-white hover:bg-gray-50"}`}
          >
            Add-on Services
          </div>
          <div
            className={`rounded-tr-xl text-xs md:text-sm px-5 py-3 border border-[#035803] transition-all duration-300 ${formStage === 4 ? "bg-[#035803] text-white shadow-lg" : "bg-white hover:bg-gray-50"}`}
          >
            Estimated Cost
          </div>
        </div>

        {/* Scrollable form container */}
        <div className="h-[42rem] overflow-y-auto px-10 pb-24">
          {/* Form step 1 */}
          <form className={`py-10 ${formStage === 1 ? "" : "hidden"}`}>
            <label htmlFor="groverName">
              Name<span className="text-red-500">*</span>
            </label>
            <Input
              className="bg-white my-2 lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
              type="text"
              placeholder="Enter Name"
              id="groverName"
              value={groverName}
              onChange={(e) => setGroverName(e.target.value)}
            />
            <p
              className={`${nameError ? "" : "invisible"} mb-2 text-red-500 text-sm`}
            >
              Name should be greater than 3 characters and only contain
              alphabets
            </p>
            <label htmlFor="groverAddress">
              Address<span className="text-red-500">*</span>
            </label>
            <Input
              className="bg-white mb-10 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
              type="text"
              placeholder="Enter Address"
              id="groverAddress"
              value={groverAddress}
              onChange={(e) => setGroverAddress(e.target.value)}
            />
            <label htmlFor="groverNumber">
              Phone Number<span className="text-red-500">*</span>
              {otpVerified && (
                <span className="ml-2 text-green-600 text-sm">✓ Verified</span>
              )}
              {sendingOtp && (
                <span className="ml-2 text-blue-600 text-sm">
                  📤 Sending OTP...
                </span>
              )}
              {verifyingOtp && (
                <span className="ml-2 text-blue-600 text-sm">
                  🔍 Verifying...
                </span>
              )}
            </label>
            <div className="flex gap-2">
              <Input
                className={`bg-white mb-2 mt-2 lg:w-1/2 border rounded-lg focus:outline-none shadow-sm transition-all duration-200 hover:shadow-md ${
                  otpVerified
                    ? "border-green-500 focus:border-green-600"
                    : "border-gray-300 focus:border-[#44A05B]"
                }`}
                type="text"
                placeholder="Enter Phone Number"
                id="groverNumber"
                value={groverNumber}
                onChange={(e) => {
                  const newNumber = e.target.value;
                  setGroverNumber(newNumber);
                  // Reset OTP verification if phone number changes
                  if (
                    newNumber !== prevPhoneNumberRef.current &&
                    prevPhoneNumberRef.current !== ""
                  ) {
                    setOtpSent(false);
                    setOtpVerified(false);
                    setOtp("");
                    setOtpError("");
                    setResendTimer(0);
                  }
                  prevPhoneNumberRef.current = newNumber;
                }}
                disabled={sendingOtp || verifyingOtp || otpVerified}
              />
              <Button
                type="button"
                onClick={sendOTP}
                className={`font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                  otpVerified
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={
                  sendingOtp || verifyingOtp || !groverNumber || otpVerified
                }
              >
                {otpVerified
                  ? "Verified"
                  : sendingOtp
                    ? "Sending..."
                    : "Send OTP"}
              </Button>
            </div>
            <p
              className={`${phoneError ? "" : "invisible"} mb-4 md:mb-2 text-red-500 text-sm`}
            >
              Enter valid 10 digit phone number
            </p>
            {otpSent && !otpVerified && (
              <div className="">
                <label htmlFor="otp">
                  OTP<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    className="bg-white mb-2 mt-2 lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    id="otp"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setOtp(value);
                    }}
                    maxLength={6}
                    disabled={verifyingOtp}
                  />
                  <Button
                    type="button"
                    onClick={verifyOTP}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                    disabled={verifyingOtp || !otp || otp.length !== 6}
                  >
                    {verifyingOtp ? "Verifying..." : "Verify OTP"}
                  </Button>
                </div>
                <p
                  className={`${otpError ? "" : "invisible"} mb-2 text-red-500 text-sm`}
                >
                  {otpError}
                </p>
                <div className="flex items-center gap-4 mb-40 md:mb-20">
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit OTP sent to your phone number
                  </p>
                  {resendTimer > 0 ? (
                    <span className="text-sm text-gray-500">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <Button
                      type="button"
                      onClick={sendOTP}
                      variant="link"
                      className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm"
                      disabled={sendingOtp}
                    >
                      {sendingOtp ? "Sending..." : "Resend OTP"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </form>

          {/* Form step 2 - Structure Details */}
          <form className={`py-10 ${formStage === 2 ? "" : "hidden"}`}>
            <label htmlFor="landSizeKanals">
              Land Area<span className="text-red-500">*</span>{" "}
              <span className="text-sm text-gray-500">(Kanals)</span>
            </label>
            <Input
              className="bg-white mb-2 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
              type="number"
              placeholder="Enter Land Size"
              id="landSizeKanals"
              value={landSizeKanals}
              min={1}
              onChange={(e) => setLandSizeKanals(e.target.value)}
            />
            <p
              className={`${kanalsError ? "" : "invisible"} mb-5 text-red-500 text-sm`}
            >
              Enter minimum 1 kanal
            </p>

            <label htmlFor="landSizeMarlas">
              Land Area<span className="text-red-500">*</span>{" "}
              <span className="text-sm text-gray-500">(Marlas)</span>
            </label>
            <Input
              className="bg-white mb-2 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
              type="number"
              placeholder="Enter Land Size"
              id="landSizeMarlas"
              value={landSizeMarlas}
              min={0}
              max={19}
              onChange={(e) => setLandSizeMarlas(e.target.value)}
            />
            <p
              className={`${marlasError ? "" : "invisible"} mb-5 text-red-500 text-sm`}
            >
              Marlas should be between 0-19 only
            </p>

            <div className="mb-8 md:text-xl text-green-700">
              Total Land: {landSizeKanals ? `${landSizeKanals} Kanals ` : ""}
              {landSizeMarlas ? `${landSizeMarlas} Marlas` : ""}
            </div>

            <label htmlFor="rowToRowGap">
              Row-to-Row Gap<span className="text-red-500">*</span>{" "}
              <span className="text-sm text-gray-500">(ft)</span>
            </label>
            <Select value={rowToRowGap} onValueChange={setRowToRowGap} required>
              <SelectTrigger className="bg-white lg:w-1/3 mb-8 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md">
                <SelectValue placeholder="Select row-to-row gap" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">
                  10 Ft (Recommended for hassle free farm operations)
                </SelectItem>
                <SelectItem value="9">9 ft</SelectItem>
                <SelectItem value="8">8 ft</SelectItem>
              </SelectContent>
            </Select>

            <label htmlFor="trellisType">
              Trellis Type<span className="text-red-500">*</span>
            </label>
            <Select value={trellisType} onValueChange={setTrellisType} required>
              <SelectTrigger className="bg-white lg:w-1/3 mb-40 md:mb-20 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                <SelectValue placeholder="Select trellis type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prestressed Concrete Trellis">
                  Prestressed Concrete Trellis
                </SelectItem>
                <SelectItem value="GI Steel Trellis">
                  GI Steel Trellis
                </SelectItem>
              </SelectContent>
            </Select>
          </form>

          {/* Form step 3 - Add-on Services */}
          <form className={`py-10 ${formStage === 3 ? "" : "hidden"}`}>
            <label htmlFor="sideAnchors">
              Side Anchors<span className="text-red-500">*</span>
            </label>
            <Select
              value={sideAnchors}
              onValueChange={(value) => {
                setSideAnchors(value);
                if (value === "no") {
                  setCrossWire("");
                  setPostCaps("");
                  setTopWireHailNet("");
                }
              }}
              required
            >
              <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            {/* Cross Wire - only show if Side Anchors is Yes */}
            {sideAnchors === "yes" && (
              <>
                <label htmlFor="crossWire">
                  Cross Wire<span className="text-red-500">*</span>
                </label>
                <Select
                  value={crossWire}
                  onValueChange={(value) => {
                    setCrossWire(value);
                    if (value === "no") {
                      setPostCaps("");
                      setTopWireHailNet("");
                    }
                  }}
                  required
                >
                  <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>

                {/* Post Caps - only show if Cross Wire is Yes */}
                {crossWire === "yes" && (
                  <>
                    <label htmlFor="postCaps">
                      Post Caps<span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={postCaps}
                      onValueChange={(value) => {
                        setPostCaps(value);
                        if (value === "no") {
                          setTopWireHailNet("");
                        }
                      }}
                      required
                    >
                      <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Top-wire for Hail Net - only show if Post Caps is Yes */}
                    {postCaps === "yes" && (
                      <>
                        <label htmlFor="topWireHailNet">
                          Top-wire for Hail Net
                          <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={topWireHailNet}
                          onValueChange={setTopWireHailNet}
                          required
                        >
                          <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            <label htmlFor="headerAssembly">
              Header Assembly<span className="text-red-500">*</span>{" "}
              <span className="text-sm text-gray-500">
                (For Fertigation purpose)
              </span>
            </label>
            <Select
              value={headerAssembly}
              onValueChange={(value) => {
                setHeaderAssembly(value);
                if (value === "no") {
                  setVenturyInjector("");
                }
              }}
              required
            >
              <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            {/* Ventury Injector - only show if Header Assembly is Yes */}
            {headerAssembly === "yes" && (
              <>
                <label htmlFor="venturyInjector">
                  Ventury Injector/Fertigation Tank
                  <span className="text-red-500">*</span>
                </label>
                <Select
                  value={venturyInjector}
                  onValueChange={setVenturyInjector}
                  required
                >
                  <SelectTrigger className="bg-white lg:w-1/3 mb-5 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}

            <label htmlFor="hydrocycloneFilter">
              Hydrocyclone Filter<span className="text-red-500">*</span>{" "}
              <span className="text-sm text-gray-500">
                (Recommended for sand and heavy dirt filtration)
              </span>
            </label>
            <Select
              value={hydrocycloneFilter}
              onValueChange={setHydrocycloneFilter}
              required
            >
              <SelectTrigger className="bg-white lg:w-1/3 mb-40 md:mb-20 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </form>

          <div
            className={`${formStage === 4 ? "" : "hidden"} flex flex-col items-center mt-24 md:mt-44`}
          >
            <div className="flex justify-center md:justify-around items-center">
              <div className="flex items-center justify-center w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-green-600 mr-5">
                <FaWallet className="text-4xl md:text-7xl text-[#44A05B]" />
              </div>
              <div className="flex items-end flex-col">
                <span className="text-3xl md:text-5xl text-[#44A05B]">
                  {formatAmount(totalPrice())}
                </span>
              </div>
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <div className="text-center mt-5">
                  <ButtonComponent
                    text={"Book Orchard"}
                    disabled={disableBookingBtn}
                  />
                </div>
              </AlertDialogTrigger>

              <AlertDialogContent className="sm:max-w-[425px] bg-[#F6F2EF] max-h-[90vh]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#035803]">
                    Confirm your details
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <div
                  className="overflow-y-auto"
                  style={{ maxHeight: "calc(90vh - 200px)" }}
                >
                  <Table className="bg-white">
                    <TableCaption className="text-green-700">
                      Are you sure you want to book your orchard? Please review
                      all details before confirming.
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px] text-lg text-[#035803] font-bold">
                          Label
                        </TableHead>
                        <TableHead className="text-right w-[200px] text-lg text-[#035803] font-bold">
                          Info
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Name
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {groverName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Address
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {groverAddress}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Phone Number
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {groverNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Total Land
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {landSizeKanals ? `${landSizeKanals} Kanals ` : ""}
                          {landSizeMarlas ? `${landSizeMarlas} Marlas` : ""}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Row-to-Row Gap
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {rowToRowGap} ft
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Trellis Type
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {trellisType}
                        </TableCell>
                      </TableRow>
                      {sideAnchors === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Side Anchors
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {crossWire === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Cross Wire
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {postCaps === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Post Caps
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {topWireHailNet === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Top-wire for Hail Net
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {headerAssembly === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Header Assembly
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {venturyInjector === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Ventury Injector/Fertigation Tank
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      {hydrocycloneFilter === "yes" && (
                        <TableRow>
                          <TableCell className="font-medium text-green-700">
                            Hydrocyclone Filter
                          </TableCell>
                          <TableCell className="text-right text-green-700">
                            Yes
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Total Posts
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {Math.ceil(getQuantities().posts * totalLand())}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Total Plants
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {Math.ceil(getQuantities().plants * totalLand())}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium text-green-700">
                          Total Anchors
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {Math.ceil(getQuantities().anchors * totalLand())}
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-2xl font-bold">
                        <TableCell className="font-medium text-green-700">
                          Estimated Cost
                        </TableCell>
                        <TableCell className="text-right text-green-700">
                          {formatAmount(totalPrice())}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-500 text-white font-medium  shadow-lg hover:bg-white hover:text-gray-500 transition-colors px-4 py-2 rounded-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={bookingHandler}
                    className="bg-[#44A05B] text-white font-medium  shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors px-4 py-2 rounded-lg"
                  >
                    Confirm Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="mt-4 mb-20 md:text-lg text-gray-600 text-center">
              Click the button to book your orchard today!
            </p>
          </div>
        </div>

        {/* Buttons outside the scrollable container */}
        <div className="absolute bottom-32 md:bottom-16 right-12 md:left-12 flex justify-between">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reset
          </button>
        </div>
        <div className="absolute bottom-16 right-12 gap-5 flex justify-between">
          <button
            onClick={goToPrev}
            className={`${formStage > 1 ? "" : "hidden"} bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center transform hover:scale-105`}
          >
            <RiArrowLeftSLine className="text-white mr-1" />
            Prev
          </button>
          <button
            onClick={goToNext}
            className={`${formStage < 3 ? "" : "hidden"} bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center transform hover:scale-105`}
          >
            Next
            <RiArrowRightSLine className="text-white mr-1" />
          </button>
          <button
            onClick={generateEstimation}
            className={`${formStage === 3 ? "" : "hidden"} bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out flex items-center transform hover:scale-105`}
          >
            Generate Cost
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookOrchid;
