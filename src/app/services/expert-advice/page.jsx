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
      <div className="my-8 px-4 md:px-16">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Service
        </h2>
        <div className="">
          <p className="text-gray-600 leading-relaxed">
            At <b>Alilals Agrico</b>, we believe that the key to successful
            farming lies in informed decision- making. Every agricultural
            venture comes with its unique set of challenges, which is why we
            bring together a team of seasoned experts specializing in various
            agricultural disciplines. Their knowledge, combined with years of
            hands-on experience, ensures that farmers receive tailored,
            actionable solutions to optimize productivity, profitability, and
            sustainability.
          </p>
        </div>

        {/* Our Panel of Experts Includes */}
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-[#44A05B] mb-10 text-center">
            Our Panel of Experts Includes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Pomologists */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Pomologists
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Specialists in fruit tree science, advising on varietal
                    selection, grafting, and cultivation techniques to enhance
                    yield and fruit quality.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Research-backed guidance on effective pollination, flowering
                    management, and post- harvest orchard care.
                  </span>
                </li>
              </ul>
            </div>

            {/* Pathologists */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Pathologists
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Experts in diagnosing and managing plant diseases, employing
                    integrated and eco- friendly disease management systems to
                    reduce chemical dependency.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Guidance on effective plant protection strategies to
                    safeguard crops and trees.
                  </span>
                </li>
              </ul>
            </div>

            {/*  Soil Scientists */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Soil Scientists
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Skilled in analyzing soil health, pH, and fertility, and
                    recommending customized nutrient management plans.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Expertise in soil restoration practices, including organic
                    amendments and microbial inoculation, to boost long-term
                    agricultural productivity.
                  </span>
                </li>
              </ul>
            </div>

            {/*  Agro-Technologists */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Agro-Technologists
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Integration of modern technologies such as IoT devices,
                    drones, and GPS mapping for precision farming.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Support in data-driven decision-making, leveraging big data
                    analytics and AI to improve farming efficiency and
                    profitability.
                  </span>
                </li>
              </ul>
            </div>

            {/* Entomologists */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Entomologists
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Specialists in pest management, focusing on the control of
                    harmful insects while promoting beneficial ones like
                    pollinators.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Implementation of biological control measures and
                    pollination enhancement strategies for healthier crops.
                  </span>
                </li>
              </ul>
            </div>

            {/* Plant Physiologist */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Plant Physiologist
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Experts in plant growth, development, and stress physiology
                    to optimize crop health.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Guidance on improving plant resilience to environmental
                    stressors such as drought, heat, and salinity.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-[#144835] text-white rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Why Choose Alilals Agrico?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">
                A Multidisciplinary Team
              </h4>
              <p className="text-gray-200">
                We cover every facet of horticulture and agriculture with our
                diverse panel of experts.
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">
                Cutting-Edge Knowledge and Traditional Wisdom
              </h4>
              <p className="text-gray-200">
                Our experts blend scientific knowledge with practical,
                region-specific expertise.
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">
                A Commitment to Sustainability and Profitability
              </h4>
              <p className="text-gray-200">
                We empower farmers to adopt practices that are both
                environmentally and economically beneficial.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-200 max-w-3xl mx-auto">
            At Alilals Agrico, we don’t just provide advice—we offer a
            partnership built on trust, expertise, and a shared vision for
            agricultural success. Let us help you cultivate a future of
            innovation, sustainability, and prosperity in agriculture.
          </p>
        </div>
      </div>

      {/* Services Offered Section */}
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
            title="Speak with an expert"
            description="Get personalized advice from our seasoned experts on orchard management, soil health, and sustainable practices. Book your consultation today."
            image="/assets/images/expertspeak.jpg"
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
