'use client';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';
import { BsFillBookmarkFill } from 'react-icons/bs'; 

const partners = [
  { id: 1, logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50KdR_wsIBasH07GNS68gCGuX62rjD4bMNA&s', alt: 'Partner 1' },
  { id: 2, logo: 'https://www.hubspot.com/hs-fs/hubfs/Pepsi_logo_2014.svg.png?width=450&height=458&name=Pepsi_logo_2014.svg.png', alt: 'Partner 2' },
  { id: 3, logo: 'https://marketplace.canva.com/EAE0rNNM2Fg/1/0/1600w/canva-letter-c-trade-marketing-logo-design-template-r9VFYrbB35Y.jpg', alt: 'Partner 3' },
  { id: 4, logo: 'https://media.istockphoto.com/id/1313843101/vector/blue-logistics-logo-with-lines-highway-vector.jpg?s=612x612&w=0&k=20&c=8mueJQSnrwO6Mr-oRp12v3drokq1RJJZj6PWvmFjmWY=', alt: 'Partner 4' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Ribbon = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-r from-[#1a3b33] via-[#142827] to-[#1a3b33] py-12"
    >
      {/* Ribbon Icons */}
      <BsFillBookmarkFill
        className="absolute top-0 left-0 text-[#44A05B] text-5xl transform -translate-y-1/2 -translate-x-[5%]"
      />
      <BsFillBookmarkFill
        className="absolute top-0 right-0 text-[#44A05B] text-5xl transform -translate-y-1/2 translate-x-[5%]"
      />

      {/* Icon Header */}
      <div className="relative max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <FaHandshake className="text-white text-4xl" />
          <h2 className="text-3xl font-semibold text-white">
            Our Trusted Partners
          </h2>
        </div>
        <p className="text-white text-opacity-80 mb-8">
          We collaborate with leading organizations to deliver value.
        </p>
      </div>

      {/* Logos Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center bg-[#44A05B] rounded-lg shadow-lg py-6 border border-green-800 hover:shadow-2xl transition-all"
          >
            <img
              src={partner.logo}
              alt={partner.alt}
              className="max-w-[100px] h-auto mb-4"
            />
            {/* Uncomment below line if you want text under logos */}
            {/* <p className="text-gray-600 text-sm font-medium">{partner.alt}</p> */}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Ribbon;
