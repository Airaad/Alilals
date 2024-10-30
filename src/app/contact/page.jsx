import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfor";
import React from "react";
import { RiLeafFill } from "react-icons/ri";

const Contact = () => {
  return (
    <div>
      <Banner title="Contact Us" backgroundImage="/assets/images/contact.jpg" />
      <div className="px-8 md:px-12 py-10 bg-[#F6F4EC]">
        <div className="flex gap-2 items-center ">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">Contact Us</span>
        </div>
        <h2 className="text-4xl font-bold text-[#202221] mb-4">Contact Info</h2>
        <div className="h-[0.09rem] bg-[#44A05B] w-full mb-8" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[40%,60%]">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
