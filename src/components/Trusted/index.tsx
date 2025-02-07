import { Roboto } from "next/font/google";
import { motion } from "framer-motion";
import Image from "next/image";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const TrustedByMany = () => {
  const clients: any = [
    {
      index: 2,
      image: "/images/clients/ubumuntu.png",
      alt: "Kivu Noir",
    },
    {
      index: 1,
      image: "/images/clients/kivunoir.png",
      alt: "Kivu Noir",
    },
    {
      index: 4,
      image: "/images/clients/centurion.png",
      alt: "Kivu Noir",
    },
    {
      index: 3,
      image: "/images/clients/mukati-na-butta.png",
      alt: "Kivu Noir",
    },
    {
      index: 5,
      image: "/images/clients/rwanda_events.png",
      alt: "Kivu Noir",
    },
    {
      index: 6,
      image: "/images/clients/wimbish.png",
      alt: "Kivu Noir",
    },
    {
      index: 7,
      image: "/images/clients/house-of-tayo.png",
      alt: "Kivu Noir",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* <h2
          className={`text-3xl font-normal text-[#6D6E72] mb-1 ${roboto.className}`}
        >
          Trusted by many
        </h2> */}
        <h1
          className={`text-center whitespace-nowrap text-4xl font-bold text-[#6D6E72] sm:text-5xl md:text-6xl  ${roboto.className}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Trusted by many
        </h1>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto w-auto mt-10 flex flex-row items-center justify-center gap-x-2 gap-y-10  sm:gap-x-10 lg:mx-0 lg:max-w-none">
            {clients.slice(0, 4).map((client: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative w-auto`}
              >
                <Image
                  src={`${client.image}`}
                  alt={client.alt}
                  width={420}
                  height={420}
                  // layout="fill"
                  // objectFit="cover"
                  className="w-auto"
                />
              </motion.div>
            ))}
          </div>
          <div className="mx-auto w-auto mt-10 flex flex-row items-center justify-center gap-x-2 gap-y-10  sm:gap-x-10 lg:mx-0 lg:max-w-none">
            {clients.slice(4, 12).map((client: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative w-auto`}
              >
                <Image
                  src={`${client.image}`}
                  alt={client.alt}
                  width={420}
                  height={420}
                  // layout="fill"
                  // objectFit="cover"
                  className="w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedByMany;
