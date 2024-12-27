"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/context/ProjectContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturedWork = () => {
  const { projects } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default for desktop

  useEffect(() => {
    // Function to handle screen resizing
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setItemsPerPage(1); // Show 1 item on mobile
      } else {
        setItemsPerPage(3); // Show 3 items on larger screens
      }
    };

    // Set itemsPerPage based on initial screen size
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [projects]);

  const handleNext = () => {
    if (currentIndex < projects.length - itemsPerPage) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  return (
    <section className="py-16 h-auto bg-[#F6F2EF] relative">
      <motion.div
        className="flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#44A05B]">
          Featured Orchards
        </h2>
        <p className="text-lg text-gray-600 font-light text-center px-4 md:px-0">
          We take pride in our work
        </p>
      </motion.div>

      <div className="relative container mx-auto px-6 mt-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {/* Slice the projects based on currentIndex and itemsPerPage */}
          {projects
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((project) => (
              <Link href={`/our-projects/${project.id}`} key={project.id}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  imageUrl={project.imageUrl}
                />
              </Link>
            ))}
        </motion.div>

        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-[50%] transform -translate-y-1/2 bg-[#44A05B] text-white p-5 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={30} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-[50%] transform -translate-y-1/2 bg-[#44A05B] text-white p-5 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          disabled={currentIndex >= projects.length - itemsPerPage}
        >
          <FaArrowRight size={30} />
        </button>
      </div>

      {!projects.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center bg-[#F6F2EF]"
        >
          <h2 className="text-2xl font-semibold text-gray-400 mb-4">
            No projects found!
          </h2>
        </motion.div>
      ) : null}
    </section>
  );
};

export default FeaturedWork;
