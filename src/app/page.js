import React from "react";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import GrowWithUs from "@/components/GrowWithUs";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <GrowWithUs />
      <OurServices />
      <Testimonials />
    </main>
  );
};

export default Home;
