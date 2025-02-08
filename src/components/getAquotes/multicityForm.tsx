import React from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

interface BookingFormData {
  email: string;
  phone?: string;
  region: string;
  message: string;
}

const regions = [
  "Australasia",
  "South Pacific",
  "South America",
  "Central America",
  "Northern Europe",
  "Middle East",
  "Antarctica",
  "Worldwide",
  "Mediterranean",
  "Caribbean",
  "North America",
  "Indian Ocean",
  "South East Asia"
];

const MultiCityBookingInfo = () => {
  const [formData, setFormData] = React.useState<BookingFormData>({
    email: "",
    phone: "",
    region: "",
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
    console.log(formData);
  };

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8 text-gray-900'>
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
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Tel</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Type your phone number...'
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>Region</label>
            <Select
              value={formData.region}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, region: value }))
              }
            >
              <SelectTrigger className='w-full rounded-lg border border-gray-200 p-3 text-sm bg-white'>
                <SelectValue placeholder='Select your region' />
              </SelectTrigger>
              <SelectContent className='max-h-[280px]'>
                {regions.map((region) => (
                  <SelectItem
                    key={region}
                    value={region.toLowerCase()}
                    className='text-base font-normal'
                  >
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>Message</label>
            <textarea
              name='message'
              value={formData.message}
              onChange={handleInputChange}
              placeholder='Message'
              rows={6}
              className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500 resize-none'
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

export default MultiCityBookingInfo;
