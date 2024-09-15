import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

const TopNav = () => {
  const backgroundStyle = {
    backgroundColor: "#f6f4ec",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/arches.png")',
  };

  return (
    <div style={backgroundStyle} className="hidden md:flex h-11 bg-[#F6F4EC] ">
      <div
        className="bg-[#44A05B] w-16 md:w-28"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)",
        }}
      />
      <div className="flex-1 flex items-center justify-between gap-4 px-10">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-green-500" aria-hidden="true" />
            <span className="text-[#636363] text-sm font-semibold">
              Mon - Sat 8.00 - 18.00. Sun Closed
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4 text-green-500" aria-hidden="true" />
            <span className="text-[#636363] text-sm font-semibold">
              Rajbagh, Srinagar 190008.
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <IoCallOutline className="text-[#44A05B]" />
            <span className="text-[#636363] text-sm font-semibold">
              999 888 0000
            </span>
          </div>

          <div className="flex items-center gap-1">
            <CiMail className="text-[#44a05b]" />
            <span className="text-[#636363] text-sm font-semibold">
              example@gmail.com
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-[#44A05B] w-16 md:w-28"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
        }}
      />
    </div>
  );
};

export default TopNav;
