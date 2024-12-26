"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
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
import { generatePDF } from "@/utils/generatePDF";

const BookOrchid = () => {
  const basicPrices = {
    steelPost: 1400,
    concretePost: 1500,
    wire: 13,
    plant: 720,
    otherCost: 1830,
  };

  const { toast } = useToast();
  const router = useRouter();
  const { openDialog } = useSuccessDialog();

  const formRef = useRef(null);

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [landSizeKanals, setLandSizeKanals] = useState("1");
  const [landSizeMarlas, setLandSizeMarlas] = useState("0");
  const [rowGap, setRowGap] = useState("");
  const [postGap, setPostGap] = useState("");
  const [postType, setPostType] = useState("");
  const [wirePattern, setWirePattern] = useState("");
  const [open, setOpen] = useState(false);
  const [disableBookingBtn, setDisableBookingBtn] = useState(false);

  //Errors
  const [kanalsError, setKanalsError] = useState(false);
  const [marlasError, setMarlasError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

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

  const goToNext = () => {
    setNameError(false);
    setPhoneError(false);
    setKanalsError(false);
    setMarlasError(false);
    if (formStage === 1 && (!checkName() || !checkPhoneNumber())) {
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
    if (formStage === 3 && (!rowGap || !postGap || !wirePattern || !postType)) {
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
    setLandSizeKanals("3");
    setLandSizeMarlas("0");
    setRowGap("");
    setPostGap("");
    setPostType("");
    setWirePattern("");
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

  const getTotalPlants = () => {
    const multipliers = {
      9: { 8: 186, 9: 168, 10: 150 },
      10: { 8: 186, 9: 166, 10: 146 },
    };

    return multipliers[postGap]?.[rowGap];
  };

  const getTotalPosts = () => {
    const multipliers = {
      9: { 8: 23, 9: 21, 10: 19 },
      10: { 8: 21, 9: 19, 10: 17 },
    };

    return multipliers[postGap]?.[rowGap];
  };

  const CalculatePlantAmount = () => {
    const perPlantCost = basicPrices.plant;

    return getTotalPlants() * perPlantCost;
  };

  const CalculatePostAmount = () => {
    const perPostCost =
      postType === "steel" ? basicPrices.steelPost : basicPrices.concretePost;

    return getTotalPosts() * perPostCost;
  };

  const CalculateWireAmount = () => {
    const perWireCost = basicPrices.wire;

    return getTotalPlants() * perWireCost * wirePattern;
  };

  const CalculateOtherAmount = () => {
    const perPostOtherCost = basicPrices.otherCost;

    return getTotalPosts() * perPostOtherCost;
  };

  const totalPrice = () => {
    return (
      (CalculatePlantAmount() +
        CalculatePostAmount() +
        CalculateWireAmount() +
        CalculateOtherAmount()) *
      totalLand()
    );
  };

  const bookingHandler = (e) => {
    e.preventDefault();
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
      rowGap: rowGap,
      postGap: postGap,
      PostType: postType,
      WirePattern: wirePattern,
      TotalCost: formatAmount(totalPrice()),
    }).toString();

    // For creating PDF
    const pdfData = [
      { label: "Name", value: groverName },
      { label: "Address", value: groverAddress },
      { label: "Phone", value: groverNumber },
      {
        label: "Total Land",
        value: `${landSizeKanals} Kanals ${landSizeMarlas} Marlas`,
      },
      { label: "Row Gap", value: `${rowGap} ft` },
      { label: "Post Gap", value: `${postGap} m` },
      { label: "Post Type", value: postType },
      { label: "Wire Pattern", value: `${wirePattern} lines` },
      { label: "Total Posts", value: `${getTotalPosts()} lines` },
      { label: "Total Plants", value: `${getTotalPlants()} lines` },
      { label: "Total Cost", value: formatAmount(totalPrice()) },
    ];

    setDisableBookingBtn(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbw9wGaIkKb-opX2UzflE640b1LCNc61AAVwVdNpb3pc_X3g64vFI-5nNssZBilnvbRVmg/exec",
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
        openDialog();
        router.push("/");

        generatePDF({
          title: "Orchard Booking Receipt",
          filename: `Orchard_Booking_${groverName.replace(/\s+/g, "_")}.pdf`,
          data: pdfData,
          footerText: "Thank you for choosing our services!",
          additionalInfo: {
            "Booking Reference": `ORCHARD-${Date.now().toString().slice(-6)}`,
          },
          showTerms: true,
          showBankDetails: true,
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

  return (
    <div>
      <div ref={formRef} className="font-[Raleway] mb-10">
        <b>
          Before we book your orchid, you must be curious about the cost to set
          up your agricultural field?
        </b>{" "}
        Our easy-to-use cost estimator tool helps you get an instant estimate
        for your field setup. Simply enter the details about your land and
        requirements, and the calculator will provide an almost precise quote.
      </div>

      <div className="md:h-[47rem] bg-[#F6F2EF] rounded-xl relative">
        <div className="grid grid-cols-4 bg-white border rounded-t-xl mb-10">
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] rounded-tl-xl ${formStage === 1 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Grover Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 2 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Land Details
          </div>
          <div
            className={`text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 3 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Plantation Details
          </div>
          <div
            className={`rounded-tr-xl text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 4 ? "bg-[#035803] text-white" : "bg-white"}`}
          >
            Total Cost
          </div>
        </div>

        {/* Form step 1 */}
        <form className={`py-10 px-10 ${formStage === 1 ? "" : "hidden"}`}>
          <label htmlFor="groverName">
            Name of Grover<span className="text-red-500">*</span>
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
          </label>
          <Input
            className="bg-white mb-2 mt-2  lg:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Phone Number"
            id="groverNumber"
            value={groverNumber}
            onChange={(e) => setGroverNumber(e.target.value)}
          />
          <p
            className={`${phoneError ? "" : "invisible"} mb-40 md:mb-20 text-red-500 text-sm`}
          >
            Enter valid 10 digit phone number
          </p>
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
            Enter minimum 1 kanal
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
          <label htmlFor="rowGap">
            Row Gap<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(ft)</span>
          </label>
          <Select value={rowGap} onValueChange={setRowGap} required>
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select row to row distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8ft</SelectItem>
              <SelectItem value="9">9ft</SelectItem>
              <SelectItem value="10">10ft</SelectItem>
            </SelectContent>
          </Select>

          <label htmlFor="postGap">
            Post Gap<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(m)</span>
          </label>
          <Select value={postGap} onValueChange={setPostGap} required>
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select pole to pole distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9m</SelectItem>
              <SelectItem value="10">10m</SelectItem>
            </SelectContent>
          </Select>

          <label htmlFor="postType">
            Post Type<span className="text-red-500">*</span>
          </label>
          <Select value={postType} onValueChange={setPostType} required>
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select post type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steel">Steel</SelectItem>
              <SelectItem value="concrete">Concrete</SelectItem>
            </SelectContent>
          </Select>

          <label htmlFor="wirePattern">
            Wire Pattern<span className="text-red-500">*</span>
          </label>
          <Select value={wirePattern} onValueChange={setWirePattern} required>
            <SelectTrigger className="bg-white lg:w-1/3 mb-40 md:mb-20 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select Pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4 line</SelectItem>
              <SelectItem value="5">5 line</SelectItem>
              <SelectItem value="6">6 line</SelectItem>
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

                <p className="mt-4 mb-64 md:mb-20 md:text-lg text-gray-600">
                  Click the button to book your orchid today!
                </p>
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
                  Are you sure you want to book your orchard? Please review all
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
                      Row Gap
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {rowGap} ft
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Post Gap
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {postGap} m
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Post Type
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {postType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Wire Pattern
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {wirePattern} lines
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Total Posts
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {Math.floor(getTotalPosts() * totalLand())}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Total Plants
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {Math.floor(getTotalPlants() * totalLand())}
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-2xl font-bold">
                    <TableCell className="font-medium text-green-700">
                      Total Cost
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

export default BookOrchid;
