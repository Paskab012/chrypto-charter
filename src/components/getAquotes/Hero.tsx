import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import QuoteLayout from "@/src/layout/quoteLayout";
import FlightForm from "./flightForm";

const GetAQuote = () => {
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
    <QuoteLayout>
      <FlightForm />
    </QuoteLayout>
  );
};

export default GetAQuote;
