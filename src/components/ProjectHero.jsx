import React from "react";

const ProjectHero = () => {
  return (
    <div className="relative h-[515px] bg-[#142827]">
      <div className="relative z-10 flex flex-col justify-center gap-4 h-full">
        <h1 className="text-[#44A05B] text-5xl md:text-6xl font-semibold ml-10 md:ml-20">
          Our Projects
        </h1>
        <p className="ml-10 md:ml-20 w-[80%] md:w-1/2 text-white text-large font-light">
          "Explore the innovative initiatives that drive our commitment to
          sustainable orchard agriculture. Each project represents our passion
          for nurturing the land and fostering growth, from enhancing soil
          health to implementing eco-friendly practices. Join us as we showcase
          our dedication to cultivating a brighter future, one project at a
          time."
        </p>
      </div>{" "}
    </div>
  );
};

export default ProjectHero;
