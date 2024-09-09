"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "/assets/images/apples-7566512_1280.jpg", 
      title: "Nurturing Growth, Cultivating Success",
      description: "Explore our comprehensive range of products and services designed to support every stage of your farming journey.",
    },
    {
      id: 2,
      image: "/assets/images/pexels-flambo-388007-1112080.jpg",
      title: "Cultivating the Future of Farming",
      description: "Explore innovative solutions and cutting-edge technologies designed to enhance your agricultural practices.",
    },
    {
      id: 3,
      image: "/assets/images/dan-meyers-IQVFVH0ajag-unsplash.jpg",
      title: "Grow Beyond Limits",
      description: "Discover resources and tools that empower farmers to achieve more. From modern farming techniques to expert advice.",
    },
  ];

  const backgroundStyle = {
    backgroundColor: '#f6f4ec',
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/arches.png")'
  };
  return (
    <div style={backgroundStyle} className="relative h-[80vh] md:h-[85vh] w-full bg-[#F6F4EC]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        fadeEffect={{ crossFade: true }} 
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
          <div className='flex flex-col md:flex-row h-screen'>
            <div className=' flex-1 flex justify-center items-center'>
            <div className='flex flex-col gap-4 w-3/4'>
              <h2 className='font-semibold text-md md:text-lg'>WELCOME TO <span className='text-[#44A05B]'>ALILALS !</span></h2>
              <h3 className='text-3xl md:text-5xl font-bold text-[#122F2A]'>{slide.title}</h3>
              <p className='text-md md:text-lg text-[#636363]'>{slide.description}</p>
              </div>
            </div>
            <div className=' flex-1 md:flex-none md:w-[50%] lg:w-[43%]'>
            <div
              className="relative h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />
            </div>
          </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
