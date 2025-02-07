import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const textVariants = {
    initial: { opacity: 0, y: 50 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <div className=' inset-0 w-full h-full -z-10'>
        <Image
          src='/charter/about.svg'
          alt='Private Jet'
          layout='fill'
          objectFit='cover'
          className='brightness-50'
          priority
        />
      </div>

      <motion.div
        style={{ y }}
        className='absolute h-full w-full bg-gradient-to-b lg:top-20 top-0 left-0 lg:px-8 px-4'
      >
        <div className='container mx-auto max-w-7xl p-12 bg-[#151616]'>
          <motion.div
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true }}
            className='max-w-3xl'
          >
            <motion.h2
              variants={textVariants}
              className={`text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-4`}
            >
              About us
            </motion.h2>

            <motion.p
              variants={textVariants}
              className=' text-[#A0A0A0] max-w-5xl'
            >
              Our bespoke private jet and yacht charter services deliver
              unparalleled luxury, personalized comfort, and seamless global
              experiences tailored precisely to your most discerning desires.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
