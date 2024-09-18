"use client";

import { useParams } from "next/navigation";
import blogs from "@/data/blogs.json";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function BlogDetail({ id }) {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (blogId) {
      const selectedBlog = blogs.find((b) => b.id === parseInt(blogId));
      setBlog(selectedBlog);
    }
  }, [blogId]);

  if (!blog) return <div>Loading...</div>;

  const blogUrl = `${window.location.origin}/blog/${blogId}`;

  return (
    <div className="min-h-screen bg-[#f6f4ec] bg-[url('https://www.transparenttextures.com/patterns/groovepaper.png')] text-[#202221]">
      <div className="md:px-16 md:py-12">
        <div className="container mx-auto py-12 px-6 lg:px-12">
          {/* Blog Header */}
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

          {/* Blog Image */}
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Blog Content */}
          <div className="prose lg:prose-xl max-w-none text-[#404040] leading-relaxed text-justify">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              semper, purus quis rhoncus hendrerit, leo lacus mollis libero, non
              posuere sem metus ut nisi. Morbi feugiat condimentum suscipit.
              Aenean id erat semper, tincidunt tortor non, commodo purus.
              Pellentesque finibus sapien vel orci posuere, eu placerat nisl
              placerat. Duis venenatis lectus ac consectetur rutrum. Integer
              rutrum quam ut justo bibendum feugiat. Duis et dapibus est.
              Suspendisse nec mi odio. Donec iaculis sit amet augue ac tempus.
              Donec feugiat lobortis lorem, id volutpat leo vulputate vel. Sed
              at ipsum lacus. Phasellus pulvinar orci eros, non mollis nunc
              facilisis ac. Cras laoreet libero velit, nec elementum mi sodales
              vitae. Phasellus aliquet imperdiet hendrerit. Aliquam erat
              volutpat. Vestibulum interdum quam quis velit vulputate efficitur.
              Quisque velit magna, maximus ac iaculis non, fermentum ac turpis.
              Praesent vulputate interdum turpis quis lacinia. Duis sed
              condimentum lorem, a pretium neque. Praesent turpis mi, convallis
              a nisi vel, iaculis aliquam nulla. Quisque eu est metus. Sed vitae
              odio convallis, auctor nunc eget, tristique ante. Suspendisse eu
              egestas sapien, sit amet lobortis risus. Donec tincidunt lorem
              viverra ex feugiat, ac facilisis neque consectetur. Morbi
              imperdiet varius tortor at congue. Maecenas at erat vitae magna
              tincidunt blandit. Suspendisse sit amet purus in tortor eleifend
              efficitur sit amet cursus nibh. Morbi a tellus et dui accumsan
              malesuada. Curabitur consectetur nec magna nec pharetra. Maecenas
              eu feugiat turpis. Proin ante orci, commodo ultrices porttitor
              quis, aliquam eget augue. Nam sed mi nunc. Etiam vitae lobortis
              odio. Vestibulum commodo nisl eu risus posuere ornare. Integer
              imperdiet metus id convallis aliquam. Donec eleifend nec risus vel
              condimentum. Vivamus lacinia lacus sed turpis euismod dictum.
              Aliquam erat volutpat. Sed pretium, dui vel dignissim condimentum,
              metus mauris tincidunt elit, quis cursus nunc nulla quis diam. Sed
              et pharetra magna. Ut pretium eu augue eu suscipit. Duis viverra
              felis cursus, efficitur leo eu, hendrerit odio. Aliquam id dui eu
              leo pharetra auctor eget eget ligula. Duis eget sem urna. Proin
              egestas iaculis nibh in sollicitudin. Aenean vestibulum ut leo sed
              dapibus. Curabitur lacus ex, varius non enim et, molestie commodo
              est. Aliquam erat nulla, venenatis vel nisl ac, efficitur placerat
              leo. Pellentesque consequat sodales turpis, eget rutrum leo
              lobortis sed. Duis convallis consectetur massa, at euismod turpis
              rhoncus id. Praesent purus quam, accumsan eget semper vel, congue
              eu augue. Nunc diam felis, condimentum eleifend consequat sit
              amet, euismod at mauris. Nunc ac magna tempor, tristique ex eget,
              consectetur quam. Sed sit amet purus quis nibh euismod semper
              facilisis ac arcu.
            </p>

            <blockquote className="bg-gray-100 p-4 border-l-4 border-[#44A05B] italic rounded-lg my-8">
              "Farming is not just a job, its a way of life..."
            </blockquote>
          </div>

          {/* Share Section */}
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
      </div>

      {/* Suggested Blogs */}
      <div className="bg-[#202221] bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] text-white py-8 mt-12">
        <div className="container mx-auto px-6 lg:px-12">
          <h3 className="text-2xl font-semibold">
            Liked this blog? Check out more articles:
          </h3>
          <div className="flex flex-col items-center gap-8 lg:flex-row mt-6">
            {blogs.slice(0, 3).map((relatedBlog) => (
              <div key={relatedBlog.id} className="w-full">
                <Link href={`/blog/${relatedBlog.id}`}>
                  <div className="bg-[#F6F4EC] text-[#202221] rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-2">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {relatedBlog.brief}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
