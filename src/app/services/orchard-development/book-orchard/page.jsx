import BookOrchid from "@/components/BookOrchid";
import ServiceCard from "@/components/ServiceCard";
import React from "react";

const OrchardBooking = () => {
  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-20 md:px-24 xl:px-48 px-5">
        <h1 className="text-3xl md:text-5xl text-center mb-10 md:mb-16 text-[#44A05B]">
          Fill the form to book your orchard
        </h1>
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div>
            <BookOrchid />
          </div>
          <div className="flex flex-col items-center gap-5 md:items-start">
            <ServiceCard
              title="Trellis Infrastructure"
              description="Boost crop support with our trellis systems, designed to improve growth, maximize sunlight, and simplify maintenance for your orchard."
              image="/assets/images/banana-plantation-2098723_1280.jpg"
              link="book-trellis-infrastructure"
              delay={0.4}
            />
            <ServiceCard
              title="Drip Irrigation"
              description="Save water and enhance crop health with drip irrigation, delivering precise watering directly to plant roots for optimal growth and efficiency."
              image="/assets/images/irrigation-2402568_1280.jpg"
              link="book-drip-irrigation"
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrchardBooking;
