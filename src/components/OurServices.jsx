"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"; // Importing motion

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OurServices = () => {
  const sections = [
    {
      title: "Plantation",
      description:
        "Start your journey with our high-quality plants and expert guidance for a thriving orchard.",
      imgSrc: "/assets/images/pexels-alejandro-barron-21404-96715.jpg",
      link: 'service-info-plantation'
    },
    {
      title: "Trellis Infrastructure",
      description:
        "Enhance your orchard's productivity with our durable and efficient trellis systems designed for optimal growth.",
      imgSrc: "/assets/images/pexels-quang-nguyen-vinh-222549-2132250.jpg",
      link: 'service-info-trellis'
    },
    {
      title: "Drip Irrigation",
      description:
        "Optimize water usage and ensure healthy plants with our advanced drip irrigation solutions tailored for your needs.",
      imgSrc: "/assets/images/irrigation.jpeg",
      link: 'service-info-irrigation'
    },
  ];

  return (
    <div className="px-12 py-16 bg-[#142827]">
      <div className="flex flex-col justify-center items-center gap-5 mb-16">
        <div className="text-center">
          <motion.h1 
            className="text-5xl font-semibold text-[#44A05B] tracking-wide mb-2" 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeInUp} 
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-300 font-light" 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeInUp} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Delivering sustainability through innovation in orchard care and farming.
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-16 lg:p-8 p-5 lg:gap-32 mx-auto">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="flex flex-1 flex-col gap-6 justify-between items-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }} // Delay for each section
          >
            <div className="flex flex-col gap-4 items-center text-center">
              <Image
                src={section.imgSrc}
                alt={section.title}
                width={200}
                height={200}
                className="object-cover w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-[#44A05B] hover:scale-110 hover:border-white transition-transform duration-300 shadow-lg"
              />
              <h2 className="text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="text-sm text-[#a9b3b1] max-w-xs">
                {section.description}
              </p>
            </div>

            <Link href={section.link}>
              <button className="px-8 py-3 bg-[#44A05B] text-white text-lg font-medium rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300">
                Explore Service
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
