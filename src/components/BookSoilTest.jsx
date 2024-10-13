"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ButtonComponent } from "./ButtonComponent";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
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

const BookSoilTest = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [landSizeKanals, setLandSizeKanals] = useState("");
  const [landSizeMarlas, setLandSizeMarlas] = useState("");
  const [cropType, setCropType] = useState("");
  const [fertilizerDate, setFertilizerDate] = useState("");
  const [open, setOpen] = useState(false);
  const [disableBookingBtn, setDisableBookingBtn] = useState(false);

  const fillError = () => {
    toast({
      title: "Action required",
      description: "Please fill out all required fields.",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  const goToNext = () => {
    if (formStage === 1 && (!groverAddress || !groverName || !groverNumber)) {
      fillError();
      return;
    }
    if (formStage === 2 && !landSizeKanals && !landSizeMarlas) {
      fillError();
      return;
    }
    if (formStage === 2 && Number(landSizeKanals) < 3) {
      toast({
        title: "Enter minimum 3 kanals",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }
    setFormStage((prevStep) => Math.min(prevStep + 1, 3));
  };

  const goToPrev = () => setFormStage((prevStep) => Math.max(prevStep - 1, 1));

  const bookTest = () => {
    if (formStage === 3 && (!cropType || !fertilizerDate)) {
      setOpen(false);
      fillError();
      return;
    }
    const today = new Date();
    const fertilizerDateObj = new Date(fertilizerDate);
    if (fertilizerDateObj > today) {
      setOpen(false);
      toast({
        title: "Invalid last fertilizer applied date",
        description: "Last date cannot be greater than today",
        className: "bg-red-500 text-white border border-red-700",
      });
      return;
    }
    setOpen(!open);
  };

  const confirmBooking = () => {
    setOpen(false);
    toast({
      title: "Sending Booking...",
      description: "Please wait for a moment.",
      className: "bg-yellow-500 text-white border border-yellow-700",
    });

    // Create URL-encoded data
    const formData = new URLSearchParams({
      Name: groverName,
      Address: groverAddress,
      Phone: groverNumber,
      TotalLand: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      CropType: cropType,
      LastFertilizerDate: fertilizerDate,
    }).toString();

    setDisableBookingBtn(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbwnTRSfJlx_6rXgX3pYsPOMyOtErScLD4H_pgKcqDNGRbNWhRU2mENmCjqGVfBRYKKY/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      },
    )
      .then(() => {
        setDisableBookingBtn(false);
        router.push("/");
        toast({
          title: "Booking Recorded",
          description: "We will reach out to you soon.",
          className: "bg-green-500 text-white border border-green-700",
        });
      })
      .catch((err) => {
        setDisableBookingBtn(false);
        toast({
          title: "Failed to send booking",
          description: err.message,
          className: "bg-red-500 text-white border border-red-700",
        });
      });
  };

  const handleReset = () => {
    setFormStage(1);
    setGroverName("");
    setGroverAddress("");
    setGroverNumber("");
    setLandSizeKanals("");
    setLandSizeMarlas("");
    setCropType("");
    setFertilizerDate("");
    toast({
      title: "Form Resetted",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  return (
    <div>
      <div className="font-[Raleway] mb-10">
        <b>
          Before we book your soil test, we need to know about your orchard?
        </b>{" "}
        Fill this form so that we can understand your orchard better.
      </div>
      <div className="md:h-[47rem] bg-[#F6F2EF] rounded-xl relative">
        <div className="grid grid-cols-3 bg-white border rounded-t-xl mb-10">
          <div
            className={`text-xs md:text-sm px-4 py-3 border border-[#035803] rounded-tl-xl ${formStage === 1 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Grover Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 2 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Land Details
          </div>
          <div
            className={`rounded-tr-xl text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 3 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Crop Type
          </div>
        </div>
          {/* Form step 1 */}
        <form className={`py-10 px-10 ${formStage === 1 ? "" : "hidden"}`}>
          <label htmlFor="groverName">
            Name of Grover<span className="text-red-500">*</span>
          </label>
          <Input
            className="bg-white mb-10 mt-2 lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Name"
            id="groverName"
            value={groverName}
            onChange={(e) => setGroverName(e.target.value)}
          />
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
          </label>
          <Input
            className="bg-white mb-40 md:mb-20 mt-2  lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Phone Number"
            id="groverNumber"
            value={groverNumber}
            onChange={(e) => setGroverNumber(e.target.value)}
          />
        </form>
        {/* Form step 2 */}
        <form className={`py-10 px-10 ${formStage === 2 ? "" : "hidden"}`}>
          <label htmlFor="landSizeKanals">
            Land Size<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Kanals)</span>
          </label>
          <Input
            className="bg-white mb-2 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="number"
            placeholder="Enter Land Size"
            id="landSizeKanals"
            value={landSizeKanals}
            onChange={(e) => setLandSizeKanals(e.target.value)}
          />
          <p className="mb-10 text-red-500 text-sm">Minimum 3 kanals</p>

          <label htmlFor="landSizeMarlas">
            Land Size<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(Marlas)</span>
          </label>
          <Input
            className="bg-white mb-10 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="number"
            placeholder="Enter Land Size"
            id="landSizeMarlas"
            value={landSizeMarlas}
            onChange={(e) => setLandSizeMarlas(e.target.value)}
          />
          <div className="mb-40 md:mb-20 md:text-xl text-green-700">
            Total Land: {landSizeKanals ? `${landSizeKanals} Kanals ` : ""}
            {landSizeMarlas ? `${landSizeMarlas} Marlas` : ""}
          </div>
        </form>
        {/* Form step 3 */}
        <form className={`py-10 px-10 ${formStage === 3 ? "" : "hidden"}`}>
          <label htmlFor="cropType">
            Crop Type<span className="text-red-500">*</span>{" "}
          </label>
          <Input
            className="bg-white mb-10 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Crop Type"
            id="cropType"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          />
          <label htmlFor="fertilizerDate">
            Last Date of Fertilizer Applied
            <span className="text-red-500">*</span>{" "}
          </label>
          <Input
            className="bg-white mb-40 md:mb-20 mt-2 lg:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="date"
            placeholder="Enter Last Fertilizer Date"
            id="fertilizerDate"
            value={fertilizerDate}
            onChange={(e) => setFertilizerDate(e.target.value)}
          />
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
          {formStage === 3 ? (
            <AlertDialog open={open} onOpenChange={bookTest}>
              <AlertDialogTrigger asChild>
                <ButtonComponent
                  text={"Book Soil Text"}
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
                    Are you sure you want to book this soil test? Please review
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
                        Crop Type
                      </TableCell>
                      <TableCell className="text-right text-green-700">
                        {cropType}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-green-700">
                        Last Date of Fertilizer Applied
                      </TableCell>
                      <TableCell className="text-right text-green-700">
                        {fertilizerDate}{" "}
                        <span className="text-xs text-gray-400">
                          (YYYY/MM/DD)
                        </span>
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

export default BookSoilTest;