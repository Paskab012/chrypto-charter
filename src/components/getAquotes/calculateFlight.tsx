import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import QuoteLayout from "@/src/layout/quoteLayout";
import BookingForm from "@/src/components/getAquotes/flightBookingForm";

const CalculateFlight = () => {
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

  return (
    <QuoteLayout>
      <BookingForm />
    </QuoteLayout>
  );
};

export default CalculateFlight;
