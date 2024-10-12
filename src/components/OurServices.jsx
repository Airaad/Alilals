'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const OurServices = () => {
  const [visibleSections, setVisibleSections] = useState([false, false, false]);

  const sections = [
    {
      title: "Plantation",
      description:
        "Start your journey with our high-quality plants and expert guidance for a thriving orchard.",
      imgSrc: "/assets/images/pexels-alejandro-barron-21404-96715.jpg",
    },
    {
      title: "Trellis Infrastructure",
      description:
        "Enhance your orchard's productivity with our durable and efficient trellis systems designed for optimal growth.",
      imgSrc: "/assets/images/pexels-quang-nguyen-vinh-222549-2132250.jpg",
    },
    {
      title: "Drip Irrigation",
      description:
        "Optimize water usage and ensure healthy plants with our advanced drip irrigation solutions tailored for your needs.",
      imgSrc: "/assets/images/irrigation.jpeg",
    },
  ];

  const handleVisibilityChange = (index) => {
    setVisibleSections((prev) => {
      const newVisible = [...prev];
      newVisible[index] = true;
      return newVisible;
    });
  };

  return (
    <div className="px-12 py-16 bg-[#142827]">
      <div className="flex flex-col justify-center items-center gap-5 mb-16">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-[#44A05B] tracking-wide mb-2">
            Our Services
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Delivering sustainability through innovation in orchard care and farming.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-16 lg:p-8 p-5 lg:gap-32 mx-auto">
        {sections.map((section, index) => {
          const [ref, inView] = useInView({
            triggerOnce: false, // Allow re-triggering
            threshold: 0.1, // Trigger when 10% of the element is in view
          });

          useEffect(() => {
            if (inView) {
              const timeout = setTimeout(() => {
                handleVisibilityChange(index);
              }, index * 100); // Delay for each section based on index
              return () => clearTimeout(timeout); // Cleanup timeout on unmount
            } else {
              // Reset visibility when it goes out of view
              setVisibleSections((prev) => {
                const newVisible = [...prev];
                newVisible[index] = false; // Reset the visibility state
                return newVisible;
              });
            }
          }, [inView, index]);

          return (
            <div
              ref={ref}
              key={index}
              className={`flex flex-1 flex-col gap-6 justify-between items-center transition-opacity duration-500 transform ${
                visibleSections[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
            >
              <div className="flex flex-col gap-4 items-center text-center">
                <Image
                  src={section.imgSrc}
                  alt={section.title}
                  width={200}
                  height={200}
                  className="object-cover w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-[#44A05B] hover:scale-110 hover:border-white transition-transform duration-300 shadow-lg"
                />
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <p className="text-sm text-[#a9b3b1] max-w-xs">{section.description}</p>
              </div>
    
              <button className="px-8 py-3 bg-[#44A05B] text-white text-lg font-medium rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300">
                Discover More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurServices;
