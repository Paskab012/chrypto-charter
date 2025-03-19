import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FaPlane } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";

interface BookingFormData {
  email: string;
  phone: string;
  message: string;
}

interface FlightDetails {
  from: {
    airport: string;
    code: string;
    departure: string;
    utc: string;
  };
  to: {
    airport: string;
    code: string;
    arrival: string;
    utc: string;
  };
  flightTime: {
    hours: number;
    distance: string;
  };
}

interface StoredFlightData {
  from: string;
  to: string;
  passengers: string;
  date: string;
  fromAirport: {
    code: string;
    name: string;
    location: string | null;
  };
  toAirport: {
    code: string;
    name: string;
    location: string | null;
  };
}

const FlightBookingInfo = () => {
  const router = useRouter();
  const [formData, setFormData] = React.useState<BookingFormData>({
    email: "",
    phone: "",
    message: ""
  });

  const [flightInfo, setFlightInfo] = React.useState<FlightDetails>({
    from: {
      airport: "Loading...",
      code: "...",
      departure: "Loading...",
      utc: "..."
    },
    to: {
      airport: "Loading...",
      code: "...",
      arrival: "Loading...",
      utc: "..."
    },
    flightTime: {
      hours: 0,
      distance: "..."
    }
  });

  const getFlightData = (): StoredFlightData | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem("flightFormData");
      if (!data) return null;

      return JSON.parse(data) as StoredFlightData;
    } catch (error) {
      console.error("Error retrieving flight data:", error);
      return null;
    }
  };

  const getFlightCalculation = (): any | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem("flightCalculation");
      if (!data) return null;

      return JSON.parse(data);
    } catch (error) {
      console.error("Error retrieving flight calculation:", error);
      return null;
    }
  };

  useEffect(() => {
    const storedData = getFlightData();
    const calculationData = getFlightCalculation();

    if (!storedData) {
      console.error("No flight data found in local storage");
      return;
    }

    const flightDate = storedData.date ? new Date(storedData.date) : new Date();
    const arrivalDate = new Date(flightDate.getTime() + 9 * 60 * 60 * 1000);
    const distance = calculationData?.distance || "11 064 km";

    setFlightInfo({
      from: {
        airport: storedData.fromAirport.name || "Unknown Airport",
        code: `${storedData.fromAirport.code || "???"} (${
          storedData.fromAirport.location
        })`,
        departure: `${format(flightDate, "dd MMM, HH:mm")} LT`,
        utc: `${format(flightDate, "HH:mm")} UTC`
      },
      to: {
        airport: storedData.toAirport.name || "Unknown Airport",
        code: `${storedData.toAirport.code || "???"} (${
          storedData.toAirport.location
        })`,
        arrival: `${format(arrivalDate, "dd MMM, HH:mm")} LT`,
        utc: `${format(arrivalDate, "HH:mm")} UTC`
      },
      flightTime: {
        hours: calculationData?.flightTime?.hours || 9,
        distance: distance
      }
    });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    localStorage.setItem("bookingContactInfo", JSON.stringify(formData));
  };

  const handleChangeFlightInfo = () => {
    router.push("/");
  };

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8 text-gray-900'>
      <div className='space-y-6'>
        <h2 className='text-2xl font-medium text-gray-900'>
          Flight information
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:gap-24  gap-8 items-center'>
          <div className='bg-white rounded-lg p-4 border border-[#BFBFBF]'>
            <div className='space-y-1 pb-2'>
              <p className='text-sm text-gray-500'>Airport</p>
              <p className='font-medium'>{flightInfo.from.airport}</p>
              <p className='lg:text-xl font-bold'>{flightInfo.from.code}</p>
            </div>
          </div>

          <div className=''>
            <IoAirplaneSharp className='w-full h-6 text-[#b5b5b5]' />
          </div>

          <div className='bg-white rounded-lg p-4 border border-[#BFBFBF]'>
            <div className='space-y-1 pb-2'>
              <p className='text-sm text-gray-500'>Airport</p>
              <p className='font-medium'>{flightInfo.to.airport}</p>
              <p className='lg:text-xl font-bold'>{flightInfo.to.code}</p>
            </div>
          </div>
        </div>

        <div className='text-sm'>
          Do you want to change flight information?{" "}
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handleChangeFlightInfo();
            }}
            className='text-[#0074E4] hover:text-[#0074E4]/70 underline'
          >
            Click here
          </a>
        </div>
      </div>

      <div className='space-y-6'>
        <h2 className='text-2xl font-medium text-gray-900'>
          Booking information
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Type email...'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Tel(optional)
              </label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Type your phone number...'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Message'
              rows={4}
              className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
            />
          </div>

          <motion.button
            type='submit'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium'
          >
            Submit
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default FlightBookingInfo;
