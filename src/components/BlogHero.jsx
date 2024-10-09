"use client";
import React from "react";
import { FaArrowDown } from "react-icons/fa";

const BlogHero = () => {
  const scrollToBlogs = () => {
    const blogsSection = document.getElementById("blogs-section");
    if (blogsSection) {
      blogsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-[url('/assets/images/pexels-vika-glitter-392079-1094071.jpg')] bg-cover bg-bottom">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative flex flex-col justify-center items-center h-full">
        <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-wide mb-6">
          Welcome To Blogs
        </h1>
        <p className="text-white text-lg w-[90%] lg:w-[50%] text-center font-light tracking-wide mb-6">
          Discover the latest insights, trends, and tips from our expert
          writers. Our blog covers a range of topics to keep you informed and
          inspired.
        </p>

        <button
          onClick={scrollToBlogs}
          className="flex items-center space-x-2 bg-[#44A05B] text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-green-600 hover:via-green-700 hover:to-green-800 transition-transform transform hover:scale-105 focus:outline-none"
        >
          <span className="font-medium">Explore</span>
          <FaArrowDown className="text-white animate-bounce-slow" />
        </button>
      </div>

      <div className="absolute top-0 left-0 w-0 h-0 border-t-[90px] border-t-[#193831] border-r-[70px] border-r-transparent"></div>
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[90px] border-b-[#193831] border-l-[70px] border-l-transparent"></div>
    </div>
  );
};

export default BlogHero;
