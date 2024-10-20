"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ServiceCard = ({ title, description, image, link, delay }) => {
  return (
    <motion.div
      className="relative bg-cover bg-center bg-no-repeat h-[350px] md:h-[400px] rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
      style={{
        backgroundImage: `url(${image})`,
      }}
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative h-full flex flex-col justify-end p-6 text-left">
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-200 mb-6">{description}</p>
        <Link href={link}>
          <button className="bg-[#44A05B] text-white font-medium py-2 px-5 rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors self-start">
            Book Service
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
