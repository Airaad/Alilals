import React from "react";

const ContactHero = () => {
  return (
    <div className="relative h-[515px] bg-[url('/assets/images/pexels-nc-farm-bureau-mark-2252576.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex justify-center items-center h-full">
        <h1 className="text-white text-4xl md:text-6xl font-bold">
          Contact Us
        </h1>
      </div>

      <div className="absolute top-0 left-0 w-0 h-0 border-t-[70px] border-t-[#44A05B] border-r-[50px] border-r-transparent"></div>

      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[70px] border-b-[#44A05B] border-l-[50px] border-l-transparent"></div>
    </div>
  );
};

export default ContactHero;
