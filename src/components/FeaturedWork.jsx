"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { getAllProjects } from "../../firebase/projects/read";

const FeaturedWork = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!projects.length) {
      getAllProjects().then((data) => {
        setProjects(data.slice(0, 3));
      });
    }
  }, []);

  return (
    <section className="py-16 h-auto bg-[#F6F2EF]">
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

      <motion.div
        className="flex items-center justify-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link href={`/our-projects/${project.id}`} key={project.id}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  imageUrl={project.imageUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

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
      ) : (
        ""
      )}

      <motion.div
        className="flex justify-center items-center mt-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Link href="/our-projects">
          <button className="px-6 py-2 md:px-8 md:py-3 bg-[#44A05B] text-white text-lg font-medium rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300">
            Explore Orchards
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedWork;
