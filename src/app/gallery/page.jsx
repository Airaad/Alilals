"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const photos = [
  "https://cdn.pixabay.com/photo/2018/07/09/18/40/nature-3526840_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/09/06/03/50/apple-2720105_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/26/20/02/arbor-1543673_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/03/02/23/37/ivy-3194557_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/08/08/20/53/ivy-413686_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/04/16/29/common-ivy-5002946_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/06/29/22/45/wheat-3506758_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/03/27/08/47/cows-7880154_1280.jpg",
  "https://cdn.pixabay.com/photo/2022/05/16/13/49/cow-7200409_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/07/20/14/01/grapes-3550729_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/29/16/34/fruit-3048001_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/02/14/18/10/pineapple-636562_1280.jpg",
];

const ImageCard = ({ image, onClick }) => (
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
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center space-x-2 text-sm">
        <span>View Photo</span>
        <span className="ml-2">»»</span>
      </div>
    </div>
  </motion.div>
);

const FullImageModal = ({ image, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
    onClick={onClose}
  >
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <img
        src={image}
        alt="Full View"
        className="max-w-[80vw] max-h-[80vh] rounded-lg"
      />
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        <AiOutlineClose />
      </button>
    </div>
  </div>
);

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(photos.length / cardsPerPage);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const currentPhotos = photos.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage,
  );

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
            {currentPhotos.map((photo) => (
              <ImageCard
                key={photo}
                image={photo}
                onClick={() => openModal(photo)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {selectedImage && (
        <FullImageModal image={selectedImage} onClose={closeModal} />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 bg-gray-300 rounded-l-md disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 flex items-center">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-r-md disabled:opacity-50"
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

export default Gallery;
