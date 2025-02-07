import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const HeroSection = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const imageVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden  xl:py-40 lg:py-32 md:py-28'>
      {/* <motion.div
        className='absolute opacity-20 w-[67.5rem] h-[49.75rem] -top-[8.8125rem] -left-[10.75rem] backdrop-blur-[160px] z-0'
        initial={{ x: 0 }}
        animate={{
          x: [-200, 200]
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #7BDDE2 13.5%, rgba(127, 208, 231, 0) 100%)"
        }}
      /> */}

      <div className='absolute inset-0 '>
        <motion.div
          variants={imageVariants}
          initial='initial'
          animate='animate'
          className='relative h-full w-full'
        >
          <Image
            src='/charter/dot_png.svg'
            alt='Luxury Charter'
            layout='fill'
            objectFit='cover'
            priority
            className='object-cover'
          />
        </motion.div>
      </div>

      <div className='relative h-full w-full'>
        <div className='mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid h-full grid-cols-1 items-center lg:grid-cols-2'>
            <motion.div
              initial='initial'
              animate='animate'
              variants={fadeInLeft}
              className='z-10 pt-20 lg:pt-0'
            >
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'>
                Charter your way
                <br />
                <span className='text-[#A0A0A0]'>no compromises</span>
              </h1>

              <p className='mt-6 max-w-lg text-lg text-[#A0A0A0]'>
                Transparent, Secure, and Instant Bookings for Discerning
                Travelers
              </p>
            </motion.div>

            <motion.div
              initial='initial'
              animate='animate'
              variants={fadeInRight}
              className='relative z-10 h-full'
            >
              <div className='absolute right-0 top-1/2 -translate-y-1/2 transform'>
                <div className='relative'>
                  <Image
                    src='/charter/hero_img.svg'
                    alt='Yacht & Luxury jet'
                    width={600}
                    height={800}
                    className='object-contain'
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className='absolute bottom-0 left-60 h-16 w-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600'
      />
    </section>
  );
};

export default HeroSection;
