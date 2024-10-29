"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Testimonials() {
  const videos = [
    {
      id: 1,
      image: "https://img.youtube.com/vi/zlUHDAVDI80/hqdefault.jpg",
      description:
        "Roudf Ah Lone, an orchard owner from Kulgam, shares how Alilals Agrico has helped revolutionize his orchard. From high-density orchard development to innovative farming techniques.",
      youtubeLink: "https://youtu.be/zlUHDAVDI80?si=vJ6Rzy3SI0VQhHFN",
    },
    {
      id: 2,
      image: "https://img.youtube.com/vi/vOFnvRNrlqo/hqdefault.jpg",
      description:
        "Sartaj Ahmad shares his experience working with our Orchard Development services and how we've helped empower farmers to streamline their earning through high paying crops.",
      youtubeLink: "https://youtu.be/vOFnvRNrlqo?si=xd-K95YPQuLoXBaM",
    },
    {
      id: 3,
      image: "https://img.youtube.com/vi/3laUBzq4TXo/hqdefault.jpg",
      description:
        "Our growers express the utmost satisfaction with Alilals Agrico's exceptional services in High-Density Orchard Planning and Development, highlighting our commitment to innovation, precision, and productivity in every project.",
      youtubeLink: "https://youtu.be/3laUBzq4TXo?si=5oO9NiU7Uc2YCw9a",
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-[#142827]">
      <div className="text-center mb-14">
        <motion.h1
          className="text-5xl font-semibold text-[#44A05B] tracking-wide mb-2"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What People Say
          {/* <GiPlantSeed className="inline-block text-4xl text-[#388D4B]" /> */}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hear what our community has to say about our practices!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href={video.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                src={video.image}
                alt="Testimonial"
              />
            </a>
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-sm">
                <FaQuoteLeft className="text-xl font-bold text-[#C83219] inline-block mr-2" />
                {video.description}
                <FaQuoteRight className="text-xl font-bold text-[#C83219] inline-block ml-2" />
              </p>
              <a
                href={video.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 font-semibold transition-colors hover:text-[#388D4B]"
              >
                <FaYoutube className="mr-2 text-xl" /> Watch Video
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
