import React from "react";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import OrchidSection from "@/components/OrchidSection";


const Home = () => {
  return (
    <main>
      <HeroSection />
      <OrchidSection />
      <OurServices />
      <Testimonials />
    </main>
  );
};

export default Home;
