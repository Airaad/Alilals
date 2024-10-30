"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TreePalm, Pickaxe, Apple, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getAllStats } from "../../firebase/stats/read";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const icons = {
  "Trees Planted": <TreePalm size={50} />,
  "Hectares Developed": <Pickaxe size={50} />,
  "Projects Delivered": <ClipboardCheck size={50} />,
  "Farmers Connected": <Apple size={50} />,
};

export function WhyChooseUs() {
  const [statsData, setStatsData] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [values, setValues] = useState(statsData.map(() => 0));

  useEffect(() => {
    if (!statsData.length) {
      getAllStats().then((data) => {
        setStatsData(data);
      });
    }

    const handleScroll = () => {
      const statsSection = document.getElementById("stats-section");

      // Check if the element exists before proceeding
      if (!statsSection) return;

      const sectionPosition = statsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (sectionPosition < screenPosition && !hasAnimated) {
        animateNumbers();
        setHasAnimated(true);
      }
    };

    const animateNumbers = () => {
      statsData.forEach((stat, index) => {
        let currentValue = 0;
        const increment = Math.ceil(stat.value / 100);
        const duration = 1500; // Duration in milliseconds
        const frameRate = 1000 / 60;

        const interval = setInterval(
          () => {
            currentValue += increment;
            if (currentValue >= stat.value) {
              currentValue = stat.value;
              clearInterval(interval);
            }
            setValues((prev) => {
              const newValues = [...prev];
              newValues[index] = currentValue;
              return newValues;
            });
          },
          duration / (stat.value / increment),
        );
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated, statsData]);

  return (
    <>
      <div className="bg-[#F6F2EF] grid grid-col-1 lg:grid-cols-[40%_58%] gap-10 pt-10 px-10 md:px-16 md:pt-16">
        {/* Left Section with Images */}
        <div className="w-full flex justify-center relative space-x-4">
          <motion.div
            className="flex flex-col space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Image
              src="/assets/images/whychooseus.jpg"
              alt="Plant Image"
              width={700}
              height={900}
              className="rounded-lg shadow-lg object-cover"
            />
          </motion.div>
        </div>
        {/* Right Section with Text and Progress Bars */}
        <motion.div
          className="mt-10 md:mt-0 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[#44A05B] uppercase text-lg font-semibold mb-2">
            Why Choose Us
          </h3>
          <h1 className="text-5xl font-bold text-gray-800 leading-snug">
            Farming with passion, feeding with purpose
          </h1>
          <p className="text-gray-500 mt-4 mb-8">
            Lorem ipsum dolor sit amet consectetur. Amet lectus mi ultricies
            dictum facilisis sem. Imperdiet massa turpis sit Lorem ipsum dolor
            sit amet consectetur. Amet the lectus mi ultricies dictum facilisis
            sem.
          </p>
          {/* Progress Bars */}
          <div className="mb-4">
            <p className="text-gray-800 font-medium mb-1">
              FarmSmart Innovations
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#44A05B] h-2.5 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-1">CropCare Solutions</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#44A05B] h-2.5 rounded-full w-2/3"></div>
            </div>
          </div>

          {/* Button */}
          <Link href="/about">
            <button className="bg-[#44A05B] text-white px-6 py-3 rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors">
              Read More →
            </button>
          </Link>
        </motion.div>
      </div>

      <section
        id="stats-section"
        className="w-full py-12 bg-cover bg-center text-white bg-[#F6F2EF]  px-16 md:px-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {statsData.map((stat, index) => (
              <div key={index} className="group">
                <div className="p-6 rounded-lg text-[#44A05B]">
                  <div className="flex gap-5 text-5xl items-center justify-center font-bold stat-number">
                    <span>{icons[stat.title]}</span>
                    {values[index]}
                  </div>
                  <hr className="my-4 border-[#44A05B]" />
                  <p className="text-xl">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
