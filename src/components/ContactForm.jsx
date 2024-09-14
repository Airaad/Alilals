import React from 'react';
import { ButtonComponent } from './ButtonComponent';
import { RiLeafFill } from "react-icons/ri";

const ContactForm = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center py-16 px-8">

      <div className="absolute inset-0 w-full h-full">

        <div
          className="absolute top-0 left-0 w-full h-full bg-[#44A05B]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
          }}
        ></div>
        

        <div
          className="absolute top-0 left-0 w-full h-full bg-[#202221]"
          style={{
            clipPath: 'polygon(0 100%, 100% 0%, 100% 100%, 0 100%)',
          }}
        ></div>
      </div>

      {/* Form */}
      <div className="relative z-10 bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex gap-2 items-center justify-center">
        <RiLeafFill className="text-[#44A05B]" />
        <span className="text-[#44A05B]">Contact Us</span>
      </div>
        <h2 className="text-3xl font-bold text-center text-[#202221] mb-6">Get In Touch</h2>
        <div className="h-[0.09rem] bg-[#44A05B] w-full mb-8" />
        <form>
          <div className="mb-4">
            <label className="block text-[#636363] mb-2">Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]" placeholder="Your Name" required/>
          </div>
          <div className="mb-4">
            <label className="block text-[#636363] mb-2">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]" placeholder="Your Email" required />
          </div>
          <div className="mb-4">
            <label className="block text-[#636363] mb-2">Phone</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]" placeholder="Your Phone" required/>
          </div>
          <div className="mb-4">
            <label className="block text-[#636363] mb-2">Address</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]" placeholder="Your Address" required/>
          </div>
          <div className="mb-4">
            <label className="block text-[#636363] mb-2">Query</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#44A05B]" placeholder="Your Query" rows="4" required></textarea>
          </div>
          <div className="text-center">
          <ButtonComponent text='Send'/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
