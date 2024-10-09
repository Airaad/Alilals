"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../../firebase/blogs/read";

export default function Blogs() {
  const [blogs, setblogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  let indexOfLastBlog = currentPage * blogsPerPage;
  let indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  let currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    getAllBlogs().then((data) => {
      setblogs(data);
      setLoading(false);
    });
  }, []);

  // Enhanced loading state design
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <p className="text-lg text-gray-600">Loading blogs, please wait...</p>
        </div>
      </div>
    );
  }

  // Handle no blogs found
  if (!loading && blogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          No blogs found!
        </h2>
        <p className="text-lg text-gray-600">
          Check back later for exciting content.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#142827]">
      <div
        id="blogs-section"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center gap-8 bg-[#142827]"
      >
        {currentBlogs.map((blog) => (
          <div
            key={blog.id}
            className="max-w-[600px] w-full h-full flex flex-col justify-between border rounded-lg shadow-lg bg-[#F6F4EC]"
          >
            {/* Blog Image */}
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={blog.imageUrl}
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
        <span className="text-lg text-white">
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
