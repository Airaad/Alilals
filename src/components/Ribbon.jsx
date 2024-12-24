"use client";
import Marquee from "react-fast-marquee";

const partners = [
  {
    id: 1,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EseM8xGgrPeEfubhmXjbXb3Tn-_1N_nOQA&s",
    alt: "Partner 1",
  },
  {
    id: 2,
    logo: "https://www.hubspot.com/hs-fs/hubfs/Pepsi_logo_2014.svg.png?width=450&height=458&name=Pepsi_logo_2014.svg.png",
    alt: "Partner 2",
  },
  {
    id: 3,
    logo: "https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png",
    alt: "Partner 3",
  },
  {
    id: 4,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiuIN8DZXe-tiAukUClF_vrAPMvp9qWNuNtg&s",
    alt: "Partner 4",
  },
  {
    id: 1,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EseM8xGgrPeEfubhmXjbXb3Tn-_1N_nOQA&s",
    alt: "Partner 1",
  },
  {
    id: 2,
    logo: "https://www.hubspot.com/hs-fs/hubfs/Pepsi_logo_2014.svg.png?width=450&height=458&name=Pepsi_logo_2014.svg.png",
    alt: "Partner 2",
  },
  {
    id: 3,
    logo: "https://www.pngfind.com/pngs/m/665-6659827_enterprise-comments-default-company-logo-png-transparent-png.png",
    alt: "Partner 3",
  },
  {
    id: 4,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiuIN8DZXe-tiAukUClF_vrAPMvp9qWNuNtg&s",
    alt: "Partner 4",
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
          <div key={index} className="flex items-center justify-center p-3">
            <img
              src={partner.logo}
              alt={partner.alt}
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Ribbon;
