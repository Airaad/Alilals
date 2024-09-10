"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function Testimonials() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore deserunt explicabo placeat! Fugit, molestias nesciunt",
      name: "John Doe",
      role: "Frontend Developer at Harud",
    },
    {
      id: 2,
      image:
        "https://passport-photo.online/images/cms/prepare_light_b364e3ec37.webp?quality=80&format=webp&width=1920",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore deserunt explicabo placeat! Fugit, molestias nesciunt",
      name: "Nisha",
      role: "Backend Developer at BEL",
    },
    {
      id: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUlz1U0tD1XCrGV3h1cajmk1lhVFru9Qabg&s",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aliquam repellat laborum minima tempore deserunt explicabo placeat! Fugit, molestias nesciunt",
      name: "Alex",
      role: "Fullstack Developer at CyberSpark",
    },
  ];
  return (
    <section className="px-6 py-14 md:py-16 ">
      <div className="flex flex-col gap-1 items-center mb-16">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <div className="h-[0.15rem] bg-[#44A05B] w-48 " />
      </div>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="px-16 py-16 md:px-10">
            <div className="mx-auto max-w-4xl">
              <div className="md:flex md:items-center md:justify-center md:space-x-14">
                <div className="relative h-48 w-48 flex-shrink-0">
                  <img
                    className="relative h-48 w-48 rounded-full object-cover"
                    src={slide.image}
                    alt=""
                  />
                </div>

                <div className="mt-10 md:mt-0">
                  <blockquote>
                    <p className="text-lg md:text-xl text-black">{slide.quote}</p>
                  </blockquote>
                  <p className="mt-7 text-lg font-semibold text-black">
                    {slide.name}
                  </p>
                  <p className="mt-1 text-base text-gray-600">{slide.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
