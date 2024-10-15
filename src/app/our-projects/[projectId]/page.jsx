"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import projectsData from "../../../data/projects.json";

const Page = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    const selectedProject = projectsData.find(
      (proj) => proj.id === Number(projectId),
    );
    if (selectedProject) {
      setProject(selectedProject);
    }
    setLoadingProject(false);
  }, [projectId]);

  if (loadingProject) {
    return (
      <div className="bg-[#F6F2EF] flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <span className="ml-4 text-lg">Loading project...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-[#F6F2EF] flex justify-center items-center min-h-screen">
        <span className="text-lg">Project not found.</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F6F2EF] pb-10 pt-6 md:pb-32 px-4 md:px-6">
      <motion.div
        className="w-full h-auto mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={project.image}
          alt="Project Image"
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto text-gray-900">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-green-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {project.title}
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Brief Description
        </motion.h2>
        <motion.p
          className="text-base md:text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        <motion.h2
          className="text-xl md:text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Project Analysis
        </motion.h2>

        <table className="table-auto w-full text-left text-lg bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-4 px-6 text-green-800 font-semibold">
                Details
              </th>
              <th className="py-4 px-6 text-green-800 font-semibold">
                Information
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="py-4 px-6 font-semibold text-green-800">
                Grover Name
              </td>
              <td className="py-4 px-6">{project.name}</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-green-800">
                Address
              </td>
              <td className="py-4 px-6">{project.address}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="py-4 px-6 font-semibold text-green-800">
                Project Cost
              </td>
              <td className="py-4 px-6">{project.cost}</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-green-800">
                Orchard Size
              </td>
              <td className="py-4 px-6">{project.size}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="py-4 px-6 font-semibold text-green-800">
                Variety of Apple
              </td>
              <td className="py-4 px-6">{project.appleType}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
