"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaDollarSign, FaRulerCombined, FaAppleAlt } from "react-icons/fa";
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
    <div className="bg-[#142827] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pb-10 pt-6 md:pb-32 px-4 md:px-6">
      <motion.div
        className="w-full h-auto mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className=" mx-auto w-full sm:w-[90%] h-[500px] border-8 border-black rounded-lg">
        <img
          src={project.image}
          alt="Project Image"
          className="w-full mx-auto h-full object-cover rounded-lg"
        />
        </div>
      </motion.div>

      <div className="bg-[#F6F2EF] p-10 md:px-24 md:py-20 md:w-[90%] lg:w-[80%] mx-auto rounded-lg shadow-lg">
      <div className="max-w-7xl mx-auto text-gray-900">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-[#44A05B]"
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
          className="text-base mb-6"
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

        <table className="table-auto w-full text-left text-base bg-white rounded-lg shadow-lg border">
          <thead>
            <tr>
              <th className="py-4 px-6 text-[#44A05B] font-semibold border-b">Details</th>
              <th className="py-4 px-6 text-[#44A05B] font-semibold border-b">Information</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
              <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                <FaUser className="mr-2 text-[#44A05B]" /> Grover Name
              </td>
              <td className="py-4 px-6">{project.name}</td>
            </tr>
            <tr className="hover:bg-gray-100 transition-all">
              <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#44A05B]" /> Address
              </td>
              <td className="py-4 px-6">{project.address}</td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
              <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                <FaDollarSign className="mr-2 text-[#44A05B]" /> Project Cost
              </td>
              <td className="py-4 px-6">{project.cost}</td>
            </tr>
            <tr className="hover:bg-gray-100 transition-all">
              <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                <FaRulerCombined className="mr-2 text-[#44A05B]" /> Orchard Size
              </td>
              <td className="py-4 px-6">{project.size}</td>
            </tr>
            <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
              <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                <FaAppleAlt className="mr-2 text-[#44A05B]" /> Variety of Apple
              </td>
              <td className="py-4 px-6">{project.appleType}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Page;
