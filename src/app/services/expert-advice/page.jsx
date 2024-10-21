import React from "react";
import ServiceCard from "@/components/ServiceCard";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";

const ExpertAdvice = () => {
  return (
    <div className="bg-[#F6F2EF]">
      {/* Banner Section */}
      <Banner
        title="Expert Advice"
        backgroundImage="/assets/images/pexels-chokniti-khongchum-1197604-2280551.jpg"
      />

      {/* Description Section */}
      <div className="my-8 px-4 md:px-16 text-justify">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Service
        </h2>
        <p className="text-gray-600">
          In addition to management practices, <b>expert advice</b> plays a
          crucial role in the success of orchard development and maintenance.
          Orchard specialists bring a wealth of knowledge and experience,
          offering tailored guidance on everything from species selection and
          site planning to pest control and market strategies. They help farmers
          and landowners navigate challenges and implement best practices that
          are backed by research and experience. Expert advice ensures that both
          novice and experienced orchardists can make informed decisions that
          will enhance the efficiency, profitability, and sustainability of
          their orchard operations. Whether you’re dealing with a large
          commercial project or a family-owned orchard, expert consultation can
          significantly increase the likelihood of long-term success.
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
            title="Expert Call"
            description="Get personalized advice from our seasoned experts on orchard management, soil health, and sustainable practices. Book your consultation today."
            image="/assets/images/call-center-8643477_1280.jpg"
            link="expert-advice/expert"
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

export default ExpertAdvice;
