import EstimationCalci from "@/components/EstimationCalci";
import OrchidSection from "@/components/OrchidSection";
import PageTitle from "@/components/PageTitle";
import React from "react";

const backgroundStyle = {
  backgroundColor: "#f6f4ec",
  backgroundImage:
    'url("https://www.transparenttextures.com/patterns/arches.png")',
};

const page = () => {
  return (
    <>
      <PageTitle pageTitle={""} />
      <OrchidSection />
      <div className="relative w-full bg-gray-100 py-10 md:py-20 md:px-48 px-5">
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div className="md:h-[80vh]">
            <EstimationCalci />
          </div>
          <div className="md:h-[90vh] md:flex flex-col">
            <img
              src="/assets/images/apples-1872997_1280.jpg"
              alt="error"
              className="w-96 h-72 my-5 rounded-xl"
            />
            <img
              src="/assets/images/pexels-nc-farm-bureau-mark-2252576.jpg"
              alt="error"
              className="w-96 h-72 my-5 rounded-xl"
            />
            <img
              src="/assets/images/vietnam-6634082_1280.jpg"
              alt="error"
              className="w-96 h-72 my-5 rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
