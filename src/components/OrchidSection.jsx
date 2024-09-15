import React from "react";
import { ButtonComponent } from "./ButtonComponent";
import { FaShoppingBag } from "react-icons/fa";

const OrchidSection = () => {
  return (
    <div className="flex items-center justify-between py-8 px-5 md:px-8 lg:justify-evenly">
      <div className="flex items-center gap-2 md:gap-9">
        <div className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-[#636363]">
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
        <ButtonComponent text="Buy Now" />
      </div>
    </div>
  );
};

export default OrchidSection;
