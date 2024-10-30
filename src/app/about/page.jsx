import AboutCompany from "@/components/AboutCompany";
import AboutHistory from "@/components/AboutHistory";
import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import React from "react";

const About = () => {
  return (
    <div>
      <Banner
        title="About Us"
        backgroundImage="/assets/images/aboutus.jpg"
      />
      <AboutCompany />
      <AboutHistory />
      <FAQ />
    </div>
  );
};

export default About;
