import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface QuoteLayoutProps {
  children: ReactNode;
}

const QuoteLayout = ({ children }: QuoteLayoutProps) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className='relative min-h-screen w-full overflow-hidden bg-[#151616] py-20 '>
      <div
        className='absolute inset-0 w-full h-full opacity-20 pointer-events-none'
        style={{
          backgroundImage: `radial-gradient(circle at center, gray 1px, transparent 0.5px)`,
          backgroundSize: "12px 12px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat"
        }}
      />
      <div className='absolute inset-0'>
        <Image
          src='/charter/bg_quotes.svg'
          alt='Background Pattern'
          layout='fill'
          objectFit='cover'
          className='object-cover brightness-50 object-top'
          priority
        />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl px-4  sm:px-6 lg:px-8 md:pt-28 pt-20'>
        <motion.div
          variants={fadeIn}
          initial='initial'
          animate='animate'
          className='mb-12 lg:mb-16'
        >
          <h1 className='mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
            Get a quote
          </h1>
          <p className='max-w-2xl  text-[#A0A0A0]'>
            Our bespoke private jet and yacht charter services deliver
            unparalleled luxury, personalized comfort, and seamless global
            experiences tailored precisely to your most discerning desires.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial='initial'
          animate='animate'
          className=' max-w-5xl  bg-white p-6 shadow-xl sm:p-8'
        >
          {children}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className='absolute bottom-12 left-20 h-16 w-16 rounded-full bg-gradient-to-r from-orange-400 to-orange-600'
      />
    </section>
  );
};

export default QuoteLayout;
