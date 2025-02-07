import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plane } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import Image from "next/image";
import Link from "next/link";

const BookingForm = () => {
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState("2");

  return (
    <div className='space-y-6 text-gray-900'>
      <h2 className='text-xl font-semibold  mb-6'>Flight information</h2>

      <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
        <div className='space-y-2 md:col-span-3'>
          <label className='text-sm font-medium text-gray-900'>From</label>
          <div className='relative'>
            <input
              type='text'
              placeholder='Type airport, city or country'
              className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 pl-10 text-sm placeholder:text-gray-700'
            />
            <Image
              width={4}
              height={4}
              alt='takeoff'
              src='/charter/takeoff.svg'
              className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900'
            />{" "}
          </div>
        </div>

        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-gray-900'>To</label>
          <div className='relative'>
            <input
              type='text'
              placeholder='Type airport, city or country'
              className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 pl-10 text-sm placeholder:text-gray-700'
            />
            <Image
              width={4}
              height={4}
              alt='landing'
              src='/charter/land.svg'
              className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900'
            />
          </div>
        </div>

        <div className='space-y-2 md:col-span-1'>
          <label className='text-sm font-medium text-gray-700'>
            Passengers
          </label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className='w-full rounded-lg bg-[#F6F6F6] border-[#BFBFBF] p-3 text-sm'>
              <SelectValue placeholder='Select passengers' />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2 md:col-span-2'>
          <label className='text-sm font-medium text-gray-700'>Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className='w-full flex items-center justify-between rounded-lg bg-[#F6F6F6] border-[#BFBFBF] border p-3 text-sm'>
                {date ? format(date, "PPP") : "Select date"}
                <CalendarIcon className='h-4 w-4 text-gray-400' />
              </button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium'
      >
        <Link href='/flight-booking-info'>Calculate</Link>
      </motion.button>
    </div>
  );
};

export default BookingForm;
