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
  guests: string;
  charterRate: string;
  yachtType: string;
  facilities: string;
  experience: string;
  length: string;
  yearBuilt: string;
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

const guestOptions = ["1-4", "5-8", "9-12", "13-20", "21+"];
const charterRateOptions = [
  "$10,000-$25,000",
  "$25,001-$50,000",
  "$50,001-$100,000",
  "$100,001+"
];
const yachtTypeOptions = [
  "Motor Yacht",
  "Sailing Yacht",
  "Catamaran",
  "Explorer",
  "Classic"
];
const facilitiesOptions = [
  "Jacuzzi",
  "Gym",
  "Cinema",
  "Helipad",
  "Swimming Pool",
  "Water Toys"
];
const experienceOptions = [
  "Luxury",
  "Adventure",
  "Cultural",
  "Family",
  "Romantic"
];
const lengthOptions = ["< 30m", "30-40m", "40-50m", "50-60m", "60m+"];
const yearBuiltOptions = [
  "Before 2000",
  "2000-2010",
  "2011-2015",
  "2016-2020",
  "2021+"
];

const MultiCityBookingInfo = () => {
  const [formData, setFormData] = React.useState<BookingFormData>({
    email: "",
    phone: "",
    region: "",
    message: "",
    guests: "",
    charterRate: "",
    yachtType: "",
    facilities: "",
    experience: "",
    length: "",
    yearBuilt: ""
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
          {/* First row of selects */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Guests
              </label>
              <Select
                value={formData.guests}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, guests: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select guests' />
                </SelectTrigger>
                <SelectContent>
                  {guestOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Charter rate (weekly)
              </label>
              <Select
                value={formData.charterRate}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, charterRate: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select rate' />
                </SelectTrigger>
                <SelectContent>
                  {charterRateOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Yacht type
              </label>
              <Select
                value={formData.yachtType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, yachtType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  {yachtTypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Region
              </label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, region: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select region' />
                </SelectTrigger>
                <SelectContent className='max-h-[280px]'>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region.toLowerCase()}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Second row of selects */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Facilities
              </label>
              <Select
                value={formData.facilities}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, facilities: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select facilities' />
                </SelectTrigger>
                <SelectContent>
                  {facilitiesOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Experience
              </label>
              <Select
                value={formData.experience}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, experience: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select experience' />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Length (M)
              </label>
              <Select
                value={formData.length}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, length: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select length' />
                </SelectTrigger>
                <SelectContent>
                  {lengthOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Year built
              </label>
              <Select
                value={formData.yearBuilt}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, yearBuilt: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  {yearBuiltOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
