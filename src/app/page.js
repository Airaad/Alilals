import React from "react";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import { Testimonials } from "@/components/Testmonials";
import Team from "@/components/Meet Our Team";
import OrchidSection from "@/components/OrchidSection";


const Home = () => {
  return (
    <main>
      <HeroSection/>
      <OrchidSection/>
      <OurServices/>
      <Testimonials/>
      <Team/>
    </main>
  );
};

export default Home;
