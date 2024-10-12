import Link from "next/link";

export default function GrowWithUs() {
  return (
    <section className="bg-[#F6F2EF] py-12 px-10">
      <div className="container mx-auto text-center">
        <div className="mb-20 flex flex-col gap-2">
          <h2 className="text-5xl font-semibold text-[#44A05B] tracking-wide">
            Grow With Us
          </h2>
          <p className="text-lg text-gray-600">
            Unlock the full potential of your orchard with our expert services.
          </p>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {/* Book Your Orchard Card */}
          <div
            className="relative bg-cover bg-center bg-no-repeat h-96 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            style={{
              backgroundImage: "url('/assets/images/apples-1873078_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Book Your Orchard
              </h3>
              <p className="text-gray-200 mb-6">
                Ready to start your own orchard? Secure your plot with us today
                and embark on your journey towards sustainable agriculture!
              </p>
              <Link href="book-orchard">
                <button className="bg-[#44A05B] text-white font-medium py-2 px-5 rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors self-start">
                  Book Now
                </button>
              </Link>
            </div>
          </div>

          {/* Book Soil Test Card */}
          <div
            className="relative bg-cover bg-center bg-no-repeat h-96 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            style={{
              backgroundImage:
                "url('/assets/images/ai-generated-8756079_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Book Soil Test
              </h3>
              <p className="text-gray-200 mb-6">
                Discover the health of your soil. Get detailed insights into its
                nutrients and properties to grow the best crops.
              </p>
              <Link href="">
                <button className="bg-[#44A05B] text-white font-medium py-2 px-5 rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors self-start">
                  Schedule Test
                </button>
              </Link>
            </div>
          </div>

          {/* Speak to Our Expert Card */}
          <div
            className="relative bg-cover bg-center bg-no-repeat h-96 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            style={{
              backgroundImage:
                "url('/assets/images/call-center-8643477_1280.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Speak to Our Expert
              </h3>
              <p className="text-gray-200 mb-6">
                Have questions? Our seasoned experts are here to guide you on
                best practices, soil health, and orchard management.
              </p>
              <Link href="">
                <button className="bg-[#44A05B] text-white font-medium py-2 px-5 rounded-full shadow-lg hover:bg-white hover:text-[#44A05B] transition-colors self-start">
                  Talk to an Expert
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
