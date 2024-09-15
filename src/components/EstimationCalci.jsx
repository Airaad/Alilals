"use client";

import { React, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { FaWallet } from "react-icons/fa";

const EstimationCalci = () => {
  const { toast } = useToast();

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [trellisType, setTrellisType] = useState("");
  const [wirePattern, setWirePattern] = useState("");
  const [trellisHeight, setTrellisHeight] = useState("");
  const [northSouthLen, setNorthSouthLen] = useState("");
  const [eastWestLen, setEastWestLen] = useState("");
  const [trellisUnits, setTrellisUnits] = useState(0);
  const [headPoles, setHeadPoles] = useState(0);
  const [intermediatryPoles, setIntermediatryPoles] = useState(0);
  const [plants, setPlants] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleReset = (e) => {
    e.preventDefault();
    setFormStage(1);
    setGroverName("");
    setGroverAddress("");
    setGroverNumber("");
    setTrellisType("");
    setWirePattern("");
    setTrellisHeight("");
    setNorthSouthLen("");
    setEastWestLen("");
    setEstimatedCost(0);
    toast({
      title: "Form Resetted",
      description: "Estimation from has been resetted",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  const goToNext = (e) => {
    e.preventDefault();
    if (formStage === 1) {
      if (!groverName || !groverAddress || !groverNumber) {
        toast({
          title: "Action required",
          description: "Please fill out all required fields.",
          className: "bg-red-500 text-white border border-red-700",
        });
        return;
      }
    }
    if (formStage === 2) {
      if (!trellisType || !wirePattern || !trellisHeight) {
        toast({
          title: "Action required",
          description: "Please fill out all required fields.",
          className: "bg-red-500 text-white border border-red-700",
        });
        return;
      }
    }
    setFormStage(formStage + 1);
  };

  const goToPrev = (e) => {
    e.preventDefault();
    setFormStage(formStage - 1);
  };

  const generateEstimation = (e) => {
    e.preventDefault();
    if (formStage === 3) {
      if (!northSouthLen || !eastWestLen) {
        toast({
          title: "Action required",
          description: "Please fill out all required fields.",
          className: "bg-red-500 text-white border border-red-700",
        });
        return;
      }
    }
    toast({
      title: "Estimation Calculated",
      description: "Your estimated cost has been calculated",
      className: "bg-green-500 text-white border border-green-700",
    });
    setEstimatedCost(120000);
  };

  const formatAmount = (amount) => {
    const formatRupee = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

    return <span>{formatRupee}</span>;
  };

  const calculateTrellis = () => {};

  const calculateHeadPoles = () => {
    return ((Number(eastWestLen) - 10) / 2 + 1) * 2;
  };

  const calculateIntermediatryPoles = () => {};

  return (
    <div>
      <div className="font-[Raleway] mb-10">
        <b>Curious about the cost to set up your agricultural field?</b> Our
        easy-to-use cost estimator tool helps you get an instant estimate for
        your field setup. Simply enter the details about your land and
        requirements, and the calculator will provide an approximate quote. For
        a more accurate estimate, please fill in your details and submit the
        form to schedule an appointment with us.
      </div>

      <div className="relative bg-white w-full rounded-xl md:h-[30rem]">
        {/* Form step 1 */}
        <form className={`py-10 px-10 ${formStage === 1 ? "" : "hidden"}`}>
          <label htmlFor="groverName">
            Name of Grover<span className="text-red-500">*</span>
          </label>
          <Input
            className="mb-10 mt-2 md:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
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
            className="mb-10 mt-2 md:w-1/2  border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
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
            className="mb-20 mt-2  md:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="text"
            placeholder="Enter Phone Number"
            id="groverNumber"
            value={groverNumber}
            onChange={(e) => setGroverNumber(e.target.value)}
          />
          <div className="absolute bottom-8 left-10 flex space-x-2">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Reset
            </button>
          </div>
          <div className="absolute bottom-8 right-10 flex space-x-2">
            <button
              onClick={goToNext}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              Next
              <RiArrowRightSLine className="text-white" />
            </button>
          </div>
        </form>

        {/* Form step 2 */}
        <form className={`py-10 px-10 ${formStage === 2 ? "" : "hidden"}`}>
          {/* Trellis Type */}
          <label htmlFor="groveTrellisType">
            Trellis Type<span className="text-red-500">*</span>
          </label>
          <Select value={trellisType} onValueChange={setTrellisType} required>
            <SelectTrigger className="md:w-1/4 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steel">Steel</SelectItem>
              <SelectItem value="concrete">Concrete</SelectItem>
            </SelectContent>
          </Select>

          {/* Wire Pattern */}
          <label htmlFor="groverWirePattern">
            Wire Pattern<span className="text-red-500">*</span>
          </label>
          <Select value={wirePattern} onValueChange={setWirePattern} required>
            <SelectTrigger className="md:w-1/4 mb-10 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select Pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>

          {/* Trellis Height */}
          <label htmlFor="groverTrellisHeight">
            Trellis Height<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(ft)</span>
          </label>
          <Select
            value={trellisHeight}
            onValueChange={setTrellisHeight}
            required
          >
            <SelectTrigger className="md:w-1/4 mb-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]">
              <SelectValue placeholder="Select Height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8ft">8ft</SelectItem>
              <SelectItem value="9ft">9ft</SelectItem>
              <SelectItem value="10ft">10ft</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-xs text-gray-500 mb-20">
            <p>
              <b>Note: </b>
              9ft row-to-row distance is considered ideal for small size fields.
              However, Tractor operation is feasible in 10ft row-to-row distance
            </p>
          </div>

          <div className="absolute bottom-8 left-10 flex space-x-2">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Reset
            </button>
          </div>
          <div className="absolute bottom-8 right-10 flex space-x-2">
            <button
              onClick={goToPrev}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <RiArrowLeftSLine className="text-white mr-1" />
              Prev
            </button>
            <button
              onClick={goToNext}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              Next
              <RiArrowRightSLine className="text-white ml-1" />
            </button>
          </div>
        </form>

        {/* Form step 3 */}
        <form className={`py-10 px-10 ${formStage === 3 ? "" : "hidden"}`}>
          <label htmlFor="north-south-length">
            North-South Length<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(ft)</span>
          </label>
          <Input
            className="mb-10 mt-2 md:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="Number"
            placeholder="Enter Length"
            id="north-south-length"
            value={northSouthLen}
            onChange={(e) => setNorthSouthLen(e.target.value)}
          />
          <label htmlFor="east-west-length">
            East-West Length<span className="text-red-500">*</span>{" "}
            <span className="text-sm text-gray-500">(ft)</span>
          </label>
          <Input
            className="mb-4 mt-2 md:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
            type="Number"
            placeholder="Enter Length"
            id="east-west-length"
            value={eastWestLen}
            onChange={(e) => setEastWestLen(e.target.value)}
          />
          <div className="text-xs text-gray-500 mb-28">
            <p>
              <b>Note: </b>
              Measure the longest line crossing your field; length wise and
              breadth wise individually.
            </p>
          </div>
          <div className="absolute bottom-20 md:bottom-8 left-7 md:left-10 flex space-x-2">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Reset
            </button>
          </div>
          <div className="absolute bottom-8 right-10 flex space-x-2">
            <button
              onClick={goToPrev}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <RiArrowLeftSLine className="text-white mr-1" />
              Prev
            </button>
            <button
              onClick={generateEstimation}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              Generate Estimation
            </button>
          </div>
        </form>
      </div>

      <div className="relative bg-white w-full rounded-xl mt-10 py-10 md:pb-14 md:px-20">
        <h1 className="text-center text-2xl md:mb-10 mb-5">Estimated Cost</h1>
        <div className="flex justify-center md:justify-between items-center">
          <div className="flex items-center justify-center md:w-20 md:h-20 w-14 h-14 rounded-full border-2 border-green-600 mr-5">
            <FaWallet className="text-2xl md:text-5xl text-green-500" />
          </div>
          <div className="flex items-end flex-col">
            <span className="text-2xl md:text-5xl text-green-500">
              {formatAmount(estimatedCost)}
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={`${estimatedCost ? "visible" : "hidden"} bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out mt-3`}
                >
                  More Details
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Detailed Estimation</DialogTitle>
                  <DialogDescription>
                    Here is the detailed cost estimation of your field.
                  </DialogDescription>
                </DialogHeader>
                <Table>
                  <TableCaption>
                    A list of your items and estimated cost.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Items</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Trellis Units
                      </TableCell>
                      <TableCell className="text-right">
                        {trellisUnits}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Head Poles</TableCell>
                      <TableCell className="text-right">{headPoles}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Intermediary Poles
                      </TableCell>
                      <TableCell className="text-right">
                        {intermediatryPoles}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Plants</TableCell>
                      <TableCell className="text-right">{plants}</TableCell>
                    </TableRow>
                    <TableRow className="text-xl">
                      <TableCell className="font-bold">
                        Estimated Cost
                      </TableCell>
                      <TableCell className="font-bold text-right">
                        {formatAmount(estimatedCost)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimationCalci;
