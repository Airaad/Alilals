import React from "react";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import GrowWithUs from "@/components/GrowWithUs";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import FeaturedWork from "@/components/FeaturedWork";
import Ribbon from "@/components/Ribbon";
import AppleVarieties from "@/components/AppleVarieties";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <GrowWithUs />
      <WhyChooseUs />
      <OurServices />
      <FeaturedWork />
      <AppleVarieties />
      <Testimonials />
      <Ribbon />
    </main>
  );
};

export default Home;
