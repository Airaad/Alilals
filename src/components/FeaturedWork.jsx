"use client";
import { motion } from "framer-motion"; 
import Link from "next/link";
import { useState } from "react"; 
import { AiOutlineClose } from "react-icons/ai"; 

const projects = [
  {
    title: "Apple Orchard Expansion",
    image:
      "https://cdn.pixabay.com/photo/2018/07/09/18/40/nature-3526840_1280.jpg",
    link: "/projects/apple-orchard",
  },
  {
    title: "Soil Health Initiative",
    image:
      "https://cdn.pixabay.com/photo/2017/09/06/03/50/apple-2720105_1280.jpg",
    link: "/projects/soil-health",
  },
  {
    title: "Sustainable Water Use",
    image:
      "https://cdn.pixabay.com/photo/2016/07/26/20/02/arbor-1543673_1280.jpg",
    link: "/projects/water-use",
  },
];

const ProjectCard = ({ title, image, onClick }) => (
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
    onClick={onClick} // Call onClick when clicked
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

const FullImageModal = ({ image, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
    onClick={onClose} // Close modal on background click
  >
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {" "}
      {/* Prevent click event from closing modal */}
      <img
        src={image}
        alt="Full View"
        className="max-w-[80vw] max-h-[80vh] rounded-lg" // Decrease size of the image
      />
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        <AiOutlineClose /> {/* Cross icon for closing */}
      </button>
    </div>
  </div>
);

const FeaturedWork = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image

  const openModal = (image) => {
    setSelectedImage(image); // Set the selected image to open modal
  };

  const closeModal = () => {
    setSelectedImage(null); // Clear the selected image to close modal
  };

  return (
    <section className="py-16 h-[700px] bg-[#142827]">
      <motion.div
        className="flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl font-bold text-center text-[#44A05B]">
          Featured Work
        </h2>
        <p className="text-lg text-gray-300 font-light">
          We take pride in our work
        </p>
      </motion.div>

      <motion.div
        className="h-[400px] flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                image={project.image}
                onClick={() => openModal(project.image)} // Pass the image to open modal
              />
            ))}
          </div>
        </div>
      </motion.div>

      {selectedImage && ( // Conditionally render the modal
        <FullImageModal image={selectedImage} onClose={closeModal} />
      )}

      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
      <Link href='our-projects'>
        <button className="px-8 py-3 bg-[#44A05B] text-white text-lg font-medium rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300">
          Explore Projects
        </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedWork;
