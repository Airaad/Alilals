import BookOrchid from "@/components/BookOrchid";
import ServiceCard from "@/components/ServiceCard";
import React from "react";

const TrellisBooking = () => {
  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-20 md:px-24 xl:px-48 px-5">
        <h1 className="text-3xl md:text-5xl text-center mb-10 md:mb-16 text-[#44A05B]">
          Fill the form to book your trellis infrastructure
        </h1>
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div>
            <BookOrchid />
          </div>
          <div className="flex flex-col items-center gap-5 md:items-start">
            <ServiceCard
              title="High Density Orchard"
              description="Ready to start your own orchard? Secure your plot with us today and embark on your journey towards sustainable agriculture!"
              image="/assets/images/apples-1873078_1280.jpg"
              link="orchard-development/book-orchard"
              delay={0.4}
            />
            <ServiceCard
              title="Drip Irrigation"
              description="Save water and enhance crop health with drip irrigation, delivering precise watering directly to plant roots for optimal growth and efficiency."
              image="/assets/images/irrigation-2402568_1280.jpg"
              link="orchard-development/book-drip-irrigation"
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrellisBooking;
