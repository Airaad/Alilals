import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { GiAppleCore } from "react-icons/gi"; 

const TopNav = () => {
  return (
    <div className="hidden md:flex h-11 bg-gradient-to-r from-[#142827] via-[#1a3b33] to-[#142827] relative">
      <div className="flex-1 flex items-center justify-between gap-4 px-10">
        <div className="flex gap-8">
          <div className="flex items-center gap-1">
            <ClockIcon className="h-4 w-4 text-[#44A05B]" aria-hidden="true" />
            <span className="text-white text-xs lg:text-sm font-normal">
              Mon - Sat 8.00 - 18.00. Sun Closed
            </span>
          </div>

          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 w-4 text-[#44A05B]" aria-hidden="true" />
            <span className="text-white text-xs lg:text-sm font-normal">
              Rajbagh, Srinagar 190008.
            </span>
          </div>
        </div>


        <div className="flex items-center justify-center">
          <GiAppleCore className="text-[#44A05B] h-6 w-6" aria-hidden="true" />
        </div>

        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-1">
            <IoCallOutline className="text-[#44A05B]" />
            <span className="text-white text-xs lg:text-sm font-normal">
              0194-796-1490
            </span>
          </div>

          <div className="flex items-center gap-1">
            <CiMail className="text-[#44A05B]" />
            <span className="text-white text-xs lg:text-sm font-normal">
              info@alilals.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
