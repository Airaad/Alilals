import React from "react";

const Banner = ({ title, backgroundImage, height = "h-auto" }) => {
  return (
    <>
      <div
        className="relative w-full md:hidden"
        style={{
          paddingTop: "56.25%", // This maintains a 16:9 aspect ratio
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Title */}
          <div className="relative z-10 flex justify-center items-center h-full">
            <h1 className="text-white text-center text-4xl md:text-6xl font-semibold">
              {title}
            </h1>
          </div>

          {/* Top and bottom corner design elements */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[70px] border-t-[#193831] border-r-[50px] border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[70px] border-b-[#193831] border-l-[50px] border-l-transparent"></div>
        </div>
      </div>
      <div
        className="relative w-full hidden md:block"
        style={{
          paddingTop: "56.25%", // This maintains a 16:9 aspect ratio
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Title */}
          <div className="relative z-10 flex justify-center items-center h-full">
            <h1 className="text-white text-center text-4xl md:text-6xl font-semibold">
              {title}
            </h1>
          </div>

          {/* Top and bottom corner design elements */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[70px] border-t-[#193831] border-r-[50px] border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[70px] border-b-[#193831] border-l-[50px] border-l-transparent"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
