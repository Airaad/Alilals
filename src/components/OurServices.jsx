import Image from "next/image";
import React from "react";
import { ButtonComponent } from "./ButtonComponent";

const OurServices = () => {
  return (
    <div className='p-8 bg-[#202221] bg-[url("https://www.transparenttextures.com/patterns/cartographer.png")]'>
      <div className="flex flex-col justify-center items-center gap-5 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-white">Our Services</h1>
          <div className="h-[0.15rem] bg-[#44A05B] w-full " />
        </div>
        <div className="md:w-[70%] mx-auto">
          <p className="text-sm text-[#636363] text-center">
            With over 15 years of experience and a strong commitment to
            sustainability, you can count on us for all your farming needs. From
            crop management to modern irrigation systems, we provide
            professional agricultural solutions for both small farms and
            large-scale operations. Trust us to deliver reliable, eco-friendly
            services tailored to enhance your farm's productivity and success.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly w-full md:w-[90%] md:p-5 p-3 gap-5 mx-auto ">
        <div className="flex flex-1 flex-col gap-5 justify-between items-center  transition-transform duration-300 transform hover:scale-105">
          <div className="flex flex-col gap-3">
            <img
              src={`/assets/images/irrigation-2402568_1280.jpg`}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-center text-2xl font-semibold text-white">
              Orchard Care
            </h2>
          </div>
          <div className="h-[0.15rem] bg-[#44A05B] w-[80%] md:w-full " />
          <p className="text-center text-sm text-[#636363]">
            Empowering farmers with eco-friendly practices that improve soil
            health, and ensure long-term sustainability.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-5 justify-between items-center  transition-transform duration-300 transform hover:scale-105">
          <div className="flex flex-col gap-3">
            <img
              src={`/assets/images/vietnam-6634082_1280.jpg`}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-center text-2xl font-semibold text-white">
              Soil Testing
            </h2>
          </div>
          <div className="h-[0.15rem] bg-[#44A05B] w-[80%] md:w-full " />
          <p className="text-center text-sm text-[#636363]">
            Utilizing modern technology, data, and analytics to enhance crop
            productivity and reduce waste.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-5 justify-between items-center  transition-transform duration-300 transform hover:scale-105">
          <div className="flex flex-col gap-3">
            <img
              src={`/assets/images/apples-1872997_1280.jpg`}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-center text-2xl font-semibold text-white">
              Orchard Infra
            </h2>
          </div>
          <div className="h-[0.15rem] bg-[#44A05B] w-[80%] md:w-full " />
          <p className="text-center text-sm text-[#636363]">
            Comprehensive soil analysis to maximize fertility and provide
            customized solutions for crop growth.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <ButtonComponent text="More Services" />
      </div>
    </div>
  );
};

export default OurServices;
