import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const socialIcons = [
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/Cryprto-charter_studio/",
    },
    { Icon: FaFacebookF, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full relative min-h-screen/2 bg-cover bg-bottom text-white py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col relative items-center">
        <div className="text-center max-w-md">
          <p className=" font-light">Charter your way, no compromises</p>
        </div>
        <div className=" text-gray-400 pt-4">
          <p className="font-light">
            &copy; 2024 Crypto charter. All rights reserved..
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
