"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { IoCall, IoMail } from "react-icons/io5";
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="h-24">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-8 lg:px-8"
      >
        <div className="flex md:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <h2 className="text-4xl font-bold text-green-500">AlilalsAgrico</h2>
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>

        <PopoverGroup className="hidden md:flex md:gap-x-12">
          <Link
            href="/"
            className={`text-lg font-semibold leading-6 text-[#636363] hover:text-green-500 ${pathname == "/" ? "text-green-500" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-lg font-semibold leading-6 text-[#636363] hover:text-green-500 ${pathname == "/about" ? "text-green-500" : ""}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`text-lg font-semibold leading-6 text-[#636363] hover:text-green-500 ${pathname == "/contact" ? "text-green-500" : ""}`}
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className={`text-lg font-semibold leading-6 text-[#636363] hover:text-green-500 ${pathname == "/blog" ? "text-green-500" : ""}`}
          >
            Blogs
          </Link>
          <Link
            href="/estimation-calculator"
            className={`text-lg font-semibold leading-6 text-[#636363] hover:text-green-500 ${pathname == "/estimation-calculator" ? "text-green-500" : ""}`}
          >
            Estimation Calculator
          </Link>
        </PopoverGroup>
      </nav>

      <Transition
        show={mobileMenuOpen}
        enter="transition-transform ease-in-out duration-700"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform ease-in-out duration-700"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-10 overflow-hidden"
        >
          <DialogPanel className="fixed inset-y-0 left-0 z-20 w-[60%] max-w-sm overflow-y-auto bg-[#202221] px-7 py-7">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 ">
                <span className="sr-only">Your Company</span>
                <h2 className="text-xl text-[#44A05B]">AlilalsAgrico</h2>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-3.5 rounded-md pr-2  text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-7 w-7" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="h-[0.01rem] bg-gray-500 w-[80%] md:w-full " />
                  <Link
                    href="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <div className="h-[0.01rem] bg-gray-500 w-[80%] md:w-full " />
                  <Link
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <div className="h-[0.01rem] bg-gray-500 w-[80%] md:w-full " />
                  <Link
                    href="/blog"
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                  <div className="h-[0.01rem] bg-gray-500 w-[80%] md:w-full " />
                  <Link
                    href="/estimation-calculator"
                    className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-white hover:bg-gray-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Estimation Calculator
                  </Link>
                  <div className="h-[0.01rem] bg-gray-500 w-[80%] md:w-full " />
                </div>
                {/* social media icon */}
                <div className="flex space-x-4 mt-4">
                  <Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#44A05B]"
                  >
                    <FaFacebookF className="w-6 h-6" />
                  </Link>
                  <Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#44A05B]"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </Link>
                  <Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#44A05B]"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </Link>
                  <Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#44A05B]"
                  >
                    <FaPinterest className="w-6 h-6" />
                  </Link>
                </div>
                {/* contact-details */}
                <div className="mt-5 flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <IoCall className="text-[#44A05B]" />
                    <span className="text-white text-sm">999 888 0000</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <IoMail className="bg-[#44A05B]" />
                    <span className="text-white text-sm">
                      example@gmail.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </Transition>
    </header>
  );
}
