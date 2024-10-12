import React from "react";
import { RiLeafFill } from "react-icons/ri";

const AboutHistory = () => {
  const historyData = [
    {
      year: "2010",
      description:
        "The company was founded with a mission to revolutionize the industry with innovative solutions.",
    },
    {
      year: "2015",
      description:
        "Expanded operations globally, entering new markets and establishing a strong international presence.",
    },
    {
      year: "2020",
      description:
        "Launched a new line of eco-friendly products that helped promote sustainability.",
    },
    {
      year: "2023",
      description:
        "Achieved a major milestone of 1 million customers served worldwide.",
    },
  ];

  return (
    <div className="py-12 px-6 bg-[#F6F2EF] md:px-20">
      <div className="flex gap-2 items-center">
        <RiLeafFill className="text-[#44A05B]" />
        <span className="text-[#44A05B]">History</span>
      </div>
      <h2 className="text-4xl font-bold text-[#1A3A32]  mb-4">Our History</h2>
      <div className="mb-6">
        <p className="text-md text-[#636363] mb-4">
          Our journey began with a vision to innovate and lead in our industry.
          Over the time, we have consistently evolved, embracing challenges and
          seizing opportunities to expand our reach.
        </p>
        <div className="h-[0.09rem] bg-[#44A05B] w-full " />
      </div>

      <div className="relative border-l-4 border-[#1A3A32] ml-4">
        {historyData.map((item, index) => (
          <div key={index} className="mb-8 ml-6">
            {/* Timeline Marker */}
            <div className="absolute w-11 h-11 bg-[#1A3A32] rounded-full -left-6 flex items-center justify-center text-white font-semibold">
              {item.year}
            </div>

            {/* Description */}
            <div className="pl-4">
              <p className="text-md md:text-lg my-16">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHistory;
