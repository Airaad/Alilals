"use client";
import Link from "next/link";
import { useState } from "react";
import blogs from "@/data/blogs.json";

export default function Blogs() {
  const backgroundStyle = {
    backgroundColor: "#f6f4ec",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/arches.png")',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={backgroundStyle} className="p-6">
      <div
        style={backgroundStyle}
        id="blogs-section"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-8 bg-[#F6F4EC]"
      >
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="max-w-[600px] w-full h-full flex flex-col justify-between border rounded-lg shadow-lg bg-[#F6F4EC]"
          >
            {/* Blog Image */}
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-xs text-gray-500 mb-2">
                {blog.date} / By{" "}
                <span className="text-black">{blog.uploader}</span>
              </p>
              <h2 className="text-3xl text-[#202221] font-semibold tracking-wide mb-4">
                {blog.title}
              </h2>
              <div className="h-[0.08rem] bg-[#44A05B] w-16 mb-4" />
              <p className="text-[#636363] mb-6">{blog.brief}</p>
            </div>

            {/* Read More Button */}
            <div className="p-4">
              <Link
                href={`blog/${blog.id}`}
                className="inline-block bg-[#44A05B] text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#44A05B] text-white hover:bg-green-700 transition"
          }`}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#44A05B] text-white hover:bg-green-700 transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
