"use client";
import Marquee from "react-fast-marquee";

const partners = [
  {
    id: 1,
    logo: "./assets/images/partners/partner1.png",
    alt: "Partner 1",
  },
  {
    id: 2,
    logo: "./assets/images/partners/partner2.png",
    alt: "Partner 2",
  },
  {
    id: 3,
    logo: "./assets/images/partners/partner3.svg",
    alt: "Partner 3",
  },
  {
    id: 4,
    logo: "./assets/images/partners/partner4.png",
    alt: "Partner 4",
  },
  {
    id: 5,
    logo: "./assets/images/partners/partner5.png",
    alt: "Partner 5",
  },
  {
    id: 6,
    logo: "./assets/images/partners/partner6.svg",
    alt: "Partner 6",
  },
  {
    id: 7,
    logo: "./assets/images/partners/partner7.png",
    alt: "Partner 7",
  },
  {
    id: 8,
    logo: "./assets/images/partners/partner8.png",
    alt: "Partner 8",
  },
];

const Ribbon = () => {
  return (
    <div className="relative bg-[#F6F2EF]">
      <Marquee
        gradient={true} // Disable gradient fading effect
        speed={50} // Adjust speed of the scroll
        pauseOnHover // Pause scrolling when hovered
        className="w-full flex items-center justify-between space-x-8"
      >
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center py-3 px-5"
          >
            <img
              src={partner.logo}
              alt={partner.alt}
              className="w-[180px] h-[120px] md:h-[180px] object-contain bg-transparent"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Ribbon;
