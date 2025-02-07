import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FlightBookingInfo = () => {
  const [formData, setFormData] = React.useState<BookingFormData>({
    email: "",
    phone: "",
    message: ""
  });

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
    // Handle form submission
    console.log(formData);
  };

  const flightInfo: FlightDetails = {
    from: {
      airport: "Dubai Intl",
      code: "OMDB (DXB)",
      departure: "07 Feb, 09:00 LT",
      utc: "05:00 UTC(+4)"
    },
    to: {
      airport: "New York Stewart Intl",
      code: "OMDB (DXB)",
      arrival: "07 Feb, 16:08 LT",
      utc: "21:08 UTC(-5)"
    },
    flightTime: {
      hours: 9,
      distance: "11 064 km"
    }
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
            <div className='space-y-1 border-t border-t-gray-300 pt-2'>
              <p className='text-sm text-gray-500'>Departure</p>
              <p className='font-medium'>{flightInfo.from.departure}</p>
              <p className='text-xs text-gray-500'>{flightInfo.from.utc}</p>
            </div>
          </div>

          <div className='relative'>
            <div className='bg-[#F6F6F6] rounded-lg p-4 border border-[#BFBFBF] '>
              <div className='space-y-1 text-center pb-2'>
                <p className='text-sm text-gray-500'>Time</p>
                <p className='font-medium'>
                  {flightInfo.flightTime.hours}hours
                </p>
              </div>
              <div className='space-y-1 text-center border-t border-t-gray-300 pt-2'>
                <p className='text-sm text-gray-500'>Departure</p>
                <p className='font-medium'>{flightInfo.flightTime.distance}</p>
              </div>
            </div>
            <div className='absolute -left-12 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:block'>
              <Image
                src='/charter/plane-line.svg'
                alt='Plane'
                width={16}
                height={16}
                className='w-full h-auto object-cover object-center'
              />
            </div>
            <div className='absolute -right-12 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:block'>
              <Image
                src='/charter/plane-line.svg'
                alt='Plane'
                width={16}
                height={16}
                className='w-full h-auto object-cover object-center'
              />
            </div>
          </div>

          <div className='bg-white rounded-lg p-4 border border-[#BFBFBF]'>
            <div className='space-y-1 pb-2'>
              <p className='text-sm text-gray-500'>Airport</p>
              <p className='font-medium'>{flightInfo.to.airport}</p>
              <p className='lg:text-xl font-bold'>{flightInfo.to.code}</p>
            </div>
            <div className='space-y-1 border-t border-t-gray-300 pt-2'>
              <p className='text-sm text-gray-500'>Arrival</p>
              <p className='font-medium'>{flightInfo.to.arrival}</p>
              <p className='text-xs text-gray-500'>{flightInfo.to.utc}</p>
            </div>
          </div>
        </div>

        <div className='text-sm'>
          Do you want to change flight information?{" "}
          <a
            href='#'
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
