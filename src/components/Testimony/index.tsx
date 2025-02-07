import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import AOS from "aos";
import { useLenis } from "@studio-freight/react-lenis";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Roboto } from "next/font/google";

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"]
});

const testimonials = [
  {
    name: "Alice T.",
    company: "EduTech Solutions",
    text: "Cryprto-charter Studio transformed my living space into a true masterpiece. The attention to detail and personal touch in every aspect of the design exceeded my expectations. My home now feels modern yet cozy."
  },
  {
    name: "Jean Paul",
    company: "Kivu Noir",
    text: "Working with Cryprto-charter Studio was an absolute pleasure. Their professionalism, creativity, and dedication to excellence were evident in every step of the project. The team's ability to blend aesthetics"
  }
];

const TestimonialsSection = () => {
  const sliderRef = useRef(null);
  useLenis();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section className=' min-h-screen/2 w-full lg:flex justify-start pt-10 pb-20 items-center bg-[#383836]'>
      <div className='mx-auto w-full  z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='py-6 mb-6 flex justify-between   flex-col md:flex-row items-center  w-full mx-auto'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex-1   border-b-2 border-[#AEA797]/30'
          />
          <h1
            className={`text-left  text-4xl px-4 py-3 font-bold text-[#AEA797] sm:text-5xl md:text-6xl ${acumin_pro.className}`}
            data-aos='fade-up'
            data-aos-delay='200'
          >
            What our customers say
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex-1   border-b-2 border-[#AEA797]/30'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='max-w-5xl mx-auto'
        >
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className='testimonials-slider'
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className='px-4'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className='bg-[#40403E]  h-full min-h-auto p-4 text-[#E7E7E7] rounded-lg  justify-between'
                >
                  <p className=' leading-relaxed text-sm'>
                    "{testimonial.text}"
                  </p>
                  <div className='mt-4'>
                    <h3 className={` font-semibold  ${acumin_pro.className}`}>
                      {testimonial.name}
                    </h3>
                    <p className=' text-sm mt-1'>{testimonial.company}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
