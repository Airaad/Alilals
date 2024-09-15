"use client";
import React, { useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

const services = [
  {
    id: 1,
    title: "Quality",
    description:
      "At the core of our services is a commitment to unparalleled quality. We ensure that every product and service undergoes rigorous testing and meets the highest standards of excellence.",
    icon: <GrStatusGood />,
  },
  {
    id: 2,
    title: "Security",
    description:
      "Your trust is our priority. We implement top-tier security measures to protect your data and ensure that all processes are safeguarded against unauthorized access.",
    icon: <MdOutlineSecurity />,
  },
  {
    id: 3,
    title: "Delivery",
    description:
      "Timely and efficient delivery is key to our service. We understand the importance of meeting deadlines and ensure that your products and services reach you on time, every time.",
    icon: <CiDeliveryTruck />,
  },
];

export function WhatWeOffer() {
  const [selectedService, setSelectedService] = useState(services[0]);

  const backgroundStyle = {
    backgroundColor: "#f6f4ec",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/arches.png")',
  };

  return (
    <section style={backgroundStyle} className="py-16 bg-[#F6F4EC]">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl font-semibold text-black">What We Offer</h1>
          <div className="h-[0.15rem] bg-[#44A05B] w-full " />
        </div>
        <div className="flex flex-col md:flex-row p-8">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className={`cursor-pointer w-44 h-44 p-6 border-2 shadow-lg border-gray-200 rounded-lg transition-all duration-300 ${
                  selectedService?.id === service.id
                    ? "bg-[#44A05B] text-white"
                    : "bg-[#F6F4EC] text-[#122F2A] hover:bg-gray-200"
                }`}
              >
                <div className="flex flex-col items-center gap-5">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <span className="text-6xl">{service.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        {selectedService && (
          <div
            style={backgroundStyle}
            className=" p-6 bg-[#F6F4EC] rounded-lg flex flex-col items-center"
          >
            <div className="my-4 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-3">
                {selectedService.title}
              </h2>
              <div className="h-[0.15rem] bg-[#202221] w-8 " />
            </div>
            <p className="mt-2 text-lg text-center w-[75%]">
              {selectedService.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
