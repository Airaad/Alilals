"use client";

import AppleVarieties from "@/components/AppleVarieties";
import { useApples } from "@/context/AppleContext";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const VarietyDetails = () => {
  const { apples, loading, error } = useApples();
  const { appleId } = useParams();
  const [apple, setApple] = useState(null);

  useEffect(() => {
    if (!apple && !loading && !error) {
      const selectedApple = apples.find((a) => a.id == appleId);
      setApple(selectedApple);
    }
  }, [appleId, apples, loading, error, apple]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <span className="ml-4 text-lg">Loading Variety Details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="ml-4 text-lg">
          Error fetching variety. Please try again later.
        </span>
      </div>
    );
  }

  if (!apple) {
    return <div className="text-center">No such variety found.</div>;
  }

  return (
    <div>
      <motion.div
        className="container mx-auto p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image & Characteristics */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
          <img
            src={apple.imageUrl}
            alt={apple.name}
            className="w-full md:w-96 h-60 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1 text-gray-700 text-justify">
            <p>{apple.characteristics}</p>

            {/* Download Button Below Characteristics */}
            <div className="flex justify-start mt-5">
              <a
                href={apple.pdfUrl}
                download
                className="px-4 flex py-2 bg-[#44A05B] text-white rounded-lg shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300"
              >
                <Calendar />
                <p className="pl-2">Harvest Time</p>
              </a>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
          {/* Fruit Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Fruit Info
            </h3>
            <ul className="text-gray-600">
              <li>
                <strong>Colour:</strong> {apple.colour}
              </li>
              <li>
                <strong>Flavour:</strong> {apple.flavour}
              </li>
              <li>
                <strong>Shape:</strong> {apple.shape}
              </li>
              <li>
                <strong>Skin:</strong> {apple.skin}
              </li>
              <li>
                <strong>Fruit Flesh:</strong> {apple.fruitFlesh}
              </li>
            </ul>
          </div>

          {/* Tree Info */}
          <div className="border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Tree Info
            </h3>
            <ul className="text-gray-600">
              <li>
                <strong>Vigour:</strong> {apple.vigour}
              </li>
              <li>
                <strong>Blossom:</strong> {apple.blossom}
              </li>
              <li>
                <strong>Pollinator:</strong> {apple.pollinator}
              </li>
            </ul>
          </div>

          {/* Performance / Elevation Info */}
          <div className="border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Performance & Elevation
            </h3>
            <ul className="text-gray-600">
              <li>
                <strong>Growth:</strong> {apple.growth}
              </li>
              <li>
                <strong>Maturity:</strong> {apple.maturity}
              </li>
              <li>
                <strong>Size:</strong> {apple.size}
              </li>
            </ul>
          </div>
        </div>

        {/* Company Experience */}
        <div className="border-t mt-6 pt-6 text-gray-700">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Company Experience
          </h3>
          <p className="text-justify">{apple.companyExp}</p>
        </div>
      </motion.div>
      <AppleVarieties />
    </div>
  );
};

export default VarietyDetails;
