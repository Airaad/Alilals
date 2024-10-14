import React from "react";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import GrowWithUs from "@/components/GrowWithUs";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import FeaturedWork from "@/components/FeaturedWork";


const Home = () => {
  return (
    <main>
      <HeroSection />
      <GrowWithUs />
      <WhyChooseUs />
      <OurServices />
      <Testimonials />
      <FeaturedWork />
    </main>
  );
};

export default Home;
