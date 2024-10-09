import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { FaShoppingBag, FaUser, FaFlask } from "react-icons/fa"; // Import additional icons
import Link from "next/link";

const OrchidSection = () => {
  return (
    <div className="flex flex-col items-center gap-10 justify-between py-8 px-5 md:px-8 lg:justify-evenly bg-[#F6F2EF]">
      {/* Section 1: Buy Orchids */}
      <div className='flex items-center justify-between w-full lg:w-2/3 mb-4'>

      <div className="flex items-center gap-2 md:gap-9 mb-4 md:mb-0">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#636363]">
          <FaShoppingBag className="text-5xl text-[#636363]" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-[#44A05B]">Buy Orchard</h2>
          <p className="text-xs md:text-md">Want to set up a field of your own? Book now.</p>
        </div>
      </div>
      
      <div>
        <Link href="/book-orchid">
          <ButtonComponent text="Buy Now" />
        </Link>
      </div>

      </div>

      {/* Section 2: Book a Soil Test */}
      <div className='flex items-center justify-between w-full lg:w-2/3 mb-4'>

      <div className="flex items-center gap-2 md:gap-9 mb-4 md:mb-0">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#636363]">
          <FaFlask className="text-5xl text-[#636363]" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-[#44A05B]">Book Soil Test</h2>
          <p className="text-xs md:text-md">Get a comprehensive analysis of your soil.</p>
        </div>
      </div>
      <div>
        <Link href="/book-soil-test">
          <ButtonComponent text="Book Now" />
        </Link>
      </div>

      </div>

      {/* Section 3: Speak to Our Expert */}
      <div className='flex items-center justify-between w-full lg:w-2/3 mb-4'>

      <div className="flex items-center gap-2 md:gap-9 mb-4 md:mb-0">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#636363]">
          <FaUser className="text-5xl text-[#636363]" />
        </div>
        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-[#44A05B]">Speak to Expert</h2>
          <p className="text-xs md:text-md">Consult with our specialists for personalized advice.</p>
        </div>
      </div>
      <div>
        <Link href="/speak-to-expert">
          <ButtonComponent text="Speak Now" />
        </Link>
      </div>

      </div>
      
    </div>
  );
};

export default OrchidSection;
