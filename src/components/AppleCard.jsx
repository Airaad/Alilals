"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

const AppleCard = ({ apple }) => {
  return (
    <CardContainer>
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl border">
        <CardItem translateZ="80" className="w-full">
          {/* Image with gradient overlay */}
          <div className="relative">
            <img
              src={apple.imageUrl}
              className="h-72 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={apple.title}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 rounded-xl">
              {/* Title container */}
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <h3 className="text-3xl font-bold text-white text-center px-4 tracking-wide">
                  {apple.title}
                </h3>
                <div className="w-16 h-1 bg-[#44A05B] mt-3 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* More Info button */}
          <div className="absolute bottom-5 right-5">
            <Link
              href={`/apple-varieties/${apple.id}`}
              className="text-white bg-[#44A05B] px-4 py-2 rounded-lg shadow-md hover:bg-[#388047] transition-colors duration-300 font-medium"
            >
              More Info
            </Link>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default AppleCard;
