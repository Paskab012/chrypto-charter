import { motion } from "framer-motion";
import Image from "next/image";

const ServicesSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
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
    <section className='relative w-full py-20 lg:py-32 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-[#151616]/80'>
        <motion.div
          variants={imageVariants}
          initial='initial'
          animate='animate'
          className='relative h-full w-full'
        >
          <Image
            src='/charter/service_bg.svg'
            alt='Luxury Charter'
            layout='fill'
            objectFit='cover'
            priority
            className='object-cover'
          />
        </motion.div>
      </div>

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-left mb-16 lg:mb-24'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
            Our services
          </h2>
          <p className='text-[#A0A0A0] max-w-3xl  text-lg'>
            Our bespoke private jet and yacht charter services deliver
            unparalleled luxury, personalized comfort, and seamless global
            experiences tailored precisely to your most discerning desires.
          </p>
        </motion.div>

        {/* Private Jet Charter Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 lg:mb-32 items-center relative bg-[#1B1B1B99]/80'>
          <motion.div {...fadeInLeft} className='lg:px-8 px-4 pt-6'>
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Private Jet Charter
            </h3>
            <p className='text-[#A0A0A0] mb-4'>
              Private Jet Charter is undoubtedly the most convenient way to
              travel by plane.
            </p>
            <p className='text-[#A0A0A0] mb-4'>
              You can fly point to point at your chosen time and bring along
              your family members or Business Partners.
            </p>
            <p className='text-[#A0A0A0]'>
              The real luxury you buy with a private jet is time, thus many
              refer to private jets as time machines.
            </p>
          </motion.div>
          <motion.div
            {...fadeInRight}
            className='relative h-[300px] lg:h-[400px]'
          >
            <Image
              src='/charter/jet.svg'
              alt='Private Jet'
              layout='fill'
              objectFit='cover'
              className=''
              priority
            />
          </motion.div>
        </div>

        {/* Yacht Charter Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative bg-[#1B1B1B99]/80'>
          <motion.div
            {...fadeInLeft}
            className='relative h-[300px] lg:h-[400px] lg:order-1 order-2'
          >
            <Image
              src='/charter/yatch.svg'
              alt='Luxury Yacht'
              layout='fill'
              objectFit='cover'
              className=''
              priority
            />
          </motion.div>
          <motion.div
            {...fadeInRight}
            className='lg:px-8 px-4 pt-6 order-1 lg:order-2'
          >
            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Yacht Charter
            </h3>
            <p className='text-[#A0A0A0] mb-4'>
              There is no better time spent than on a yacht with your friends
              and family.
            </p>
            <p className='text-[#A0A0A0] mb-4'>
              Crypto Charter offers yachts of all sizes in many locations. With
              our local partners we strive to create your perfect holiday and
              journey.
            </p>
            <p className='text-[#A0A0A0]'>
              Whether you wish to explore Scandinavia, discover culinary gems in
              Southern Europe or hop the islands in the Caribbean, we help
              designing your dream holiday.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
