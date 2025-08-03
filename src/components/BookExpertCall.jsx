"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonComponent } from "./ButtonComponent";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSuccessDialog } from "@/context/DialogContext";
import { addBooking, checkBookingExists } from "@/utils/BookExpert";
import { getReferenceNo, incrementReferenceNo } from "@/utils/GenerateId";

const BookExpertCall = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { openDialog, setDialogTitle, setDialogDesc, setDialogImg } =
    useSuccessDialog();

  const formRef = useRef(null);
  const prevPhoneNumberRef = useRef("");

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [expertType, setExpertType] = useState("");
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

  const bookTest = async () => {
    setNameError(false);
    setPhoneError(false);
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
    if (
      formStage === 1 &&
      (!groverName || !groverNumber || !groverAddress || !expertType)
    ) {
      setOpen(false);
      fillError();
      return;
    }
    setOpen(!open);
  };

  const confirmBooking = async () => {
    setOpen(false);
    toast({
      title: "Sending Booking...",
      description: "Please wait for a moment.",
      className: "bg-yellow-500 text-white border border-yellow-700",
    });

    const referenceNo = await getReferenceNo();

    if (!referenceNo) {
      toast({
        title: "Failed to book expert call",
        description: "An error occurred while generating reference number",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }

    // Create URL-encoded data
    const bookingData = {
      name: groverName,
      address: groverAddress,
      phone: groverNumber,
      expertType: expertType,
      referenceNo: referenceNo,
    };

    setDisableBookingBtn(true);

    const bookingResult = await addBooking(bookingData);

    if (bookingResult.success) {
      setDisableBookingBtn(false);
      openDialog();
      setDialogTitle("Booking Recorded!");
      setDialogDesc(
        "This service is under development and will be available soon, stay tuned!",
      );
      setDialogImg("/assets/images/commingsoon.png");
      router.push("/");

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

  const handleReset = () => {
    setFormStage(1);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setGroverName("");
    setGroverAddress("");
    setGroverNumber("");
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

  return (
    <div>
      <div ref={formRef} className="font-[Raleway] mb-10">
        <b>
          Before we book your call with our expert, we need to know a little
          about you and your need!
        </b>{" "}
        Fill this form so that we can contact you later.
      </div>
      <div className="md:h-[47rem] bg-[#F6F2EF] rounded-xl relative">
        <div className="grid grid-cols-3 bg-white border rounded-t-xl mb-10">
          <div
            className={`text-xs md:text-sm px-4 py-3 border border-[#035803] rounded-tl-xl ${formStage === 1 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Customer Details
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
            className={`${phoneError ? "" : "invisible"} mb-2 text-red-500 text-sm`}
          >
            Enter valid 10 digit phone number
          </p>
          {otpSent && !otpVerified && (
            <div className="mt-4">
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
              <div className="flex items-center gap-4 mb-4 md:mb-2">
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
          <label htmlFor="cropType">
            Select Expert<span className="text-red-500">*</span>{" "}
          </label>
          <Select value={expertType} onValueChange={setExpertType} required>
            <SelectTrigger className="bg-white lg:w-1/3 mb-40 md:mb-20 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select expert" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Plant Disease Expert">
                Plant Disease Expert
              </SelectItem>
              <SelectItem value="Plant Nutrition Expert">
                Plant Nutrition Expert
              </SelectItem>
              <SelectItem value="Soil Expert">Soil Expert</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </form>
        {/*Control Buttons*/}
        <div className="absolute bottom-32 md:bottom-16 right-12 md:left-12 flex justify-between">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>
        <div className="absolute bottom-16 right-12 gap-5 flex justify-between">
          {formStage === 1 ? (
            <AlertDialog open={open} onOpenChange={bookTest}>
              <AlertDialogTrigger asChild>
                <ButtonComponent
                  text={"Book Expert Call"}
                  onClick={bookTest}
                  disabled={disableBookingBtn}
                />
              </AlertDialogTrigger>

              <AlertDialogContent className="sm:max-w-[425px] bg-[#F6F2EF]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#035803]">
                    Confirm your details
                  </AlertDialogTitle>
                </AlertDialogHeader>

                <Table className="bg-white">
                  <TableCaption className="text-green-700">
                    Are you sure you want to book the expert call? Please review
                    all details before confirming.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] text-lg text-[#035803] font-bold">
                        Label
                      </TableHead>
                      <TableHead className="text-right text-lg text-[#035803] font-bold">
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
                        Expert Type
                      </TableCell>
                      <TableCell className="text-right text-green-700">
                        {expertType}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-500 text-white font-medium  shadow-lg hover:bg-white hover:text-gray-500 transition-colors px-4 py-2 rounded-lg">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={confirmBooking}
                    className="bg-[#44A05B] text-white font-medium  shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors px-4 py-2 rounded-lg"
                  >
                    Confirm Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BookExpertCall;
