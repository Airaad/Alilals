"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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

const BookExpertCall = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formStage, setFormStage] = useState(1);
  const [groverName, setGroverName] = useState("");
  const [groverAddress, setGroverAddress] = useState("");
  const [groverNumber, setGroverNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [disableBookingBtn, setDisableBookingBtn] = useState(false);

  const fillError = () => {
    toast({
      title: "Action required",
      description: "Please fill out all required fields.",
      className: "bg-red-500 text-white border border-red-700",
    });
  };

  const bookTest = () => {
    if (formStage === 1 && (!groverName || !groverNumber || !groverAddress)) {
      setOpen(false);
      fillError();
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
    }).toString();

    setDisableBookingBtn(true);

    fetch(
      "https://script.google.com/macros/s/AKfycbxVuzhc1nVKmtkDBorR_gyIUTA0XBQIZDWw3_TAuMypr70vnnojbEljz_amnTzSzJgc/exec",
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
