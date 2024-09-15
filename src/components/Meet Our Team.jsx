import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      socials: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "UI/UX Designer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      socials: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
      },
    },
    {
      id: 3,
      name: "Mike Ross",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      socials: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
      },
    },
  ];

  const backgroundStyle = {
    backgroundColor: "#f6f4ec",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/arches.png")',
  };

  return (
    <section style={backgroundStyle} className="p-12 bg-[#F6F4EC] mt-20">
      <div className="flex flex-col gap-1 items-center mb-16">
        <h1 className="text-2xl font-semibold">Meet Our Team</h1>
        <div className="h-[0.15rem] bg-[#44A05B] w-48 " />
        <p className="text-sm text-[#636363] text-center mt-5">
          We believe that a company is only as strong as its people. Our team of
          skilled professionals work tirelessly to deliver excellence at every
          step.
        </p>
      </div>
      <div className="container mx-auto px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#202221] bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] shadow-md rounded-lg p-12 flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
            >
              <div className="w-32 h-32 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="h-[0.15rem] bg-[#44A05B] w-full mb-5 " />
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-[#636363]">{member.role}</p>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-4">
                <Link
                  href={member.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#44A05B]"
                >
                  <FaFacebookF className="w-6 h-6" />
                </Link>
                <Link
                  href={member.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#44A05B]"
                >
                  <FaInstagram className="w-6 h-6" />
                </Link>
                <Link
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#44A05B]"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
