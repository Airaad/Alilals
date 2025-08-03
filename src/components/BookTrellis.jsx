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
import { addBooking, checkBookingExists } from "@/utils/BookTrellis";
import { getReferenceNo, incrementReferenceNo } from "@/utils/GenerateId";

const BookTrellis = () => {
  const basicPrices = {
    steel: 58383,
    concrete: 65000,
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
  const [trellisType, setTrellisType] = useState("");
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
    if (formStage === 3 && !trellisType) {
      fillError();
      return;
    }
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
    setTrellisType("");
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

  const totalPrice = () => {
    return trellisType === "steel"
      ? totalLand() * basicPrices.steel
      : totalLand() * basicPrices.concrete;
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

    // For storing in firestore
    const bookingData = {
      name: groverName,
      address: groverAddress,
      phone: groverNumber,
      totalLand: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      trellisType: trellisType,
      estimatedCost: formatAmount(totalPrice()),
      referenceNo: referenceNo,
    };

    // For creating PDF
    const pdfData = [
      {
        label: "Total Land",
        value: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      },
      { label: "Trellis Type", value: trellisType },
      { label: "Estimated Cost", value: formatAmount(totalPrice()).slice(1) },
    ];

    setDisableBookingBtn(true);

    const bookingResult = await addBooking(bookingData);

    if (bookingResult.success) {
      setDisableBookingBtn(false);
      openDialog();
      router.push("/");

      generateInvoice({
        title: "Trellis Installation Estimation",
        filename: `Trellis_Booking_${referenceNo}.pdf`,
        data: pdfData,
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
        description: err.message,
        className: "bg-red-500 text-white border border-red-700",
      });
    }
  };

  return (
    <div>
      <div ref={formRef} className="font-[Raleway] mb-10">
        <b>
          Before we book trellis installation for your orchid, you must be
          curious about the cost?
        </b>{" "}
        Our easy-to-use cost estimator tool helps you get an instant estimate
        for your service. Simply enter the details about your land and
        requirements, and the calculator will provide an almost precise quote.
      </div>

      <div className="md:h-[47rem] bg-[#F6F2EF] rounded-xl relative">
        <div className="grid grid-cols-4 bg-white border rounded-t-xl mb-10">
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] rounded-tl-xl ${formStage === 1 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Customer Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 2 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Land Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 3 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Trellis Details
          </div>
          <div
            className={`rounded-tr-xl text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 4 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Estimated Cost
          </div>
        </div>

        {/* Form step 1 */}
        <form className={`py-10 px-10 ${formStage === 1 ? "" : "hidden"}`}>
          <label htmlFor="groverName">
            Name<span className="text-red-500">*</span>
          </label>
          <Input
            className="bg-white my-2 lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Name"
            id="groverName"
            value={groverName}
            onChange={(e) => setGroverName(e.target.value)}
          />
          <p
            className={`${nameError ? "" : "invisible"} mb-2 text-red-500 text-sm`}
          >
            Name should be greater than 3 characters and only contain alphabets
          </p>
          <label htmlFor="groverAddress">
            Address<span className="text-red-500">*</span>
          </label>
          <Input
            className="bg-white mb-10 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
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
          <div className="flex flex-col md:flex-row gap-2 items-center">
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
            className={`${phoneError ? "" : "invisible"} ${!otpSent || otpVerified ? "mb-40 md:mb-0" : ""} text-red-500 text-sm`}
          >
            Enter valid 10 digit phone number
          </p>
          {otpSent && !otpVerified && (
            <div className="mt-4 mb-20 md:mb-0">
              <label htmlFor="otp">
                OTP<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <Input
                  className="bg-white mb-2 mt-2 lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] shadow-sm transition-all duration-200 hover:shadow-md"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  id="otp"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
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
              <div className="flex flex-col md:flex-row items-center gap-4 mb-40 md:mb-20">
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

        {/* Form step 2 */}
        <form className={`py-10 px-10 ${formStage === 2 ? "" : "hidden"}`}>
          <label htmlFor="landSizeKanals">
            Land Area<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Kanals)</span>
          </label>
          <Input
            className="bg-white mb-2 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="number"
            placeholder="Enter Land Size"
            id="landSizeKanals"
            value={landSizeKanals}
            min={1}
            onChange={(e) => setLandSizeKanals(e.target.value)}
          />
          <p
            className={`${kanalsError ? "" : "invisible"} mb-10 text-red-500 text-sm`}
          >
            Enter minimum 1 kanals
          </p>

          <label htmlFor="landSizeMarlas">
            Land Area<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Marlas)</span>
          </label>
          <Input
            className="bg-white mb-2 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="number"
            placeholder="Enter Land Size"
            id="landSizeMarlas"
            value={landSizeMarlas}
            min={0}
            max={19}
            onChange={(e) => setLandSizeMarlas(e.target.value)}
          />
          <p
            className={`${marlasError ? "" : "invisible"} mb-10 text-red-500 text-sm`}
          >
            Marlas should be between 0-19 only
          </p>
          <div className="mb-40 md:mb-20 md:text-xl text-green-700">
            Total Land: {landSizeKanals ? `${landSizeKanals} Kanals ` : ""}
            {landSizeMarlas ? `${landSizeMarlas} Marlas` : ""}
          </div>
        </form>

        {/* Form step 3 */}
        <form className={`py-10 px-10 ${formStage === 3 ? "" : "hidden"}`}>
          <label htmlFor="landSizeKanals">
            Trellis Type<span className="text-red-500">*</span>{" "}
          </label>
          <Select value={trellisType} onValueChange={setTrellisType} required>
            <SelectTrigger
              className={`bg-white lg:w-1/3 my-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B] ${trellisType ? "" : "mb-40 md:mb-20"}`}
            >
              <SelectValue placeholder="Select trellis type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steel">Steel (GI) trellis</SelectItem>
              <SelectItem value="concrete">
                Pre-stressed Concrete trellis
              </SelectItem>
            </SelectContent>
          </Select>
          <div
            className={`p-4 mb-40 md:mb-20  ${trellisType === "steel" ? "" : "hidden"}`}
          >
            <div className="mb-3 text-lg underline">Steel (GI) trellis</div>
            <ul className="list-disc list-inside space-y-2 text-gray-500 text-center md:text-start">
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                High tensile fruit wire and 14.5kg GI posts.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Post gap 9m.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Wire pattern (4 wires).
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                6 Hellex anchors.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Extra labour/transport excluded.
              </li>
            </ul>
          </div>
          <div
            className={`p-4 mb-40 md:mb-20 ${trellisType === "concrete" ? "" : "hidden"}`}
          >
            <div className="mb-3 text-lg underline">
              Pre-stressed Concrete trellis
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-500 text-center md:text-start">
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                High tensile fruit wire and 4.5m post length.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Post gap 10m.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Wire pattern (4 wires).
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                6 Hellex anchors.
              </li>
              <li className=" hover:text-[#035803] transition duration-300 ease-in-out">
                Extra labour/transport excluded.
              </li>
            </ul>
          </div>
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
                  text={"Book Trellis Installation"}
                  disabled={disableBookingBtn}
                />
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="sm:max-w-[425px] bg-[#F6F2EF]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#035803]">
                  Confirm your details
                </AlertDialogTitle>
              </AlertDialogHeader>

              <Table className="bg-white">
                <TableCaption className="text-green-700">
                  Are you sure you want to book this service? Please review all
                  details before confirming.
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
                      Trellis Type
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {trellisType}
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
          <p className="mt-4 mb-64 md:mb-20 md:text-lg text-gray-600 text-center">
            Click the button to book trellis installation service today!
          </p>
        </div>

        <div className="absolute bottom-32 md:bottom-16 right-12 md:left-12 flex justify-between">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>
        <div className="absolute bottom-16 right-12 gap-5 flex justify-between">
          <button
            onClick={goToPrev}
            className={`${formStage > 1 ? "" : "hidden"} bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center`}
          >
            <RiArrowLeftSLine className="text-white mr-1" />
            Prev
          </button>
          <button
            onClick={goToNext}
            className={`${formStage < 3 ? "" : "hidden"} bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center`}
          >
            Next
            <RiArrowRightSLine className="text-white mr-1" />
          </button>
          <button
            onClick={generateEstimation}
            className={`${formStage === 3 ? "" : "hidden"} bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center`}
          >
            Generate Cost
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTrellis;
