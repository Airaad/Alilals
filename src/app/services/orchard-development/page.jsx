import React from "react";
import ServiceCard from "@/components/ServiceCard";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";

const OrchardDevelopment = () => {
  return (
    <div className="bg-[#F6F2EF]">
      {/* Banner Section */}
      <Banner
        title="Orchard Development"
        backgroundImage="/assets/images/pexels-alejandro-barron-21404-96715.jpg"
      />

      {/* Description Section */}
      <div className="my-8 px-4 md:px-16 text-justify">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Service
        </h2>
        <p className="text-gray-600">
          Effective <b>orchard management</b> is key to cultivating a healthy
          and productive orchard that will thrive for years. It involves a
          detailed, hands-on approach to every stage of the orchard's
          lifecycle—from the initial design and planting to ongoing maintenance
          and harvesting. Proper orchard management includes soil preparation,
          planting methods, irrigation systems, and pest control strategies that
          are customized to the specific needs of the orchard. By carefully
          managing each aspect of the orchard, you can ensure optimal fruit
          yield, healthier trees, and long-term sustainability. This not only
          increases productivity but also enhances the economic viability of the
          orchard over time.
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
            title="High Density Orchard"
            description="Ready to start your own orchard? Secure your plot with us today and embark on your journey towards sustainable agriculture!"
            image="/assets/images/apples-1873078_1280.jpg"
            link="orchard-development/book-orchard"
            delay={0.4}
          />
          <ServiceCard
            title="Trellis Infrastructure"
            description="Boost crop support with our trellis systems, designed to improve growth, maximize sunlight, and simplify maintenance for your orchard."
            image="/assets/images/banana-plantation-2098723_1280.jpg"
            link="orchard-development/book-trellis-infrastructure"
            delay={0.6}
          />
          <ServiceCard
            title="Drip Irrigation"
            description="Save water and enhance crop health with drip irrigation, delivering precise watering directly to plant roots for optimal growth and efficiency."
            image="/assets/images/irrigation-2402568_1280.jpg"
            link="orchard-development/book-drip-irrigation"
            delay={0.8}
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

export default OrchardDevelopment;
