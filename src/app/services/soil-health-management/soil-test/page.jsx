import BookSoilTest from "@/components/BookSoilTest";
import ServiceCard from "@/components/ServiceCard";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-20 md:px-24 xl:px-48 px-5">
        <h1 className="text-3xl md:text-5xl text-center mb-10 md:mb-16 text-[#44A05B]">
          Fill the form to schedule a soil test
        </h1>
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div>
            <BookSoilTest />
          </div>
          <div className="flex flex-col items-center gap-5 md:items-start">
            <ServiceCard
              title="High Density Orchard"
              description="Ready to start your own orchard? Secure your plot with us today and embark on your journey towards sustainable agriculture!"
              image="/assets/images/apples-1873078_1280.jpg"
              link="/services/orchard-development/book-orchard"
              delay={0.4}
            />
            <ServiceCard
              title="Expert Call"
              description="Get personalized advice from our seasoned experts on orchard management, soil health, and sustainable practices. Book your consultation today."
              image="/assets/images/call-center-8643477_1280.jpg"
              link="/services/expert-advice/expert"
              delay={0.6}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
