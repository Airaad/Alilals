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
      <div className="relative min-h-screen py-14 lg:p-20 bg-[url('/assets/images/pexels-quang-nguyen-vinh-222549-2132250.jpg')] bg-cover bg-center">
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
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Trellis Infrastructure
            </motion.h1>

            {/* Full Information Paragraph */}
            <motion.p
              className="text-gray-300 text-lg md:text-justify mb-6"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Trellis infrastructure plays a crucial role in modern orchard
              management, offering a strategic framework to support the growth,
              health, and productivity of fruit-bearing plants. In essence, a
              trellis system consists of a series of stakes, wires, or lattices
              installed to provide physical support to crops such as apples,
              grapes, peaches, or kiwifruit. It ensures that the plants grow
              vertically, optimizing space usage, light exposure, and airflow.
              This controlled structure allows the plants to channel their
              energy into fruit production rather than competing with gravity or
              tangled vines, leading to healthier crops and higher yields. One
              of the primary reasons for implementing a trellis infrastructure
              in an orchard is to enhance the overall organization of the
              planting area. As plants are trained to grow in specific
              directions, the trellis system helps reduce overcrowding and
              minimizes plant competition. This organized layout makes it easier
              to manage the orchard, providing clear access for maintenance
              tasks such as pruning, harvesting, and pest control. At its core,
              trellising creates an environment that encourages plants to
              flourish by promoting better airflow and sunlight penetration.
              Adequate sunlight exposure is vital for photosynthesis, which
              directly impacts fruit development, while improved airflow reduces
              the risk of fungal diseases that thrive in damp, poorly ventilated
              environments. Additionally, the trellis structure aids in the
              prevention of soil-borne diseases since plants are lifted off the
              ground, reducing contact with contaminated soil.
            </motion.p>

            {/* Benefits Section */}
            <motion.h2
              className="text-[#44A05B] text-3xl font-semibold mb-4"
              initial="hidden"
              whileInView="visible"
              variants={fadeInScaleUp}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Benefits
            </motion.h2>
            <ul className="space-y-4 mb-8">
              {[
                "Improved Yield and Quality - Trellis systems maximize sunlight exposure and improve air circulation, both essential factors in fruit development.",
                "Efficient Space Utilization - By guiding plants to grow vertically, trellises make the most of the available space, especially in small or densely planted orchards.",
                "Enhanced Pest and Disease Control - Elevating the plants from the soil and organizing them in a structured way reduces the spread of diseases and pests.",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <FaLeaf className="text-[#44A05B] text-2xl" />
                  <motion.span
                    className="text-gray-300 text-lg lg:text-justify"
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInScaleUp}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
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
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
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
