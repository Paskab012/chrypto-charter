"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaCloud,
  FaChartLine,
  FaPaintBrush,
  FaCubes,
  FaDatabase,
  FaMobile
} from "react-icons/fa";

import { Bebas_Neue } from "@next/font/google";

interface SectionItem {
  title: string;
  content: string;
  icon: React.ElementType;
  heading: string;
  description: string;
}

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"]
});
const sectionItems: SectionItem[] = [
  {
    title: "Mobile & Web Development",
    content:
      "We create responsive and user-friendly mobile and web applications.",
    icon: FaMobile,
    heading: "Building Seamless Digital Experiences",
    description:
      "Our expert team crafts innovative mobile and web applications tailored to your specific needs, ensuring a seamless user experience across all devices and platforms."
  },
  {
    title: "Cloud Native Infrastructure",
    content:
      "We design and implement scalable, resilient cloud-native solutions.",
    icon: FaCloud,
    heading: "Empowering Your Business with Cloud Technology",
    description:
      "Our cloud-native infrastructure solutions ensure scalability, reliability, and efficiency in your IT ecosystem, enabling faster deployment and reduced operational overhead."
  },
  {
    title: "Data Science",
    content:
      "We leverage advanced data analytics to derive actionable insights.",
    icon: FaDatabase,
    heading: "Unlocking the Power of Your Data",
    description:
      "Our data science experts transform raw data into valuable insights, employing cutting-edge algorithms and visualization techniques to drive informed decision-making and business growth."
  },
  {
    title: "Digital Marketing",
    content:
      "We create data-driven marketing strategies to boost your online presence.",
    icon: FaChartLine,
    heading: "Elevating Your Brand in the Digital Landscape",
    description:
      "Our digital marketing team crafts targeted campaigns that resonate with your audience, increasing engagement and driving conversions across all digital channels."
  },
  {
    title: "UI/UX Design",
    content:
      "We design intuitive and engaging user interfaces for your digital products.",
    icon: FaPaintBrush,
    heading: "Crafting Intuitive and Delightful User Experiences",
    description:
      "Our design team blends aesthetics with functionality to create visually stunning and user-friendly interfaces that leave a lasting impression on your audience."
  },
  {
    title: "Web3 Development",
    content:
      "We build decentralized applications and blockchain-based solutions.",
    icon: FaCubes,
    heading: "Pioneering the Future of the Web",
    description:
      "Our Web3 developers create innovative decentralized applications and blockchain solutions, helping you navigate and leverage the potential of this emerging technology."
  }
];

const InteractiveSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<SectionItem>(sectionItems[0]);

  return (
    <section
      id='Solutions'
      className='bg-gradient-to-r from-[#191B20]/10  to-[#191B20]/60 text-white py-16 px-4 sm:px-36 min-w-full mx-auto overflow-hidden relative min-h-screen'
    >
      <Image
        src='/service.svg'
        alt='Background'
        layout='fill'
        objectFit='cover'
        priority
        className='object-cover object-bottom bg-no-repeat w-full'
      />
      <div className='container mx-auto px-4 relative'>
        <div className='flex items-center gap-6 sm:text-xl pb-4 font-normal'>
          <div>
            <Image src='/images/Dot.svg' alt='VTG HUB' width={10} height={10} />
          </div>
          <div>
            <p>SHIPPING SOLUTIONS</p>
          </div>
        </div>

        <div className='h-px bg-gray-700 mb-8'></div>
        <h1
          className={`mb-4 sm:text-6xl text-4xl font-bold ${bebasNeue.className}`}
        >
          {" "}
          FROM IDEATION
          <br />
          TO DEPLOYMENT
        </h1>
        <p className='mb-12 max-w-2xl text-gray-400'>
          Transforming businesses through innovative mobile and web development,
          cloud-native solutions, data science, digital marketing, UI/UX design,
          and Web3 technologies. We provide exceptional custom software
          engineering and digital services tailored to your unique business
          needs.
        </p>

        <div className='flex flex-col md:flex-row relative space-y-8 md:space-y-0 md:space-x-12'>
          <div className='w-full md:w-1/3 flex'>
            {/* Line with dots */}
            <div className='relative mr-4 flex gap-7 flex-col items-center'>
              <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#615FEB] transform -translate-x-1/2'></div>
              {sectionItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === sectionItems.indexOf(activeItem)
                      ? "bg-white"
                      : "bg-indigo-600"
                  } mb-[42px] relative z-10`}
                  style={{ marginTop: index === 0 ? "24px" : "0" }}
                ></div>
              ))}
            </div>

            {/* Cards */}
            <div className='flex flex-col justify-center'>
              {sectionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveItem(item)}
                  className={`w-auto text-left py-4 px-6 text-nowrap mb-5 bg-[#23263B] border border-[#615FEB40] backdrop-blur-lg transition-colors relative ${
                    activeItem.title === item.title
                      ? "bg-opacity-100"
                      : "bg-opacity-50 hover:bg-opacity-75"
                  }`}
                >
                  <span
                    className={`text-lg ${
                      activeItem.title === item.title
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className='w-full md:w-2/3 relative'>
            <div className='p-8 rounded-lg'>
              <div className='  w-full justify-start items-center  mb-4 text-3xl'>
                <activeItem.icon className='text-6xl text-white bg-[#615FEB] p-2 rounded-2xl' />
              </div>
              <h3 className='text-3xl font-bold mb-4'>{activeItem.heading}</h3>
              <p className='mb-4 text-gray-400'>{activeItem.description}</p>
              <p className='text-gray-400'>{activeItem.content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;
