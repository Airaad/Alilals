"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ProjectCard = ({ title, image, id }) => {
  const router = useRouter();

  const goToProject = () => {
    router.push(`/our-projects/${id}`);
  };

  return (
    <motion.div
      className="relative w-full h-64 rounded-md overflow-hidden shadow-lg cursor-pointer bg-white group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      viewport={{ once: true }}
      onClick={goToProject}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center space-x-2 text-sm">
          <span>See Project</span>
          <span className="ml-2">»»</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
