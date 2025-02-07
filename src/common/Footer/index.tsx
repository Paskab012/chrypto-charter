import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const socialIcons = [
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/Cryprto-charter_studio/"
    },
    { Icon: FaFacebookF, href: "#" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full bg-[#2D2D2D] relative min-h-screen/2 bg-cover bg-bottom text-white py-16'
    >
      <Image
        src='/footer.svg'
        alt='Background'
        layout='fill'
        objectFit='cover'
        priority
        className='object-contain object-bottom bg-no-repeat w-12 h-12'
      />
      <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col relative items-center'>
        <div className='pb-8'>
          <div className='flex mx-auto w-full justify-center pb-4'>
            <Image
              width={160}
              height={40}
              src='/images/white.svg'
              className='w-full h-20 object-cover object-center'
              alt='BISFAY monogram'
            />
          </div>
        </div>

        <div className='mb-8 text-center max-w-md'>
          <p className=' font-light'>
            We create living spaces unique to our clients dreams and vision.
          </p>
        </div>

        <div className='text-center'>
          <p className=' pb-4 font-light'>Let's stay in touch. Follow us on</p>
          <div className='flex justify-center space-x-4'>
            {socialIcons.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className='bg-white text-[#1E1E1E] rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className=' text-gray-400 pt-4'>
          <p className='font-light'>
            © 2024 Cryprto-charter. All rights reserved..
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
