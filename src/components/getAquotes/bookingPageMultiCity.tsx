import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import QuoteLayout from "@/src/layout/quoteLayout";
import BookingForm from "@/src/components/getAquotes/flightBookingForm";
import FlightBookingInfo from "./flightBookingInfo";
import MultiCityBookingInfosForm from "./multiCityBookingInfos";

const MultiCityBookingPageScreen = () => {
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
      <MultiCityBookingInfosForm />
    </QuoteLayout>
  );
};

export default MultiCityBookingPageScreen;
