import React from "react";
import { LuPhoneCall } from "react-icons/lu";
import { FaMapMarkedAlt } from "react-icons/fa";
import { LuMailOpen } from "react-icons/lu";

const FooterComp = () => {
  return (
    <div className='flex flex-col md:flex-row  items-center md:justify-evenly bg-[#202221] bg-[url("https://www.transparenttextures.com/patterns/cartographer.png")]'>
      <div className="flex items-center justify-center gap-5  w-80 h-36">
        <LuPhoneCall className="text-4xl text-white" />
        <div>
          <h2 className="text-lg font-semibold text-white">Phone</h2>
          <span className="text-md text-white">999 888 0000</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 w-80 h-36">
        <FaMapMarkedAlt className="text-4xl text-white" />
        <div>
          <h2 className="text-lg font-semibold text-white">Address</h2>
          <span className="text-md text-white">Rajbagh, 190008</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 w-80 h-36">
        <LuMailOpen className="text-4xl text-white" />
        <div>
          <h2 className="text-lg font-semibold text-white">Email</h2>
          <span className="text-md text-white">example@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default FooterComp;
