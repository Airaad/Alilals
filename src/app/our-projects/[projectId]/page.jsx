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
      <div className="flex justify-center items-center min-h-screen bg-[#F6F2EF]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <span className="ml-4 text-lg">Loading project...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F2EF]">
        <span className="text-lg">
          Error fetching project. Please try again.
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F2EF]">
        <span className="text-lg">Project not found.</span>
      </div>
    );
  }

  return (
    <>
      {/* Project Details */}
      <motion.div
        className="max-w-8xl mx-auto px-6 md:px-12 pt-12 grid gap-8 lg:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="rounded-lg shadow-lg">
          <img
            src={project.imageUrl}
            alt="Project Details"
            className="w-full h-full"
          />
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#44A05B] mb-4">
            Project Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaUser className="text-[#44A05B] mr-4" />
              <div>
                <p className="font-semibold text-gray-800">Grower Name</p>
                <p className="text-gray-600">{project.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-[#44A05B] mr-4" />
              <div>
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">{project.address}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaClock className="text-[#44A05B] mr-4" />
              <div>
                <p className="font-semibold text-gray-800">Project Duration</p>
                <p className="text-gray-600">
                  {project.start} to {project.end}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="text-[#44A05B] mr-4" />
              <div>
                <p className="font-semibold text-gray-800">Orchard Size</p>
                <p className="text-gray-600">{project.size} Kanals</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaAppleAlt className="text-[#44A05B] mr-4" />
              <div>
                <p className="font-semibold text-gray-800">Variety of Apple</p>
                <p className="text-gray-600">{project.appleType}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="max-w-8xl mx-auto px-6 md:px-12 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        del
      >
        <h2 className="text-2xl font-bold text-[#44A05B] mb-4">
          Project brief
        </h2>
        {project.brief}
      </motion.div>

      {/* Featured Work */}
      <div className="bg-[#F6F2EF] py-12">
        <FeaturedWork />
      </div>
    </>
  );
};

export default Page;
