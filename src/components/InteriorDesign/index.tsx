import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import { Roboto } from "next/font/google";

const acumin_pro = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const InteriorDesignSection: React.FC = () => {
  const lenis = useLenis();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (lenis) {
      lenis.on("scroll", () => {});
    }

    return () => {
      if (lenis) {
        lenis.off("scroll", () => {});
      }
    };
  }, [lenis]);

  const projects: any = [
    {
      index: 1,
      image: "/images/wrapper3.svg",
    },
    {
      index: 2,
      image: "/images/wrapper1.svg",
    },
    {
      index: 3,
      image: "/images/wrapper2.svg",
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-cover bg-center bg-white">
      <div
        style={{
          backgroundImage: `url('/images/connect_1.svg')`,
          backgroundPosition: 'top center' ,
          backgroundSize: "1160px auto",
          backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
        }}
      >
        {/* <div className="mx">
        <Image
          src="/images/connect_1.svg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
          className="object-cover object-top bg-no-repeat w-full bg-black"
        />
      </div> */}
        <div className="mx-auto max-w-6xl relative flex flex-col justify-center lg:py-36 pt-12 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2  text-[#6D6E72] relative"
          >
            <div className="space-y-2 flex-col flex justify-end">
              <h2
                className={`mb-4 text-left lg:absolute text-4xl max-w-5xl  w-full leading-10  lg:-top-20 xl:-top-24  z-10 sm:text-6xl lg:text-7xl  xl:text-8xl ${acumin_pro.className}`}
                data-aos="fade-up"
              >
                Setting new standards in interior des{" "}
                <span className="xl:text-white xl:-ml-6 sm:-ml-4 -ml-2">
                  ign
                </span>{" "}
                <span className="lg:text-white xl:text-[#6D6E72]">
                  excellence
                </span>{" "}
              </h2>
              <p
                className="px-6 py-4 mr-8 text-sm bg-[#F2F1EF] "
                data-aos="fade-up"
                data-aos-delay="200"
              >
                As a premier interior architecture studio, we specialize in
                transforming both residential and commercial spaces into
                environments that resonate with the individuality and
                aspirations of our clients.
              </p>
            </div>
            <div className="relative w-full h-[603px]">
              <Image
                src="/images/DESIGN_PICTURE_1.jpg"
                alt="Modern interior design"
                layout="fill"
                objectFit="cover"
                className=""
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-4 sm:gap-4 gap-4 sm:mt-6 mt-4 w-full">
            {projects.map((project: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative h-64 md:h-80 lg:h-96 ${
                  index === 1 ? "col-span-2" : "col-span-1"
                }`}
              >
                <Image
                  src={`${project.image}`}
                  alt={`Interior design example ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className=""
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignSection;
