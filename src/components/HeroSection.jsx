"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const HeroVideo = () => {
  const slides = [
    {
      id: 1,
      title: "Nurturing Growth, Cultivating Success",
      description:
        "Explore our comprehensive range of products and services designed to support every stage of your farming journey.",
    },
    {
      id: 2,
      title: "Cultivating the Future of Farming",
      description:
        "Explore innovative solutions and cutting-edge technologies designed to enhance your agricultural practices.",
    },
    {
      id: 3,
      title: "Grow Beyond Limits",
      description:
        "Discover resources and tools that empower farmers to achieve more. From modern farming techniques to expert advice.",
    },
  ];

  return (
    <div className="relative h-[80vh] md:h-[85vh] w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/Video Banner Stock Videos - Rural_ Farming_ Agricu(720P_HD).mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="relative z-10 h-full flex items-center justify-center"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="text-center text-white flex flex-col items-center h-full justify-center gap-4">
              <h2 className="font-semibold text-lg md:text-xl">
                WELCOME TO <span className="text-[#44A05B]">ALILALS!</span>
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold">{slide.title}</h3>
              <p className="text-md md:text-lg">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default HeroVideo;
