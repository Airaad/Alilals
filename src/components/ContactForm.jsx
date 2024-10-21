"use client";

import { React, useState } from "react";
import { ButtonComponent } from "./ButtonComponent";
import { RiLeafFill } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ContactForm = () => {
  const { toast } = useToast();
  const [disableBtn, setDisableBtn] = useState(false);
  const [open, setOpen] = useState(false);

  //Errors
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const checkName = (name) => {
    const isValidName = /^[A-Za-z\s]+$/.test(name);
    const isLengthValid = name.length >= 3;
    if (isValidName && isLengthValid) {
      setNameError(false);
      return true;
    }
    setNameError(true);
    return false;
  };

  const checkPhoneNumber = (number) => {
    const isValidPhoneNumber = /^\d{10}$/.test(number);
    if (isValidPhoneNumber) {
      setPhoneError(false);
      return true;
    }
    setPhoneError(true);
    return false;
  };

  const checkEmail = (email) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (isValidEmail) {
      setEmailError(false);
      return true;
    }
    setEmailError(true);
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // Extract form data

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    if (!checkName(name) || !checkEmail(email) || !checkPhoneNumber(phone)) {
      return;
    }
    setDisableBtn(true);
    toast({
      title: "Sending Message...",
      description: "Please wait for a moment.",
      className: "bg-yellow-500 text-white border border-yellow-700",
    });
    fetch(
      "https://script.google.com/macros/s/AKfycbzu6h31268WCBXuYYphOtFDl5ini7Ohp9OzuVNdNZQpA5D_SArUP4r6tQBQQhcpMyvmmg/exec",
      {
        method: "POST",
        body: formData,
      },
    )
      .then(() => {
        setOpen(true);
        e.target.reset();
      })
      .catch((err) => {
        toast({
          title: "Failed to send message",
          description: err.message,
          className: "bg-red-500 text-white border border-red-700",
        });
        setDisableBtn(false);
      });
  };

  return (
    <div className="relative flex justify-center items-center py-10 px-8 bg-[#F6F2EF]">
      {/* Form */}
      <div className="relative z-10 bg-white p-8 md:p-12 rounded-lg shadow-lg w-full md:w-[70%]">
        <div className="flex gap-2 items-center justify-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">Contact Us</span>
        </div>
        <h2 className="text-3xl font-bold text-center text-[#202221] mb-6">
          Get In Touch
        </h2>
        <div className="h-[0.09rem] bg-[#44A05B] w-full mb-8" />
        <form onSubmit={submitHandler}>
          <div className="md:flex md:gap-10 md:justify-between">
            <div className="mb-4 md:w-1/2">
              <label className="block text-[#636363] mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
                placeholder="Your Name"
                required
              />
              <p
                className={`${nameError ? "" : "invisible"} text-red-500 text-sm`}
              >
                Name should be greater than 3 characters and only contain
                alphabets
              </p>
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block text-[#636363] mb-2">Email</label>
              <input
                type="text"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
                placeholder="Your Email"
                required
              />
              <p
                className={`${emailError ? "" : "invisible"} text-red-500 text-sm`}
              >
                Enter a valid email address
              </p>
            </div>
          </div>
          <div className="md:flex md:gap-10 md:justify-between">
            <div className="mb-4 md:w-1/2">
              <label className="block text-[#636363] mb-2">Phone</label>
              <input
                type="number"
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
                placeholder="Your Phone"
                required
              />
              <p
                className={`${phoneError ? "" : "invisible"} text-red-500 text-sm`}
              >
                Enter valid 10 digit phone number
              </p>
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block text-[#636363] mb-2">Address</label>
              <input
                type="text"
                name="Address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
                placeholder="Your Address"
                required
              />
            </div>
          </div>
          <div className="my-4">
            <label className="block text-[#636363] mb-2">Query</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]"
              placeholder="Your Query"
              name="Query"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <ButtonComponent text="Send" disabled={disableBtn} />
          </div>
        </form>
      </div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader className="flex flex-col items-center text-center">
            <DialogTitle className="text-[#44A05B] text-3xl md:text-4xl mb-4">
              Success!
            </DialogTitle>
            <div className="p-4 rounded-lg mb-4">
              <img src="/assets/images/tick.jpg" alt="success" />
            </div>
            <DialogDescription className="md:text-lg text-center">
              Your query has been recorded sucessfully. We will reach out to you
              soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
