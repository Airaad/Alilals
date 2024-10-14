"use client";
import React from "react";
import { FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing motion
import ContactForm from "@/components/ContactForm";

// Animation Variants
const fadeInScaleUp = {
  hidden: { opacity: 0, scale: 0.9 }, // Start invisible and slightly smaller
  visible: { opacity: 1, scale: 1 }, // Fade in and scale to normal size
};

const ServiceInfoPage = () => {
  return (
    <div>
      <div className="relative min-h-screen py-14 lg:p-20 bg-[url('/assets/images/water-sprinkler-880970_1280.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content Section */}
        <div className="relative z-10 flex items-center h-full">
          <div className="w-full lg:w-[60%] px-8 md:px-16">
            {/* Title */}
            <motion.h1
              className="text-[#44A05B] text-5xl font-semibold mb-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8 }} // Adjust duration for a smoother effect
            >
             Drip Irrigation
            </motion.h1>

            {/* Full Information Paragraph */}
            <motion.p
              className="text-gray-300 text-lg md:text-justify mb-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8, delay: 0.2 }} // Add delay for smooth entry
            >
              Drip irrigation is one of the most efficient methods of watering
              an orchard, designed to deliver water directly to the plant’s root
              zone in a slow and steady manner. Unlike traditional irrigation
              systems that spray water over a large area, drip irrigation allows
              precise control over water distribution, ensuring that each tree
              or plant gets exactly the amount of moisture it needs without
              waste. By targeting the root zone, it minimizes evaporation,
              runoff, and water loss, making it ideal for areas where water
              conservation is essential or where water is scarce. This system
              consists of a network of tubes, pipes, and emitters that slowly
              release water at the base of each tree or plant. The emitters can
              be adjusted to control the flow rate, ensuring that plants of
              different sizes and species receive the right amount of water.
              With a properly installed drip irrigation system, water is
              delivered in a way that reduces the risk of overwatering and
              underwatering, both of which can negatively affect plant health
              and productivity.
            </motion.p>

            {/* Benefits Section */}
            <motion.h2
              className="text-[#44A05B] text-3xl font-semibold mb-4"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Benefits
            </motion.h2>
            <ul className="space-y-4 mb-8">
              {[
                "Water Efficiency - Drip irrigation is designed to use water more efficiently by delivering it directly to the plants' root zones.",
                "Improved Plant Health - By ensuring that the roots receive a consistent supply of water, drip irrigation promotes healthier root development.",
                "Reduced Weed Growth - Since water is delivered only to the intended plants, the surrounding areas remain dry, minimizing weed growth.",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <FaLeaf className="text-[#44A05B] text-2xl" />
                  <motion.span
                    className="text-gray-300 text-lg lg:text-justify"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInScaleUp}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }} // Delay for each item
                  >
                    {benefit}
                  </motion.span>
                </li>
              ))}
            </ul>

            {/* Our Process Section */}
            <motion.h2
              className="text-green-400 text-3xl font-semibold mb-4"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Our Process
            </motion.h2>
            <ul className="space-y-6 mb-8">
              {[
                "Initial Consultation - We start with understanding your goals, evaluating the land and environmental factors.",
                "Customized Layout - Based on the analysis, we design an optimal layout to ensure healthy tree growth.",
                "Soil & Irrigation Planning - Comprehensive support for soil preparation and irrigation strategies.",
                "Ongoing Support - We assist you in maintaining tree health, pest control, and seasonal adjustments.",
              ].map((process, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <FaLeaf className="text-[#44A05B] text-2xl" />
                  <motion.span
                    className="text-gray-300 text-lg lg:text-justify"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInScaleUp}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }} // Delay for each item
                  >
                    {process}
                  </motion.span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default ServiceInfoPage;
