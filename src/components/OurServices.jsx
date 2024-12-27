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
      title: "Orchard Development",
      description:
        "We oﬀer High Density Orchard Development services with most authentic plant material acquired from Europ’s internationally recognised fruit tree nurseries. We use standard grade materials for Trellis and Irrigation installations having greater strength and longer durability.",
      imgSrc: "/assets/images/OrchardDevelopment.png",
      link: "services/orchard-development",
    },
    {
      title: "Soil Health Management",
      description:
        "Optimize your orchard's growth with a comprehensive soil health analysis. Our tailored soil management solutions ensure your land is primed for success.",
      imgSrc: "/assets/images/soil-8166778_1280.jpg",
      link: "services/soil-health-management",
    },
    {
      title: "Expert Advice",
      description:
        "Receive expert guidance on every aspect of orchard development. From planting to management, our seasoned professionals are here to help you thrive.",
      imgSrc: "/assets/images/pexels-chokniti-khongchum-1197604-2280551.jpg",
      link: "services/expert-advice",
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
            viewport={{ once: true }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 font-light"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Delivering sustainability through innovation in Orchard Designing
            and after care.
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
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
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
