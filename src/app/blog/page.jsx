import Blogs from "@/components/Blogs";
import Banner from "@/components/Banner";
import React from "react";

const Blog = () => {
  return (
    <div>
      <Banner
        title="Knowledge Hub"
        backgroundImage="/assets/images/knowledge.jpg"
      />
      <Blogs />
    </div>
  );
};

export default Blog;
