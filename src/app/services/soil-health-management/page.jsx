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
        backgroundImage="/assets/images/soil-8166778_1280.jpg"
      />

      {/* Description Section */}
      <div className="my-8 px-4 md:px-16">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Service
        </h2>
        <div className="">
          <p className="text-gray-600 leading-relaxed">
            At <b>Alilals Agrico</b>, we recognize that the health of your soil
            is the key to successful farming. Our
            <b> Soil Health Management</b> services for apple orchards are
            designed to enhance soil fertility, structure, and biological
            activity, ensuring optimal growing conditions for your apple trees
            and maximizing long-term productivity. By blending traditional
            knowledge with scientific innovation, we offer tailored solutions to
            rejuvenate and maintain soil health, promoting both the immediate
            and future success of your apple crops.
          </p>
        </div>

        {/* Key Services Section */}
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-[#44A05B] mb-10 text-center">
            Key Services in Soil Health Management
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Soil Testing and Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Soil Testing and Analysis
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Comprehensive testing of soil pH, nutrient profiles (macro
                    and micronutrients), and organic matter content to
                    understand the specific needs of apple trees and other
                    crops.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Use of geospatial mapping to detect soil variability across
                    your orchard, ensuring tailored soil management approaches
                    for different orchard zones (service under development).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Customized recommendations for soil amendments, including
                    the ideal levels of nutrients and organic matter necessary
                    for apple crop health.
                  </span>
                </li>
              </ul>
            </div>

            {/* Organic Matter Enrichment for Apple Orchards */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Organic Matter Enrichment for Apple Orchards
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Application of composts and green manures to improve organic
                    carbon content and soil structure, essential for the health
                    of apple trees.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Introduction of cover crops to enrich the soil, enhance
                    nitrogen fixation, and prevent erosion in apple orchards.
                  </span>
                </li>
              </ul>
            </div>

            {/* Nutrient Management for Apple Trees */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Nutrient Management for Apple Trees
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Development of site-specific nutrient management plans that
                    address the particular needs of apple crops, ensuring the
                    soil provides balanced nutrition to support optimal growth
                    and fruiting.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Use of slow-release fertilizers and nano-fertilizers for
                    precise, long-term nutrient delivery to apple trees,
                    avoiding nutrient imbalances and minimizing leaching.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Integration of microbial inoculants like mycorrhizal fungi
                    and nitrogen-fixing bacteria to stimulate natural nutrient
                    cycling, ensuring sustainable soil fertility for apple
                    trees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Soil Erosion/Dispersion treatment and Control for Apple Orchards */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Soil Erosion/Dispersion treatment and Control for Apple Orchards
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Implementation of contour farming and terracing in sloped
                    areas of apple orchards to reduce soil erosion and improve
                    water retention.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Use of mulching techniques to protect the soil surface,
                    reduce evaporation, and maintain soil temperature—key for
                    healthy apple tree root systems.
                  </span>
                </li>
              </ul>
            </div>

            {/* Irrigation and Drainage Solutions for Apple Orchards */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Irrigation and Drainage Solutions for Apple Orchards
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Optimization of irrigation practices to conserve water,
                    reduce salinity, and prevent soil compaction, ensuring
                    optimal hydration for apple trees.
                  </span>
                </li>
              </ul>
            </div>

            {/* Soil Monitoring and Real-Time Data for Apple Orchards (Service under development) */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Soil Monitoring and Real-Time Data for Apple Orchards (Service
                under development)
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Use of soil moisture sensors and IoT-based monitoring
                    systems to track soil health in real-time, enabling timely
                    irrigation adjustments and proactive soil management.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Continuous monitoring and reporting to measure soil health
                    improvements and assess their impact on apple crop growth
                    and yield over time.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-[#144835] text-white rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Why Soil Health Matters for Apple Crops?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">1.</h4>
              <p className="text-gray-200">
                Healthy soil is essential for apple crop success. It supports
                tree vigour, improves water retention, and reduces dependency on
                chemical fertilizers, leading to better fruit quality and yield
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">2.</h4>
              <p className="text-gray-200">
                Healthy soils also promote strong root systems, reduce the risk
                of diseases, and enhance the resilience of apple trees to
                environmental stressors.
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">3.</h4>
              <p className="text-gray-200">
                Maintaining healthy soil in your apple orchard is not just about
                ensuring immediate crop success but also safeguarding long-term
                productivity and sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Offered Section */}
      <div className="bg-[#142827] text-center my-12 py-16 px-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide mb-4">
          Smart Farming Starts Here
        </h2>
        <p className="text-lg text-gray-300 font-light mb-12">
          Effortless service, just a click away
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Book a Soil Test"
            description="Before investing you earnings into soil, we let you know the properties and composition your soil carries. Book soil Sample collection and testing services here."
            image="/assets/images/20240423_135153.jpg"
            link="soil-health-management/soil-test"
            delay={0.4}
          />
          <ServiceCard
            title="Trellis Infrastructure"
            description="Boost crop support with our trellis systems, designed to improve growth, maximize sunlight, and simplify maintenance for your orchard."
            image="/assets/images/trellis2.jpg"
            link="orchard-development/book-trellis-infrastructure"
            delay={0.6}
          />
          <ServiceCard
            title="Drip Irrigation"
            description="Save water and enhance crop health with drip irrigation, delivering precise watering directly to plant roots for optimal growth and efficiency."
            image="/assets/images/drip.jpg"
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

export default SoilHealthManagement;
