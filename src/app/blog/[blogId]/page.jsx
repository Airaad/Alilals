"use client";

import { useParams } from "next/navigation";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import { useBlogs } from "@/context/BlogContext";

export default function BlogDetail() {
  const { blogs, loading, error } = useBlogs();

  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!blog && !loading && !error) {
      const selectedBlog = blogs.find((b) => b.id == blogId);
      setBlog(selectedBlog);
    }
  }, [blogId, blogs, loading, error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        <span className="ml-4 text-lg">Loading blog...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="ml-4 text-lg">
          Error fetching blog. Please try again later.
        </span>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center">No blog found.</div>;
  }

  const blogUrl = `${window.location.origin}/blog/${blogId}`;
  const sanitizedHTML = DOMPurify.sanitize(blog?.content);

  return (
    <div className="min-h-screen bg-[#f6f4ec] bg-[url('https://www.transparenttextures.com/patterns/groovepaper.png')] text-[#202221]">
      <div className="container mx-auto md:px-16 md:py-12 py-12 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Blog Content */}
        <div className="lg:col-span-2">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-[#636363] text-sm space-x-4">
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaUserAlt />
                <span>{blog.uploader}</span>
              </div>
            </div>
            <div className="h-[0.08rem] bg-[#44A05B] full my-8" />
          </div>

          <div className="mb-8 relative w-full h-0 pb-[56.25%]">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="max-w-none text-[#404040] leading-relaxed">
            <div className="no-global-style ql-editor">
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
            </div>
            <blockquote className="bg-gray-100 p-4 border-l-4 border-[#44A05B] italic rounded-lg my-8">
              "An orchard is more than a collection of trees—it's a living
              ecosystem that thrives through careful planning, rich soil, and
              sustainable practices."
            </blockquote>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Share this blog:</h3>
            <div className="flex gap-4">
              <FacebookShareButton url={blogUrl} quote={blog.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={blogUrl} title={blog.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={blogUrl} summary={blog.title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={blogUrl} title={blog.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>

        {/* Suggested Blogs */}
        <div className="bg-[#142827] text-white p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">
            Liked this blog? Check out more articles:
          </h3>

          {loading ? (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
              <span className="ml-4 text-lg">Loading related blogs...</span>
            </div>
          ) : (
            <div className="space-y-8">
              {blogs.slice(0, 5).map((relatedBlog) => (
                <Link href={`/blog/${relatedBlog.id}`} key={relatedBlog.id}>
                  <div className="bg-[#F6F4EC] text-[#202221] rounded-lg my-6 shadow-lg overflow-hidden">
                    <img
                      src={relatedBlog.imageUrl}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-2">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-sm text-gray-600 text-justify">
                        {relatedBlog.brief}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
