import BookOrchid from "@/components/book-orchid";
import PageTitle from "@/components/PageTitle";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative w-full bg-white py-10 md:py-20 md:px-24 xl:px-48 px-5">
        <h1 className="text-3xl md:text-5xl text-center mb-10 md:mb-16 text-green-600">
          Fill the form to book your orchid
        </h1>
        <div className="grid md:grid-cols-[70%_30%] gap-16">
          <div>
            <BookOrchid />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/assets/images/apples-1872997_1280.jpg"
              alt="error"
              className="w-96 h-64 my-5 rounded-xl"
            />
            <img
              src="/assets/images/pexels-nc-farm-bureau-mark-2252576.jpg"
              alt="error"
              className="w-96 h-64 my-5 rounded-xl"
            />
            <img
              src="/assets/images/vietnam-6634082_1280.jpg"
              alt="error"
              className="w-96 h-64 my-5 rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
