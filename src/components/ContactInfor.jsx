import React from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { RiLeafFill } from "react-icons/ri";

const ContactInfo = () => {
  const offices = [
    {
      name: "Head Office",
      address:
        "56 Murad House, Pine Lane-8, Kursk Rajbagh, Srinagar-190008, Jammu & Kashmir",
      phone: "0194-796-1490",
      email: "info@alilas.com",
    },
    {
      name: "Sub Office",
      address: "Ziraat Orchards Circular Road, That Crossing, Pulwama",
      phone: "8899-888-983",
      email: "info@alilas.com",
    },
    {
      name: "Soil Testing Lab",
      address: "Alamdar Reoad, Chadora Near; Khyber Girls School",
      phone: "0195-146-4419",
      email: "info@alilas.com",
    },
  ];

  return (
    <div className="py-12 px-6 bg-[#F6F4EC]">
      <div className="flex gap-2 items-center">
        <RiLeafFill className="text-[#44A05B]" />
        <span className="text-[#44A05B]">Contact Us</span>
      </div>
      <h2 className="text-4xl font-bold text-[#202221] mb-4">Contact Info</h2>
      <div className="h-[0.09rem] bg-[#44A05B] w-full mb-8" />

      <div className="grid gap-8 md:grid-cols-2">
        {offices.map((office, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-[#44A05B] mb-4">
              {office.name}
            </h3>
            <div className="flex items-start mb-4">
              <MapPinIcon className="h-6 w-6 text-[#44A05B] mr-3" />
              <p className="text-[#202221]">{office.address}</p>
            </div>
            <div className="flex items-start mb-4">
              <PhoneIcon className="h-6 w-6 text-[#44A05B] mr-3" />
              <p className="text-[#202221]">{office.phone}</p>
            </div>
            <div className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-[#44A05B] mr-3" />
              <p className="text-[#202221]">{office.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
