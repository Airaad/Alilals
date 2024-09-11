import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ButtonComponent } from "./ButtonComponent";

const AboutCompany = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 py-12 px-6 bg-[#F6F4EC]">
      <div className="md:w-[30%] w-full mb-6 md:mb-0">
        <img
          src="/assets/images/pexels-pixabay-255501.jpg"
          alt="Company Image"
          className="md:h-[600px] lg:w-[600px] lg:h-[600px] object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="md:w-1/2 w-full">
        <div className="flex gap-2 items-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">OUR ABOUT US</span>
        </div>
        <h2 className="text-4xl font-bold text-[#122F2A] mb-4">
          Welcome to AlilasAgrico
        </h2>
        <div className="mb-6">
          <p className="text-md text-[#636363] mb-4">
            Our company is dedicated to delivering exceptional services and
            innovative solutions to meet our clients' needs. We believe in
            quality, transparency, and customer satisfaction.
          </p>
          <div className="h-[0.09rem] bg-[#44A05B] w-full " />
        </div>

        {/* Features Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Outstanding customer service and support</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Innovative and customized solutions for your business.</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Commitment to sustainability and eco-friendly practices.</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>
                Strong partnerships and collaborative efforts to achieve
                success.
              </p>
            </div>
          </div>

          <div className="mx-auto md:mx-0 md:mt-[100px] lg:mt-[220px]">
            <ButtonComponent text="Contact Us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
