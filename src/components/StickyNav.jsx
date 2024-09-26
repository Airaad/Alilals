import Link from "next/link";
import { BsFlower1 } from "react-icons/bs";

const StickyNav = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-[#122F2A] text-lg font-bold hover:text-[#44A05B] transition-colors duration-300">
          <BsFlower1 className="text-pink-500 w-6 h-6 animate-spin-slow" />
          <span>Our Orchid Store</span>
        </div>

        <Link
          href="/book-orchid"
          className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text font-bold px-4 py-2 border border-purple-500 rounded-full animate-pulse hover:shadow-lg"
        >
          Buy Orchids
        </Link>
      </div>
    </div>
  );
};

export default StickyNav;
