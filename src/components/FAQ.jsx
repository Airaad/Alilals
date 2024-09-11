"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { RiLeafFill } from "react-icons/ri";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does your agriculture company offer?",
      answer:
        "We provide a range of services including crop consultation, soil testing, irrigation solutions, and agricultural machinery leasing.",
    },
    {
      question: "How do you ensure the quality of the crops?",
      answer:
        "We use modern farming techniques, quality seeds, and continuous monitoring of crop growth to ensure the highest quality standards are met.",
    },
    {
      question: "Do you offer organic farming solutions?",
      answer:
        "Yes, we offer organic farming solutions including organic fertilizers, pest control methods, and training for sustainable farming practices.",
    },
    {
      question: "How can I get in touch with your support team?",
      answer:
        "You can reach our support team through email, phone, or by visiting our office. We are available 24/7 for any queries you may have.",
    },
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row  py-12">
      <div className="w-full md:w-1/2 p-6 pl-8">
        <div className="flex gap-2 items-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">FAQ</span>
        </div>
        <h2 className="text-4xl text-[#122F2A] font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 text-lg text-[#636363]">
          Learn more about our agriculture company through these common
          questions.
        </p>
        <div className="h-[0.09rem] bg-[#44A05B] w-full my-5" />

        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full flex justify-between items-center py-3 px-4 text-left bg-[#F6F4EC] rounded-md hover:bg-[#44A05B] transition duration-300"
            >
              <span className="text-lg text-[#122F2A] font-medium">
                {faq.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="p-4 text-[#636363]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full md:w-1/2 p-6">
        <img
          src="/assets/images/pexels-thealmani-19447958.jpg" // Replace with your actual image path
          alt="Agriculture Company"
          className="w-full md:h-[600px] lg:w-[400px] lg:h-[600px] h-auto ml-auto rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default FAQ;
