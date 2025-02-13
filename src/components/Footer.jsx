import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";

export function Footer() {
  return (
    <section
      className="relative overflow-hidden py-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/28387797/pexels-photo-28387797/free-photo-of-a-tree-with-many-apples-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Company Info */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                {/* SVG Logo */}
                <Image
                  src="/assets/logo/logo.png"
                  alt="Alilals"
                  height={40}
                  width={64}
                />
                <span className="ml-4 text-2xl font-bold text-white">
                  Alilals Agrico Private Limited
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()}. All Rights Reserved by
                  Alilals Agrico Private Limited.
                </p>
                <div className="flex gap-6 mt-5">
                  <a
                    href="https://www.facebook.com/ALILALSAGRICO/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className="text-white hover:text-gray-400 transition-transform duration-300 hover:scale-150" />
                  </a>
                  <a
                    href="https://www.instagram.com/alilalsagrico/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-white hover:text-gray-400 transition-transform duration-300 hover:scale-150" />
                  </a>
                  <a
                    href="https://www.youtube.com/@AlilalsAgricoPvtLtd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-white hover:text-gray-400 transition-transform duration-300 hover:scale-150" />
                  </a>
                </div>

                <div className="flex text-sm text-white  my-5">
                  <p>Website Designed by</p>
                  <Link
                    className="flex items-center ml-1 hover:text-green-200 underline"
                    href="https://www.instagram.com/harudstudios/"
                  >
                    <FaHeart className="text-red-500" />
                    <p className="ml-1">Harud Studios</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                Pages
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/about"
                  >
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/blog"
                  >
                    Knowledge
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="http://www.ziraat.in"
                    target="__BLANK"
                  >
                    Career
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="#"
                  >
                    Downloads
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/gallery"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/contact"
                  >
                    Customer Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-400">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/terms-and-conditions"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-white hover:text-gray-300"
                    href="/licensing"
                  >
                    Licensing
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
