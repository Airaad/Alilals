import React from "react";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import Team from "@/components/Meet Our Team";
import OrchidSection from "@/components/OrchidSection";
import { WhatWeOffer } from "@/components/WhatWeOffer";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <OrchidSection />
      <WhatWeOffer />
      <OurServices />
      <Testimonials />
      <Team />
    </main>
  );
};

export default Home;
