"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { RiLeafFill } from "react-icons/ri";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What Services does your company offer?",
      answer:
        "We offer a range of services including High Density Orchard Installation, Soil Testing and Soil Health Management, Trellis infrastructure services, Micro Irrigation Services, Sale of Plants and Technical services for Orchard Management and Precision Farming in Jammu & Kashmir.",
    },
    {
      question: "How do you ensure quality?",
      answer:
        "We believe in a mantra that Quality never comes cheap. We outrightly reject any material offering more profit margins. We believe that any material used for orchard development, disease and nutrition management, if it comes cheap, can never deliver quality. We acquire material of a specific standard which is backed by reasonable certification. Our technical experts discuss thread bare with the suppliers and manufacturers about the product specifications and quality. Any material that comes to us an does not stand our quality test has to be dropped. This is the reason you see our products and services differently perform and are differently priced too.",
    },
    {
      question: "Are imported plants better than homegrown plants?",
      answer:
        "There is no physiological or genetic superiority of imported apple plants over homegrown plants. If we acquire rootstock from authentic sources, graft them with the desired variety (Scion) for which we have set up budwood bank locally, we will produce similar plants as we import from Europe.The only difference in an imported plant and a local one is price difference. Imported plants are exorbitantly costly.",
    },
    {
      question: "Is Drip Irrigation important for High Density Plants?",
      answer:
        "Irrigation is important for every apple fruit tree. Irrigation ensures the availability of nutrients to plants as it acts as a medium of transportation for many essential nutrients. Drip-irrigation is a precession farming technique which helps reach the water to most desired place offering optimal use of water. Drip-irrigation is an eco-friendly technique which helps in saving over 30% of water without impacting its essence to trees.",
    },
    {
      question:
        "Why many local nursery growers believe MM111 doesn't need drip irrigation? Can we save on irrigation component cost by using MM111 rootstock over M9 rootstock?",
      answer:
        "No! MM111 is relatively a drought resistant rootstock than M9. It can resist longer rainfall shortage periods, but that doesn't make MM111 a no-irrigation plant. It also requires an adequate amount of water to help transport nutrients in a plant. Drip-irrigation has nothing to do with the Rootstock type. It has its own essence, like; it saves water, ensures precession irrigation, saves on labour and is easy to operate. Rather, we need Drip-irrigation in seedling plants, which are more drought resistant than MM111 plants. This is why we irrigate our traditional apple tree orchards during Jun, July and August months. Irrigation also has very important role in transporting calcium in a plant. In absence of adequate water in hot summer days, we supply calcium to a plant through leaves by spraying calcium, while as same is available is almost every soil. What makes Calcium unavailable to a plant is non-availability of water. Hence, Drip-irrigation is an important component of modern farming in Apple.",
    },
    {
      question:
        "It takes almost 7 years an apple tree to bear fruit. How can we achieve next year fruiting in Apple?",
      answer:
        "Achieving fruiting in apples within a year is possible by using precocious dwarf rootstocks and advanced cultivation techniques. Here's how:\n • Dwarf Rootstocks: Use dwarfing or semi-dwarfing rootstocks (e.g., M9, M26 Or G Series Rootstock) that promote early fruiting and control tree size.\n • High-Density Planting: Plant trees at higher densities to optimize sunlight, space, and resources.\n • Pre-Grafted Saplings: Plant pre-grafted, 2-3 year-old saplings with well-developed root systems.\n • Precision Farming: Implement fertigation, optimal irrigation, and nutrient management to accelerate growth and flowering.\n • Plant Growth Regulators: Apply gibberellins or other hormones to promote flowering.\n • Pruning & Training: Use specialized pruning and training systems (e.g., trellis) to encourage productive growth. These methods ensure early productivity and profitability.",
    },
    {
      question:
        "In your opinion, which is an important component of a High Density Orchard?",
      answer:
        "While establishing a High Density apple Orchard, we work on 3 components Viz; Plant material, Trellis infrastructure and Irrigation network. All three components have their own essence in a commercial developed orchard. We have seen growers lay over-emphasis on plants and ignore Trellis component sustainability. High Density Plants, in a commercial orchard, last for lesser than a decade. We have seen varieties planted some 6 years ago are now obsolete. Every two years, we see a new variety come in the market and fetch more price, has more disease resistance, intense coloration and other characteristics. A progressive grower can change plants in an HDP orchard every 10 years with homegrown plants. But, it can never change Trellis Infra structure and irrigation system every now and then. We should give extra emphasis on selecting Trellis material and its structure which can withstand environmental adversities, like hail, snow, high temperature, wind and other rough climatic conditions. While choosing trellis material, we must ask the supplier various tough questions about the material quality, like protective coating for rust resistivity, tensile strength, MBL, IS standards lie IS1239 in GI pipes, wire reinforcement in pre-stressed poles, length of posts, grouping, angle at which the head post is installed and many other technical aspects of Trellis that could make it a Sustainable structure.",
    },
    {
      question:
        "What are rootstock plants and how are they different from seedling plants?",
      answer:
        "Rootstock plants in apples are essential for modern orchard practices. They are specially developed plants used as the foundation for grafting desired apple varieties. Rootstocks influence tree size, disease resistance, cold tolerance, and adaptability to soil conditions, ensuring consistent performance. Unlike seedling-based plants, which are grown from seeds and exhibit genetic variation, rootstock plants guarantee uniformity, making orchard management more efficient. Rootstocks allow precise control of tree vigor, enabling high-density planting and easier pruning, harvesting, and maintenance. By combining the best traits of rootstocks and scion varieties, growers achieve better yields, superior fruit quality, and sustainability in commercial apple production.",
    },
  ];

  return (
    <div className="bg-[#142827] py-12 px-6 md:px-12">
      <div className="px-6 lg:pl-8">
        <div className="flex gap-2 items-center">
          <RiLeafFill className="text-[#44A05B]" />
          <span className="text-[#44A05B]">FAQ</span>
        </div>
        <h2 className="text-4xl text-[#44A05B] font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 text-lg text-white">
          Know more about High Density farming in apple and other best practices
          in Horticulture.
        </p>
        <div className="h-[0.09rem] bg-[#44A05B] my-5" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex justify-between items-center py-3 px-4 text-left bg-[#F6F4EC] rounded-md hover:bg-gray-300 transition duration-300"
              >
                <span className="text-[#122F2A] font-medium">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${activeIndex === index ? "" : "max-h-0"}`}
              >
                <p className="p-4 text-white">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
