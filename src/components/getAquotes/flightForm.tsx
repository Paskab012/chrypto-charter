import { CHARTER_TITLES, useCharter } from "@/src/context/charterContext";
import { motion } from "framer-motion";
import { Plane, Ship, Check } from "lucide-react";
import Link from "next/link";
import ServiceButton from "./serviceButtons";
import { useRouter } from "next/navigation";

const FlightForm = () => {
  const { selectedService, setSelectedService } = useCharter();

  const router = useRouter();

  const handleContinue = () => {
    if (selectedService === "yacht") {
      router.push("/yacht-booking-infos");
    } else {
      router.push("/calculate-flight");
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-900'>
          {CHARTER_TITLES[selectedService]}
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-1 text-black'>
          <ServiceButton
            type='jet'
            isSelected={selectedService === "jet"}
            onClick={() => setSelectedService("jet")}
            icon={<Plane className='h-5 w-5 text-gray-700' />}
            label='Private Jet Charter'
          />
          <ServiceButton
            type='yacht'
            isSelected={selectedService === "yacht"}
            onClick={() => setSelectedService("yacht")}
            icon={<Ship className='h-5 w-5 text-gray-700' />}
            label='Yacht Charter'
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        className='inline-block  px-6 bg-gradient-to-r cursor-pointer from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium text-center'
      >
        Continue
      </motion.div>
    </div>
  );
};

export default FlightForm;
