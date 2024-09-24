"use client";
import React from "react";
import { FaYoutube } from "react-icons/fa";

export function Testimonials() {
  const videos = [
    {
      id: 1,
      image: "https://img.youtube.com/vi/BnABcEtKFCA/hqdefault.jpg", // Replace VIDEO_ID2 with the actual YouTube video ID
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore.",
      name: "John Doe",
      role: "Frontend Developer at Harud",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID1", // Replace with the actual video URL
    },
    {
      id: 2,
      image: "https://img.youtube.com/vi/C-FuoKqQ80M/hqdefault.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore.",
      name: "Nisha",
      role: "Backend Developer at BEL",
      youtubeLink: "https://www.youtube.com/watch?v=C-FuoKqQ80M",
    },
    {
      id: 3,
      image: "https://img.youtube.com/vi/VjpQ4D8wDpA/hqdefault.jpg",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore.",
      name: "Alex",
      role: "Fullstack Developer at CyberSpark",
      youtubeLink: "https://www.youtube.com/watch?v=VjpQ4D8wDpA",
    },
  ];

  const backgroundStyle = {
    backgroundColor: "#f6f4ec",
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/arches.png")',
  };

  return (
    <section
      style={backgroundStyle}
      className="px-6 py-14 md:py-16 bg-[#F6F4EC]"
    >
      <div className="flex flex-col gap-1 items-center mb-16">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <div className="h-[0.15rem] bg-[#44A05B] w-48 " />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-lg p-4">
            <a
              href={video.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-full h-52 object-cover rounded-t-lg"
                src={video.image}
                alt={video.name}
              />
            </a>
            <div className="p-4">
              <p className="mt-4 text-gray-700">{video.description}</p>
              <a
                href={video.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-red-500 font-semibold"
              >
                <FaYoutube className="mr-2" /> Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
