"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useBlogs } from "@/context/BlogContext";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Blogs() {
  const { blogs, loading, error } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs?.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F2EF]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mb-4"></div>
          <p className="text-lg text-gray-500">Loading blogs, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F2EF]">
        <p className="text-lg text-gray-500">
          Error fetching blogs. Please try again later.
        </p>
      </div>
    );
  }

  if (!loading && blogs?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F6F2EF]">
        <h2 className="text-2xl font-semibold text-gray-400 mb-4">
          No blogs found!
        </h2>
        <p className="text-lg text-gray-500">
          Check back later for exciting content.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F6F2EF] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentBlogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <FaUserAlt className="mr-2" />
                  <span>{blog.uploader}</span>
                </div>
              </div>

              <h3 className="font-semibold text-xl mb-2 line-clamp-2 text-gray-800">
                {blog.title}
              </h3>

              <div className="h-1 w-16 bg-green-600 rounded mb-3"></div>

              <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                {blog.brief}
              </p>

              <Link
                href={`blog/${blog.id}`}
                className="px-8 py-3 bg-[#44A05B] text-white text-lg font-medium rounded-md shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors duration-300 text-center"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Pagination className="justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;

            // Show first page, current page, last page, and pages around current page
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // Show ellipsis for skipped pages
            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
