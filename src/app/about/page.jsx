import AboutCompany from "@/components/AboutCompany";
import AboutHero from "@/components/AboutHero";
import AboutHistory from "@/components/AboutHistory";
import PageTitle from "@/components/PageTitle";
import FAQ from "@/components/FAQ";
import React from "react";

const About = () => {
  return (
    <div>
      <AboutHero />
      <AboutCompany />
      <FAQ />
      <AboutHistory />
    </div>
  );
};

export default About;
