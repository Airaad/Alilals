import BookDripIrrigation from "@/components/BookDripIrrigation";
import ServiceCard from "@/components/ServiceCard";
import React from "react";

const DripBooking = () => {
  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-20 md:px-24 xl:px-48 px-5">
        <h1 className="text-3xl md:text-5xl text-center mb-10 md:mb-16 text-[#44A05B]">
          Fill the form to book drip irrigation session
        </h1>
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div>
            <BookDripIrrigation />
          </div>
          <div className="flex flex-col gap-5 items-center md:items-start">
            <ServiceCard
              title="High Density Orchard"
              description="Ready to start your own orchard? Secure your plot with us today and embark on your journey towards sustainable agriculture!"
              image="/assets/images/apples-1873078_1280.jpg"
              link="book-orchard"
              delay={0.4}
            />
            <ServiceCard
              title="Trellis Infrastructure"
              description="Boost crop support with our trellis systems, designed to improve growth, maximize sunlight, and simplify maintenance for your orchard."
              image="/assets/images/banana-plantation-2098723_1280.jpg"
              link="book-trellis-infrastructure"
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DripBooking;
