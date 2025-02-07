"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import AOS from "aos";
import { useLenis } from "@studio-freight/react-lenis";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Roboto } from "next/font/google";
import Image from "next/image";

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"]
});

const values: ValueCard[] = [
  {
    title: "Mindfulness",
    description:
      "We believe in being present and thoughtful in everything we do. By respecting ourselves, our clients, and the environments we work in, we create spaces that are not only beautiful but also meaningful and impactful.",
    icon: "/images/mindfull.svg"
  },
  {
    title: "Creativity",
    description:
      "Every project is a canvas, and every client is an inspiration. We approach each design with fresh eyes, ensuring that our creativity is fueled by the uniqueness of our clients and their vision.",
    icon: "/images/passion.svg"
  },
  {
    title: "Openness",
    description:
      "We embrace every new opportunity with an open heart and mind. Whether it's exploring bold new concepts or adapting to our clients' evolving needs, we thrive on being flexible, curious, and ready to push boundaries.",
    icon: "/images/openness.svg"
  },
  {
    title: "Passion-Driven",
    description:
      "Our passion is the foundation of every project we undertake. We are deeply driven by the purpose and meaning behind our work, striving to deliver designs that not only meet our clients' needs but exceed their expectations.",
    icon: "/images/creativity.svg"
  }
];

function OurValuesComponent() {
  useLenis();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section className='relative min-h-screen w-full pb-24 pt-16 bg-cover bg-center text-white'>
      <Image
        src='/images/value.svg'
        alt='Background'
        layout='fill'
        objectFit='cover'
        priority
        className='object-cover object-top bg-no-repeat w-full'
      />

      <div className='max-w-7xl mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='py-8 mb-16 flex justify-between bg-[#F2F1EF] relative border-r border-[#AEA797]/30 flex-col md:flex-row items-center max-w-5xl mx-auto p-8'
        >
          <h1
            className={`text-left text-4xl font-bold text-[#6D6E72] sm:text-5xl md:text-6xl ${acumin_pro.className}`}
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Our values
          </h1>
          <p
            className='text-gray-600 max-w-md font-light mt-4 md:mt-0'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            Our company values center around creativity, collaboration,
            individuality, and user-centered design. We are committed to
            crafting spaces that reflect our clients' visions while enhancing
            the experiences of everyone who interacts with those environments.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:mt-16 mt-8 max-w-5xl mx-auto'>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className='bg-white/90 p-8'
            >
              <div className='flex items-start flex-col mb-4'>
                <div className='w-12 h-12 '>
                  <Image
                    src={value.icon}
                    alt={value.title}
                    width={48}
                    height={48}
                    className='object-contain'
                  />
                </div>
                <h3
                  className={`lg:text-3xl text-2xl mt-4 font-semibold text-[#6D6E72] ${acumin_pro.className}`}
                >
                  {value.title}
                </h3>
              </div>
              <p className='text-[#818286] leading-relaxed text-sm'>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurValuesComponent;
