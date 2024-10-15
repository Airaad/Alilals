"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import projectsData from "../data/projects.json";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 9;
  const totalPages = Math.ceil(projects.length / cardsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage,
  );

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  return (
    <section className="px-8 sm:px-24 xl:px-40 py-20 h-min-screen bg-[#F6F2EF]">
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-lg rounded-lg">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                image={project.image}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 bg-gray-300 rounded-l-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 flex items-center">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-r-md"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProjectPage;
