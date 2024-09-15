"use client";

import { React } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PageTitle = ({ pageTitle }) => {
  const pathname = usePathname();

  return (
    <div className="md:h-[10vh] bg-gray-100 py-4 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col lg:flex-row justify-between items-center">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 lg:mb-0 md:ml-24">
        {pageTitle}
      </h1>

      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm lg:text-base text-gray-500 text-center lg:text-left">
        <span className="block lg:inline">You Are Here:</span>
        <Link href="/" className="font-semibold text-gray-700 hover:underline">
          {" "}
          HOME{" "}
        </Link>
        <span className="mx-1"></span>
        <span>{pathname}</span>
      </div>
    </div>
  );
};

export default PageTitle;
