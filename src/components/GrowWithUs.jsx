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
            Popular Services
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Unlock the full potential of your orchard with our most popular
            services
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="High Density Orchard"
            description="Ready to start your own orchard? Secure your plot with us today and embark on your journey towards sustainable agriculture!"
            image="/assets/images/apples-1873078_1280.jpg"
            link="services/orchard-development/book-orchard"
            delay={0.4}
          />
          <ServiceCard
            title="Soil Test"
            description="Uncover your soil’s potential with detailed nutrient and composition analysis. Ensure your orchard thrives with our professional soil testing services."
            image="/assets/images/ai-generated-8756079_1280.jpg"
            link="services/soil-health-management/soil-test"
            delay={0.6}
          />
          <ServiceCard
            title="Expert Call"
            description="Get personalized advice from our seasoned experts on orchard management, soil health, and sustainable practices. Book your consultation today."
            image="/assets/images/call-center-8643477_1280.jpg"
            link="services/expert-advice/expert"
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
}
