'use client'
import React from "react";
import { FaLeaf } from "react-icons/fa"; 
import { motion } from "framer-motion"; // Importing motion
import ContactForm from "@/components/ContactForm";

// Animation Variants
const fadeInScaleUp = {
  hidden: { opacity: 0, scale: 0.9 }, // Start invisible and slightly smaller
  visible: { opacity: 1, scale: 1 },  // Fade in and scale to normal size
};

const ServiceInfoPage = () => {
  return (
    <div>
    <div className="relative min-h-screen py-14 lg:p-20 bg-[url('/assets/images/apples-1873078_1280.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Content Section */}
      <div className="relative z-10 flex items-center h-full">
        <div className="w-full lg:w-[60%] px-8 md:px-16">
          {/* Title */}
          <motion.h1 
            className="text-[#44A05B] text-5xl font-bold mb-6" 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeInScaleUp} 
            transition={{ duration: 0.8 }} // Adjust duration for a smoother effect
          >
            Plantation
          </motion.h1>

          {/* Full Information Paragraph */}
          <motion.p 
            className="text-gray-300 text-lg md:text-justify mb-6" 
            initial="hidden" 
            whileInView="visible" 
            variants={fadeInScaleUp} 
            transition={{ duration: 0.8, delay: 0.2 }} // Add delay for smooth entry
          >
            Our plantation services are designed to help you create and nurture
            a sustainable and flourishing orchard. From the initial planning
            stages to ongoing support, we offer a comprehensive approach to
            planting that considers every aspect of your land, environment, and
            goals. Whether you’re looking to establish a small family orchard or
            expand a large-scale commercial plantation, our team of experts will
            guide you through the entire process. We begin by conducting a
            thorough analysis of your soil and climate conditions, ensuring that
            the trees you plant are suited to thrive in your specific
            environment. Our specialists will assist in selecting the best
            species and cultivars for your orchard, helping you maximize yield
            and minimize risks such as pests, diseases, and environmental
            stress. We provide expert advice on the optimal layout of your
            orchard, taking into account factors like sunlight exposure, wind
            patterns, and irrigation needs, ensuring your trees are positioned
            for healthy growth. But our services don’t stop at planting – we
            offer continued support in managing your orchard as it matures,
            including soil health management, pruning techniques, and pest
            control strategies. With our plantation services, you can rest
            assured that your orchard will grow strong, healthy, and productive
            for many years to come, providing a sustainable source of fresh
            produce for your business or family. Whether you’re planting apple
            trees, citrus groves, or any other fruit-bearing crops, we’re here
            to help you every step of the way, from seedling to harvest.
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
            {["Sustainable Practices - Environmentally-friendly solutions for long-term success.",
              "Increased Productivity - Tailored plantation services for maximum yield.",
              "Expert Guidance - Ongoing support and consultation throughout your orchard’s growth."
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
            {["Initial Consultation - We start with understanding your goals, evaluating the land and environmental factors.",
              "Customized Layout - Based on the analysis, we design an optimal layout to ensure healthy tree growth.",
              "Soil & Irrigation Planning - Comprehensive support for soil preparation and irrigation strategies.",
              "Ongoing Support - We assist you in maintaining tree health, pest control, and seasonal adjustments."
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
    <ContactForm/>
    </div>
  );
};

export default ServiceInfoPage;
