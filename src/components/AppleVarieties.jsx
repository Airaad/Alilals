"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApples } from "@/context/AppleContext";
import Link from "next/link";
import AppleCard from "./AppleCard";

const AppleVarieties = () => {
  const { apples, loading, error } = useApples();

  // Show only the first 4 apple varieties
  const displayedApples = apples?.slice(0, 3) || [];

  return (
    <div className="py-16 bg-[#F6F2EF]">
      {/* Heading Section */}
      <motion.div
        className="flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#44A05B]">
          Discover Apple Varieties
        </h2>
        <p className="text-lg text-gray-600 font-light text-center px-4 md:px-0">
          A Guide to Different Tastes, Textures, and Colors
        </p>
      </motion.div>

      {/* Apple Variety Cards */}
      <div className="my-10 flex justify-center flex-wrap gap-6 container mx-auto px-5 md:px-0">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="col-span-3 flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Loading Varieties...
            </h2>
          </motion.div>
        )}

        {error && !loading && !displayedApples.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="col-span-3 flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              Error occurred in fetching varieties
            </h2>
          </motion.div>
        )}

        {!displayedApples.length && !loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="col-span-3 flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">
              No varieties found!
            </h2>
          </motion.div>
        )}

        {!loading &&
          !error &&
          displayedApples.length > 0 &&
          displayedApples.map((apple) => (
            <AppleCard apple={apple} key={apple.id} />
          ))}
      </div>

      {/* See More Button */}
      {displayedApples.length > 0 && (
        <div className="text-center">
          <Link
            href="/apple-varieties"
            className="px-8 py-3 bg-[#44A05B] text-white text-lg font-medium rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300"
          >
            More Varieties
          </Link>
        </div>
      )}
    </div>
  );
};

export default AppleVarieties;
