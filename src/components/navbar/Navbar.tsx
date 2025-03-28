import React, { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "" },
    { name: "About us", href: "#about" },
    { name: "Services", href: "#services" }
  ];

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <nav className='fixed w-full z-50 bg-[#27272773]/45 backdrop-blur-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <img
                src='/crypto-charter.svg'
                alt='Crypto Charter'
                className='h-10 w-auto'
              />
              <div className='ml-12  items-center space-x-8 hidden md:flex'>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-white hover:text-[#A0A0A0] transition-colors duration-200'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Link>
          </div>

          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-8'>
              <button className='bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white px-6 py-2 hover:opacity-90 transition-opacity duration-200'>
                <Link href='/get-quotes'>Get a quote</Link>
              </button>
            </div>
          </div>

          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-white p-2'
              aria-label='Toggle menu'
            >
              {isOpen ? (
                <IoClose className='h-6 w-6' />
              ) : (
                <HiBars3 className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={sidebarVariants}
            initial='closed'
            animate='open'
            exit='closed'
            className='md:hidden fixed inset-y-0 left-0 w-64 h-screen bg-[#272727] bg-opacity-80'
          >
            <div className='px-4 pt-20 space-y-6'>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='block text-white hover:text-[#A0A0A0] transition-colors duration-200'
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className='w-full bg-gradient-to-r from-[#933FFE]  via-[#4A5AF1] to-[#0074E4] text-white px-6 py-2 cursor-pointer  hover:opacity-90 transition-opacity duration-200'>
                <Link href='/get-quotes'>Get a quote</Link>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
