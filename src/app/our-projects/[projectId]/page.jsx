"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaRulerCombined,
  FaAppleAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useProjects } from "@/context/ProjectContext";
import FeaturedWork from "@/components/FeaturedWork";

const Page = () => {
  const { projects, loading, error } = useProjects();

  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!project && !loading && !error) {
      const selectedProject = projects.find((pro) => pro.id == projectId);
      setProject(selectedProject);
    }
  }, [projectId, loading, projects, error]);

  if (loading) {
    return (
      <div className="bg-[#F6F2EF] flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <span className="ml-4 text-lg">Loading project...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F6F2EF] flex justify-center items-center min-h-screen">
        <span className="ml-4 text-lg">
          Error fetching projects. Please try again later.
        </span>
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
    <>
      <motion.div
        className="mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 bg-[#F6F2EF] p-10 md:px-24 md:py-20 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Column: Image */}
        <div className="col-span-1 lg:col-span-3 my-auto">
          <div className="w-full h-auto rounded-lg">
            <img
              src={project.imageUrl}
              alt="Project Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        {/* Right Column: Description & Table */}
        <div className="col-span-1 lg:col-span-2">
          <div className="text-gray-900">
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
              {project.brief}
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
                  <th className="py-4 px-6 text-[#44A05B] font-semibold border-b">
                    Details
                  </th>
                  <th className="py-4 px-6 text-[#44A05B] font-semibold border-b">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                    <FaUser className="mr-2 text-[#44A05B]" /> Grover Name
                  </td>
                  <td className="py-4 px-6">{project.name}</td>
                </tr>
                <tr className="hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#44A05B]" /> Address
                  </td>
                  <td className="py-4 px-6">{project.address}</td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                    <FaClock className="mr-2 text-[#44A05B]" /> Project Duration
                  </td>
                  <td className="py-4 px-6">
                    {project.start} to {project.end}
                  </td>
                </tr>
                <tr className="hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                    <FaRulerCombined className="mr-2 text-[#44A05B]" /> Orchard
                    Size
                  </td>
                  <td className="py-4 px-6">{project.size} Kanals</td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-200 transition-all">
                  <td className="py-4 px-6 font-semibold text-green-800 flex items-center">
                    <FaAppleAlt className="mr-2 text-[#44A05B]" /> Variety of
                    Apple
                  </td>
                  <td className="py-4 px-6">{project.appleType}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      <FeaturedWork />
    </>
  );
};

export default Page;
