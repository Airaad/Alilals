import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { ButtonComponent } from "./ButtonComponent";
import Link from "next/link";

const AboutCompany = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start md:space-x-8 py-12 px-6 bg-[#F6F2EF] md:px-20">
      <div className="lg:w-[30%] md:w-[50%] w-full mb-6 lg:mb-0">
        <img
          src="/assets/images/Gallery/20230310_181728.jpg"
          alt="Company Image"
          className="lg:w-[600px] lg:h-[700px] object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="lg:w-1/2 w-full">
        <div className="flex gap-2 items-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">Who We Are</span>
        </div>
        <h2 className="text-4xl font-bold text-[#1A3A32] mb-4">
          Welcome to Alilals Agrico Pvt. Ltd
        </h2>
        <div className="mb-6">
          <p className="text-md text-[#636363] mb-4 text-justify">
            We are an agriculture company based in the heart of Jammu and
            Kashmir, dedicated to transforming the region's agricultural
            landscape through innovation, sustainability, and farmer
            empowerment. Established with a vision to uplift communities and
            modernize traditional farming practices, the company specializes in
            high-density orchard development, precision farming, and advanced
            technological interventions tailored to the unique needs of farmers.
            <br />
            Driven by the mission to optimise yields, enhance profitability, and
            minimize environmental impact, Alilals Agrico integrates
            cutting-edge techniques with a deep respect for nature. Its flagship
            brand, AASH<sup>TM</sup> (Alilals Agrico's Sustainable Harvests),
            embodies the company's commitment to delivering excellence in
            orchard care services. Additionally, Alilals Agrico extends its
            reach through initiatives like ZIRAAT<sup>TM</sup>, providing
            quality fertilizers and plant nutritional supplements, backed by
            expert guidance and data-driven solutions.
            <br />
            At its core, Alilals Agrico is more than a business—it is a movement
            toward sustainable farming and a prosperous future for Indian
            agriculture industry. By empowering farmers with knowledge, tools,
            and resources, the company envisions a thriving agricultural
            ecosystem that balances innovation with tradition, ensuring
            long-term growth for its people.
          </p>
          <div className="h-[0.09rem] bg-[#44A05B] w-full " />
        </div>

        {/* Features Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Unmatched quality matches excellence in Services.</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Precession Farming for Sustainable Future.</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>Farmer Centric Interventions with ease of doing farming.</p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <p>After care services with expert backed support system.</p>
            </div>
          </div>

          <div className="mx-auto lg:mx-0">
            <Link href="/contact">
              <ButtonComponent text="Contact Us" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
