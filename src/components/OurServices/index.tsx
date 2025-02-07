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
// import formatDescription from "helpers/textFormater";

interface OurServiceCards {
  title: string;
  description: string;
}

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"]
});

const values: OurServiceCards[] = [
  {
    title: "Client Consultation",
    description: ` Webegin each project by connecting deeply with our clients to understand their goals, vision, and the
 unique character of their space. Through in-depth discussions and site analysis, we explore not just the
 technical aspects but also the personal desires and aspirations that will shape the design`
  },
  {
    title: "Concept Development",
    description: `Transforming ideas into reality starts with a clear vision. We create tailored concept designs through
 moodboards and site planning, capturing the essence of your style while ensuring harmony with the
 environment. Every concept is designed to reflect your individuality and the functional requirements of
 the space.`
  },
  {
    title: "Design Development",
    description: ` Bringing your vision to life in vivid detail, we produce 2D and 3D visualizations that give you a clear
 picture of how the final project will look and feel. Throughout this process, we stay closely aligned with
 your vision, making sure every detail is purposeful and reflects your personal or business identity.`
  },
  {
    title: "Site Supervision",
    description: `Webelieve that great design is as much about execution as it is about imagination. Our team works
 closely with contractors, engineers, and other professionals to ensure that the design is brought to life
 seamlessly, overseeing every aspect of the project’s implementation to deliver results that match the
 vision.`
  },
  {
    title: " Furniture and Material Acquisition",
    description: ` The right furniture and materials can transform a space. We provide expert guidance in selecting
 furnishings and materials that not only fit your style but also complement the design and functionality of
 the space. Our recommendations ensure that every detail enhances the beauty and comfort of your
 environment.`
  }
];

function OurServicesSection() {
  const sliderRef = useRef<Slider | null>(null);
  useLenis();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 4000,
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
    ],
    dotsClass: "slick-dots custom-dots",
    customPaging: (i: number) => <div className='custom-dot'></div>
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  return (
    <section className='relative min-h-screen w-full lg:flex bg-[#383836] justify-start py-16 items-center bg-cover bg-center text-white'>
      <Image
        src='/images/portfolio2.svg'
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
          className='py-8 mb-16 flex justify-between bg-transparent relative border-r border-[#AEA797]/30 flex-col md:flex-row items-center max-w-5xl mx-auto p-8'
        >
          <h1
            className={`text-left text-4xl font-bold text-[#fff] sm:text-5xl md:text-6xl ${acumin_pro.className}`}
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Our services
          </h1>
          <p
            className='text-white/70 max-w-md font-light mt-4 md:mt-0'
            data-aos='fade-up'
            data-aos-delay='400'
          >
            We offer bespoke design solutions for residential, commercial, and
            hospitality spaces, focusing on personalized consultations,
            innovative layouts, and user-friendly environments that reflect our
            clients' visions and enhance the overall experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className=' max-w-5xl mx-auto'
        >
          <Slider
            ref={sliderRef}
            {...sliderSettings}
            className='services-slider flex'
          >
            {values.map((service, index) => (
              <div key={index} className='pl-2'>
                <div className='bg-black/40 border border-white/10 backdrop-blur-md p-8 h-[250px]'>
                  <motion.div
                    className='flex items-start flex-col mb-4'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    data-aos='fade-up'
                    data-aos-delay={index * 100}
                  >
                    <h3
                      className={`lg:text-3xl text-2xl max-w-xl mb-4 font-semibold text-white ${acumin_pro.className}`}
                    >
                      {service.title}
                    </h3>
                    <p className='text-white leading-relaxed text-sm'>
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
}

export default OurServicesSection;
