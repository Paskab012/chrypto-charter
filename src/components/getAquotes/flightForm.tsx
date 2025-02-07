import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Ship, Check } from "lucide-react";
import Link from "next/link";

const FlightForm = () => {
  const [selectedService, setSelectedService] = useState<"jet" | "yacht">(
    "jet"
  );

  const formTitles = {
    jet: "Private Jet information",
    yacht: "Yacht information"
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='mb-4 text-xl font-semibold text-gray-900'>
          {formTitles[selectedService]}
        </h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 text-black'>
          <button
            onClick={() => setSelectedService("jet")}
            className={`flex items-center justify-between rounded-lg border bg-[#F6F6F6] p-4 transition-all duration-200 ${
              selectedService === "jet"
                ? "border-[#BFBFBF] shadow-sm"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className='flex items-center gap-3'>
              <Plane className='h-5 w-5 text-gray-700' />
              <span className='text-sm font-normal'>Private Jet Charter</span>
            </div>
            {selectedService === "jet" ? (
              <span className='rounded-full border p-1 border-[#2db343]'>
                <Check className='h-3 w-3 text-[#2db343]' />
              </span>
            ) : (
              <span className='rounded-full border p-2 border-[#bbbbbb]'></span>
            )}
          </button>
          <button
            onClick={() => setSelectedService("yacht")}
            className={`flex items-center justify-between rounded-lg bg-[#F6F6F6] border p-4 transition-all duration-200 ${
              selectedService === "yacht"
                ? "border-[#BFBFBF] shadow-sm"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className='flex items-center gap-3'>
              <Ship className='h-5 w-5 text-gray-700' />
              <span className='text-sm font-normal'>Yacht Charter</span>
            </div>
            {selectedService === "yacht" ? (
              <span className='rounded-full border p-1 border-[#2db343]'>
                <Check className='h-3 w-3 text-[#2db343]' />
              </span>
            ) : (
              <span className='rounded-full border p-2 border-[#bbbbbb]'></span>
            )}
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium'
      >
        <Link href='/calculate-flight'>Continue</Link>
      </motion.button>
    </div>
  );
};

export default FlightForm;
