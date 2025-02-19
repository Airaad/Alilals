"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApples } from "@/context/AppleContext";
import Banner from "@/components/Banner";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

const AppleVarietiesPage = () => {
  const { apples, loading, error } = useApples();
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = apples ? Math.ceil(apples.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApples = apples ? apples.slice(startIndex, endIndex) : [];

  if (loading) {
    return (
      <div>
        <Banner
          title="Apple Varieties"
          backgroundImage="/assets/images/apple_varieties.jpg"
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <h3 className="text-gray-800 font-semibold text-lg ml-2">
            Loading Varieties...
          </h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Banner
          title="Apple Varieties"
          backgroundImage="/assets/images/apple_varieties.jpg"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-semibold text-lg mb-2">Error</h3>
            <p className="text-red-600">
              There was an error loading apple varieties. Please try again
              later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!apples || apples.length === 0) {
    return (
      <div>
        <Banner
          title="Apple Varieties"
          backgroundImage="/assets/images/apple_varieties.jpg"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-gray-800 font-semibold text-lg mb-2">
              No Varieties Found
            </h3>
            <p className="text-gray-600">
              There are currently no apple varieties available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Banner
        title="Apple Varieties"
        backgroundImage="/assets/images/apple_varieties.jpg"
      />

      <div className="container mx-auto px-4 py-8 space-y-6">
        {currentApples.map((apple, index) => (
          <motion.div
            key={apple.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row bg-[#F6F2EF]">
              <div className="md:w-1/3 h-64 relative">
                <img
                  src={apple.imageUrl}
                  alt={apple.title}
                  className="w-full min-h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 p-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-4">{apple.title}</h2>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Characteristics:
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {apple.characteristics}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/apple-varieties/${apple.id}`}
                    className="px-3 py-3 bg-[#44A05B] text-white rounded-lg shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AppleVarietiesPage;
