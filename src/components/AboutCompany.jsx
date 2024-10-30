import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ButtonComponent } from "./ButtonComponent";
import Link from "next/link";

const AboutCompany = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start md:space-x-8 py-12 px-6 bg-[#F6F2EF] md:px-20">
      <div className="lg:w-[30%] md:w-[50%] w-full mb-6 lg:mb-0">
        <img
          src="/assets/images/whoweare.jpg"
          alt="Company Image"
          className="lg:w-[600px] lg:h-[600px] object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="lg:w-1/2 w-full">
        <div className="flex gap-2 items-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">Who We Are</span>
        </div>
        <h2 className="text-4xl font-bold text-[#1A3A32] mb-4">
          Welcome to AlilasAgrico Pvt. Ltd
        </h2>
        <div className="mb-6">
          <p className="text-md text-[#636363] mb-4 text-justify">
            Our company is an agri-tech and innovations startup based in Jammu &
            Kashmir. We are focused on transforming the template horticulture
            landscape of the region through innovations and sustainable
            development. Specialising in sustainable orchards and precision
            farming, we provide farmers with tech support to increase yields,
            increase profitability and encourage environment friendly practices
            in farming. With a strong commitment to devlop rural communities,
            Alilas Agrico is setting new standards for modern and sustainable
            agriculture in J&K. Since inception in 2022, Alilas Agrico has saved
            over 100 growers in last two years with state of the art Orchard
            development and management services.
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

          <div className="mx-auto lg:mx-0 lg:mt-[80px]">
            <Link href="/contact">
              <ButtonComponent text="Contact Us" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
