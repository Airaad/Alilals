"use client";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function GrowWithUs() {
  return (
    <section className="bg-[#F6F2EF] py-12 px-10">
      <div className="container mx-auto text-center">
        <div className="mb-20 flex flex-col gap-2">
          <motion.h2
            className="text-5xl font-semibold text-[#44A05B] tracking-wide"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Quick Access Tools
          </motion.h2>
          <motion.p
            className="md:text-lg text-gray-600 "
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our cost estimation tool oﬀers you a wide range of choices in
            designing your dream High Density apple orchard. Select from various
            drop-down options your desired inputs and generate an estimate, Book
            Service and feel the diﬀerence!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Orchard Cost Calculator"
            description="Generate ESTIMATE based on your desired material, spacing and land area. Download Estimate and Book Your Orchard online."
            image="/assets/images/20240811_151341.jpg"
            link="services/orchard-development/book-orchard"
            delay={0.4}
            bookText="Calculate Cost"
          />
          <ServiceCard
            title="Book a Soil Test"
            description="Before investing you earnings into soil, we let you know the properties and composition your soil carries. Book soil Sample collection and testing services here."
            image="/assets/images/20240423_135153.jpg"
            link="services/soil-health-management/soil-test"
            delay={0.6}
          />
          <ServiceCard
            title="Speak with an expert"
            description="Get personalized advice from our seasoned experts on orchard management, soil health, and sustainable practices. Book your consultation today."
            image="/assets/images/expertspeak.jpg"
            link="services/expert-advice/expert"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
