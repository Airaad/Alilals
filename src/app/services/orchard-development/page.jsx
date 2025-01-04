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
        backgroundImage="/assets/images/OrchardDevelopment.png"
      />

      {/* Description Section */}
      <div className="my-8 px-4 md:px-16">
        <h2 className="text-center text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide my-14">
          About Service
        </h2>
        <div className="">
          <p className="text-gray-600 leading-relaxed">
            At <b>Alilals Agrico</b>, we combine cutting-edge technology with
            sustainable agricultural practices to provide comprehensive{" "}
            <b>Orchard Management</b> services, tailored to meet the unique
            needs of your orchard. From the initial stages of establishment to
            post-harvest care, our expert team ensures that your orchard
            thrives, maximize productivity, and maintain long-term health and
            sustainability.
            <br />
            <br />
            Our holistic approach merges traditional farming techniques with
            modern innovations, optimizing every aspect of orchard care and
            management.
          </p>
        </div>

        {/* Comprehensive Services Section */}
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-[#44A05B] mb-10 text-center">
            Comprehensive Orchard Management Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* High-Density Orchard Development and Management Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                High-Density Orchard Development and Management Services
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Maximize yield potential with advanced trellis spacing
                    systems, optimizing space utilization and crop productivity.
                    Maximize crop yield potential and productivity with advanced
                    trellis systems that optimize space utilization, ensure
                    precise plant spacing, improve air circulation, reduce
                    disease risks, and simplify harvesting, all while fostering
                    efficient and healthy plant growth.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Provide expert guidance on rootstock and varietal selection,
                    ensuring compatibility with local climatic conditions, soil
                    types, and altitude for improved growth and yield.
                  </span>
                </li>
              </ul>
            </div>

            {/* Soil Health and Nutrient Management Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Soil Health and Nutrient Management Services
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Perform soil profiling and nutrient analysis to craft
                    customized fertility plans that support sustainable orchard
                    growth.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Apply organic amendments, precision fertilizers, and
                    bio-fertilizers based on crop demand, ensuring balanced
                    nutrient availability while preventing imbalances.
                  </span>
                </li>
              </ul>
            </div>

            {/* IPDM Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Integrated Pest and Disease Management (IPDM) Services
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Utilize eco-friendly pest control strategies such as
                    pheromone traps, biocontrol agents, and botanical
                    insecticides to safeguard your orchard against harmful pests
                    and diseases.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Implement predictive models and geospatial mapping for early
                    detection, forecasting, and efficient management of pest
                    populations.
                  </span>
                </li>
              </ul>
            </div>

            {/* Pruning and Canopy Management */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Pruning and Canopy Management Services
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Use manual and mechanical pruning to improve tree
                    architecture, optimize sunlight exposure, and enhance
                    photosynthesis, ultimately boosting fruit quality and yield.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Apply growth regulators to manage vegetative growth,
                    encourage flowering, and optimize fruit set.
                  </span>
                </li>
              </ul>
            </div>

            {/* IrrigaAon and Water Management Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Irrigation and Water Management Services
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Design and implement advanced, water-efficient irrigation
                    system such as drip irrigation, promoting water conservation
                    without compromising crop hydration.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Integrate sensor-based monitoring systems for real-time
                    irrigation adjustments, ensuring optimal water use and
                    preventing water stress.
                  </span>
                </li>
              </ul>
            </div>

            {/* Data-Driven Services */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#44A05B]">
              <h4 className="text-xl font-semibold text-[#44A05B] mb-4">
                Data-Driven Decision Support
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Utilize remote sensing technology, drones, and IoT-based
                    monitoring systems to track orchard health in real-time,
                    allowing for data-backed decision-making.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#44A05B] mr-2">•</span>
                  <span>
                    Leverage data analytics to optimize long-term planning,
                    productivity enhancement, and farm management strategies.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-[#144835] text-white rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Why Partner with Alilals Agrico?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">
                Expert-Backed Strategies
              </h4>
              <p className="text-gray-200">
                Our expert team of horticulturists, agronomists, and specialized
                professionals provides tailored, research-based strategies for
                orchard success.
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">
                Sustainability Focused
              </h4>
              <p className="text-gray-200">
                We prioritize eco-friendly practices, ensuring that your orchard
                thrives while minimizing environmental impact.
              </p>
            </div>
            <div className="bg-[#1a5a42] p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Continuous Support</h4>
              <p className="text-gray-200">
                We provide ongoing consultation and aftercare services, helping
                your orchard succeed for the long term.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-200 max-w-3xl mx-auto">
            Alilals Agrico offers a future-focused, scientifically-driven
            approach to orchard management that blends tradition and innovation.
            Revolutionize your orchard operations today with expert services
            that deliver sustainable results, enhance productivity, and ensure
            premium quality yields.
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
            title="High Density Orchard"
            description="Generate ESTIMATE based on your desired material, spacing and land area. Download Estimate and Book Your Orchard online."
            image="/assets/images/20240811_151341.jpg"
            link="orchard-development/book-orchard"
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
      <div className="text-center lg:w-[75%] mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold text-[#44A05B] tracking-wide mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-500 font-light mb-12">
          Confused about the service you need? Feel free to contact us.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default OrchardDevelopment;
