import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";

const OrchidSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-8 px-5 md:px-8 lg:justify-evenly">
      <div className="flex items-center gap-2 md:gap-9 mb-4 md:mb-0">
        <div className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#636363]">
          <FaShoppingBag className="text-5xl text-[#636363]" />
        </div>

        <div>
          <h2 className="text-xl md:text-3xl font-semibold text-[#44A05B]">
            Buy Orchids
          </h2>
          <p className="text-sm md:text-md">
            Want to setup a field of your own. Book now
          </p>
        </div>
      </div>
      <div>
        <Link href="/estimation-calculator">
          <ButtonComponent text="Buy Now" />
        </Link>
      </div>
    </div>
  );
};

export default OrchidSection;
