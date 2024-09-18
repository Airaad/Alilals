import BlogHero from "@/components/BlogHero";
import Blogs from "@/components/Blogs";
import PageTitle from "@/components/PageTitle";
import React from "react";

const Blog = () => {
  return (
    <div>
      <PageTitle pageTitle={""} />
      <BlogHero />
      <Blogs />
    </div>
  );
};

export default Blog;
