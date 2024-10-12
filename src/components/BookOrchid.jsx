"use client";

import React, { useState } from "react";
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

const BookOrchid = () => {
  const basicPrices = {
    steelPost: 1450,
    concretePost: 1650,
    wire: 15,
    plant: 670,
    anchor: 2700,
    guyWire: 1550,
    labor: 10000,
    transportation: 10000,
    annualSubscription: 3600,
  };

  const { toast } = useToast();
  const router = useRouter();

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [landSizeKanals, setLandSizeKanals] = useState("");
  const [landSizeMarlas, setLandSizeMarlas] = useState("");
  const [rowToRowDistance, setRowToRowDistance] = useState("");
  const [poleToPoleDistance, setPoleToPoleDistance] = useState("");
  const [postType, setPostType] = useState("");
  const [plantToPlantDistance, setPlantToPlantDistance] = useState("");
  const [wirePattern, setWirePattern] = useState("");
  const [open, setOpen] = useState(false);

  const goToNext = () => {
    const fillError = () => {
      toast({
        title: "Action required",
        description: "Please fill out all required fields.",
        className: "bg-red-500 text-white border border-red-700",
      });
    };

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
    if (
      formStage === 3 &&
      (!rowToRowDistance ||
        !poleToPoleDistance ||
        !plantToPlantDistance ||
        !wirePattern)
    ) {
      fillError();
      return;
    }
    setFormStage((prevStep) => Math.min(prevStep + 1, 4));
  };

  const goToPrev = () => setFormStage((prevStep) => Math.max(prevStep - 1, 1));

  const generateEstimation = () => {
    goToNext();
    toast({
      title: "Cost Calculated",
      className: "bg-green-500 text-white border border-green-700",
    });
  };

  const handleReset = () => {
    setFormStage(1);
    setGroverName("");
    setGroverAddress("");
    setGroverNumber("");
    setLandSizeKanals("");
    setLandSizeMarlas("");
    setRowToRowDistance("");
    setPoleToPoleDistance("");
    setPlantToPlantDistance("");
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

  const CalculatePoleCost = () => {
    const perPostCost =
      postType === "concrete"
        ? basicPrices.concretePost
        : basicPrices.steelPost;

    const multipliers = {
      8: { 9: 24, 10: 22, 11: 20 },
      9: { 9: 22, 10: 20, 11: 18 },
      10: { 9: 19, 10: 17, 11: 15 },
    };

    const totalPostCost =
      multipliers[rowToRowDistance]?.[poleToPoleDistance] * perPostCost || 0;

    return totalPostCost;
  };

  const CalculatePlantCost = () => {
    const perPlantCost = basicPrices.plant;

    const multipliers = {
      8: { 0.92: 222, 1: 205, 1.5: 136 },
      9: { 0.92: 203, 1: 187, 1.5: 124 },
      10: { 0.92: 178, 1: 164, 1.5: 109 },
    };

    const totalPlantCost =
      multipliers[rowToRowDistance]?.[plantToPlantDistance] * perPlantCost || 0;

    return totalPlantCost;
  };

  const CalculateWireCost = () => {
    const perWireCost = basicPrices.wire;

    const multipliers = {
      8: { 4: 820, 5: 1025 },
      9: { 4: 748, 5: 935 },
      10: { 4: 640, 5: 800 },
    };

    const totalWireCost =
      multipliers[rowToRowDistance]?.[wirePattern] * perWireCost || 0;

    return totalWireCost;
  };

  const totalPrice = () => {
    return (
      (CalculatePoleCost() +
        CalculatePlantCost() +
        CalculateWireCost() +
        basicPrices.guyWire +
        basicPrices.anchor) *
        totalLand() +
      basicPrices.labor +
      basicPrices.transportation +
      basicPrices.annualSubscription
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
      RowToRowDistance: rowToRowDistance,
      PoleToPoleDistance: poleToPoleDistance,
      PostType: postType,
      PlantToPlantDistance: plantToPlantDistance,
      WirePattern: wirePattern,
      TotalCost: formatAmount(totalPrice()),
    }).toString();

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
        router.push("/");
        toast({
          title: "Booking Recorded",
          description: "We will reach out to you soon.",
          className: "bg-green-500 text-white border border-green-700",
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to send booking",
          description: err.message,
          className: "bg-red-500 text-white border border-red-700",
        });
      });
  };

  return (
    <div>
      <div className="font-[Raleway] mb-10">
        <b>
          Before we book your orchid, you must be curious about the cost to set
          up your agricultural field?
        </b>{" "}
        Our easy-to-use cost estimator tool helps you get an instant estimate
        for your field setup. Simply enter the details about your land and
        requirements, and the calculator will provide an almost precise quote.
      </div>

      <div className="md:h-[47rem] bg-[#F6F2EF] rounded-xl relative">
        <div className="flex bg-white border rounded-t-xl mb-10">
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
            className={`rounded-tr-xl md:rounded-none text-xs md:text-sm px-5 py-3 border border-[#035803] ${formStage === 4 ? "bg-[#035803] text-white" : "bg-white"}`}
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
          <label htmlFor="rowToRowDistance">
            Row to Row Distance<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(ft)</span>
          </label>
          <Select
            value={rowToRowDistance}
            onValueChange={setRowToRowDistance}
            required
          >
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select row to row distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8ft</SelectItem>
              <SelectItem value="9">9ft</SelectItem>
              <SelectItem value="10">10ft</SelectItem>
            </SelectContent>
          </Select>

          <label htmlFor="poleToPoleDistance">
            Pole to Pole Distance<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(m)</span>
          </label>
          <Select
            value={poleToPoleDistance}
            onValueChange={setPoleToPoleDistance}
            required
          >
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select pole to pole distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9m</SelectItem>
              <SelectItem value="10">10m</SelectItem>
              <SelectItem value="11">11m</SelectItem>
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

          <label htmlFor="plantToPlantDistance">
            Plant to Plant Distance<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(m)</span>
          </label>
          <Select
            value={plantToPlantDistance}
            onValueChange={setPlantToPlantDistance}
            required
          >
            <SelectTrigger className="bg-white lg:w-1/3 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select plant to plant distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.92">0.92m</SelectItem>
              <SelectItem value="1">1m</SelectItem>
              <SelectItem value="1.5">1.5m</SelectItem>
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
              <div className="text-center">
                <button
                  className={`mt-14 text-2xl md:text-4xl bg-[#44A05B] hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out 
                  hover:shadow-[0_0_15px_5px_rgba(34,197,94,0.8)] focus:ring-4 focus:ring-green-300 neon-green`}
                >
                  Book Orchid
                </button>

                <p className="mt-4 mb-64 md:mb-20 md:text-lg text-gray-600">
                  Click the button to book your orchid today!
                </p>
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="sm:max-w-[425px] bg-green-50 border border-green-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-green-800">
                  Confirm your details
                </AlertDialogTitle>
              </AlertDialogHeader>

              <Table className="bg-white">
                <TableCaption className="text-green-600">
                  Please check the details carefully before booking.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] text-green-800">
                      Label
                    </TableHead>
                    <TableHead className="text-right text-green-800">
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
                      Row to Row Distance
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {rowToRowDistance} ft
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-green-700">
                      Pole to pole distance
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {poleToPoleDistance} m
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
                      Plant to Plant Distance
                    </TableCell>
                    <TableCell className="text-right text-green-700">
                      {plantToPlantDistance} m
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
                <AlertDialogCancel className="bg-gray-500 hover:bg-green-50 text-white px-4 py-2 rounded-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={bookingHandler}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
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
