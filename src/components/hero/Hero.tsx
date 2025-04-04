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
    <section className='relative h-screen w-full overflow-hidden xl:py-40 lg:py-32 md:py-28 sm:py-24 py-20'>
      <div className='absolute inset-0'>
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
          <div className='grid h-full grid-cols-1 items-center lg:grid-cols-2 gap-8'>
            <motion.div
              initial='initial'
              animate='animate'
              variants={fadeInLeft}
              className='z-10 pt-20 lg:pt-0 max-w-full'
            >
              <h1 className='text-3xl xs:text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl'>
                Charter your way
                <br />
                <span className='text-[#A0A0A0]'>no compromises</span>
              </h1>

              <p className='mt-4 sm:mt-6 max-w-lg text-base sm:text-lg text-[#A0A0A0]'>
                Transparent, Secure, and Instant Bookings for Discerning
                Travelers
              </p>
            </motion.div>

            <motion.div
              initial='initial'
              animate='animate'
              variants={fadeInRight}
              className='relative z-10 h-full hidden sm:block'
            >
              <div className='absolute right-0 top-1/2 -translate-y-1/2 transform md:right-0 lg:right-0'>
                <div className='relative flex items-center justify-end'>
                  <div className='absolute -right-3 xs:-right-4 sm:-right-6 md:-right-8 lg:-right-10 -top-6 xs:-top-8 sm:-top-12 md:-top-16 lg:-top-20 z-0'>
                    <div className='relative overflow-hidden rounded-2xl shadow-xl w-[200px] xs:w-[240px] sm:w-[300px] md:w-[350px] lg:w-[420px]'>
                      <Image
                        src='/charter/yacht1.svg'
                        alt='Luxury yacht'
                        width={420}
                        height={340}
                        className='object-cover'
                        priority
                      />
                      <div className='absolute inset-0 bg-gradient-to-br from-[#2525267c] via-[#0d127c]/10 to-[#1561cd]/20'></div>
                    </div>
                  </div>

                  <div className='relative z-10 top-12 xs:top-16 sm:top-20 md:top-28 lg:top-40 right-12 xs:right-16 sm:right-20 md:right-28 lg:right-40'>
                    <div className='relative overflow-hidden rounded-2xl shadow-xl w-[200px] xs:w-[240px] sm:w-[300px] md:w-[350px] lg:w-[420px]'>
                      <Image
                        src='/charter/jet1.svg'
                        alt='Luxury private jet'
                        width={420}
                        height={340}
                        className='object-cover'
                        priority
                      />
                      <div className='absolute inset-0 bg-gradient-to-br from-[#2324249c]/20 via-[#090a1e43] to-[#352f4e85]'></div>
                      <div className='absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-[#f17d36]/20 to-transparent rounded-bl-2xl'></div>
                    </div>
                  </div>
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
        className='absolute bottom-0 left-8 sm:left-16 md:left-32 lg:left-60 h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600'
      />
    </section>
  );
};

export default HeroSection;
