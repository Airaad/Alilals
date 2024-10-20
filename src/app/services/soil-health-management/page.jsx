import React from "react";
import ServiceCard from "@/components/ServiceCard";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";

const SoilHealthManagement = () => {
  return (
    <div className="bg-[#F6F2EF]">
      {/* Banner Section */}
      <Banner
        title="Soil Health Management"
        backgroundImage="/assets/images/water-sprinkler-880970_1280.jpg"
      />

      {/* Description Section */}
      <div className="my-8 px-4 md:px-16 text-justify">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Services
        </h2>
        <p className="text-gray-600">
          At the heart of successful orchard management is{" "}
          <b>soil health management</b>. The foundation of any fruitful orchard
          begins with healthy soil. Without fertile, well-balanced soil, even
          the most well-planned orchards can underperform. Soil health
          management involves understanding the unique composition of your soil,
          testing for nutrient content, and addressing any deficiencies through
          the use of organic matter, fertilizers, and proper irrigation
          practices. Healthy soil supports robust root growth, improves water
          retention, and promotes disease resistance, all of which are critical
          to the long-term success of your orchard. Soil monitoring and regular
          testing help maintain its fertility, ensuring that your trees have the
          best possible conditions for growth and productivity.
        </p>
      </div>

      {/* Subservices Section */}
      <div className="bg-[#142827] text-center my-12 py-16 px-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide mb-4">
          Services offered
        </h2>
        <p className="text-lg text-gray-300 font-light mb-12">
          Delivering sustainability through innovation in orchard care and
          farming.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Soil Test"
            description="Uncover your soil’s potential with detailed nutrient and composition analysis. Ensure your orchard thrives with our professional soil testing services."
            image="/assets/images/ai-generated-8756079_1280.jpg"
            link="soil-health-management/soil-test"
            delay={0.4}
          />
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="text-center lg:w-[75%] mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-500 font-light mb-12">
          Confused about the service you need? Feel free to contact us
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default SoilHealthManagement;
