import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { IoAirplaneSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_FLIGHT_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;

interface BookingFormData {
  title: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  message: string;
}

interface AirportInfo {
  code: string;
  name: string;
  location: string | null;
  time?: string;
}

interface MultiCityFlightData {
  date: string;
  from: string;
  fromAirport: AirportInfo;
  toAirport: AirportInfo;
  passengers: string;
}

const MultiCityBookingInfosForm = () => {
  const router = useRouter();
  const titleOptions = ["Mr", "Mrs", "Ms", "Dr", "Prof"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<BookingFormData>({
    defaultValues: {
      title: "",
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      message: ""
    }
  });

  const [flightRoutes, setFlightRoutes] = useState<
    {
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
    }[]
  >([]);

  const getMultiCityFlightData = (): MultiCityFlightData[] | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem("multiCityFlightData");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error retrieving multicity flight data:", error);
      return null;
    }
  };

  const getFlightCalculation = (): any | null => {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem("flightCalculation");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error retrieving flight calculation:", error);
      return null;
    }
  };

  useEffect(() => {
    try {
      const savedBookingData = localStorage.getItem("bookingContactInfo");
      if (savedBookingData) {
        const parsedData = JSON.parse(savedBookingData);
        Object.keys(parsedData).forEach((key) => {
          setValue(key as keyof BookingFormData, parsedData[key]);
        });
      }
    } catch (error) {
      console.error("Error loading saved booking data:", error);
    }
  }, [setValue]);

  useEffect(() => {
    const storedData = getMultiCityFlightData();
    const calculationData = getFlightCalculation();

    if (!storedData || storedData.length === 0) {
      console.error("No flight data found in local storage");
      return;
    }

    // Map through stored data to create routes
    const routes = storedData.map((flightData, index, array) => {
      const flightDate = flightData.date
        ? new Date(flightData.date)
        : new Date();
      const nextFlightDate =
        index < array.length - 1
          ? new Date(array[index + 1].date)
          : new Date(flightDate.getTime() + 9 * 60 * 60 * 1000);

      return {
        from: {
          airport: flightData.fromAirport.name || "Unknown Airport",
          code: `${flightData.fromAirport.code || "???"} (${
            flightData.fromAirport.location
          })`,
          departure: `${format(flightDate, "dd MMM, HH:mm")} LT`,
          utc: `${format(flightDate, "HH:mm")} UTC`
        },
        to: {
          airport: flightData.toAirport.name || "Unknown Airport",
          code: `${flightData.toAirport.code || "???"} (${
            flightData.toAirport.location
          })`,
          arrival: `${format(nextFlightDate, "dd MMM, HH:mm")} LT`,
          utc: `${format(nextFlightDate, "HH:mm")} UTC`
        }
      };
    });

    setFlightRoutes(routes);
  }, []);

  const onSubmit = async (data: BookingFormData) => {
    localStorage.setItem("bookingContactInfo", JSON.stringify(data));
    const loadingToast = toast.loading("Submitting your booking...");

    try {
      const flightData = getMultiCityFlightData();
      const calculationData = getFlightCalculation();

      if (!flightData || flightData.length === 0) {
        throw new Error("No flight data available");
      }

      // Prepare email data with multiple routes
      const routesEmail = flightData.map((route, index) => ({
        [`fromAirport_${index + 1}`]: route.fromAirport.name,
        [`fromCode_${
          index + 1
        }`]: `${route.fromAirport.code} (${route.fromAirport.location})`,
        [`toAirport_${index + 1}`]: route.toAirport.name,
        [`toCode_${
          index + 1
        }`]: `${route.toAirport.code} (${route.toAirport.location})`,
        [`departureTime_${index + 1}`]: format(
          new Date(route.date),
          "dd MMM, HH:mm LT"
        )
      }));

      // Merge routes info into a single object
      const routesEmailData = routesEmail.reduce(
        (acc, route) => ({ ...acc, ...route }),
        {}
      );

      const emailData = {
        ...data,
        title: data.title,
        company: data.company || "Not specified",
        message: data.message || "No message provided",

        passengers: flightData[0].passengers || "Not specified",
        totalRoutes: flightData.length,

        ...routesEmailData,

        to_name: "Flight Booking Team",
        reply_to: data.email
      };

      const result = await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        emailData,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Booking request submitted successfully!", {
          id: loadingToast,
          duration: 4000
        });
      }
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.", {
        id: loadingToast,
        duration: 4000
      });
      console.error("Error sending email:", error);
    }
  };

  const handleChangeFlightInfo = () => {
    router.push("/");
  };

  console.log("routes routes=======:>> ", flightRoutes);

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8 text-gray-900'>
      <Toaster position='bottom-right' richColors />

      <div className='space-y-6'>
        <h2 className='text-2xl font-medium text-gray-900'>
          Multicity Booking informations
        </h2>
        {flightRoutes.map((route, index) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-3 lg:gap-24 gap-8 items-center'
          >
            <div className='bg-white rounded-lg p-4 border border-[#BFBFBF]'>
              <div className='space-y-1 pb-2'>
                <p className='text-sm text-gray-500'>Airport</p>
                <p className='font-medium'>{route.from.airport}</p>
                <p className='lg:text-xl font-bold'>{route.from.code}</p>
              </div>
            </div>

            <div className=''>
              <IoAirplaneSharp className='w-full h-6 text-[#b5b5b5]' />
            </div>

            <div className='bg-white rounded-lg p-4 border border-[#BFBFBF]'>
              <div className='space-y-1 pb-2'>
                <p className='text-sm text-gray-500'>Airport</p>
                <p className='font-medium'>{route.to.airport}</p>
                <p className='lg:text-xl font-bold'>{route.to.code}</p>
              </div>
            </div>
          </div>
        ))}

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

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Personal Information */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Title</label>
              <select
                {...register("title", { required: "Title is required" })}
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm'
              >
                <option value=''>Select title</option>
                {titleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.title && (
                <p className='text-red-500 text-xs'>{errors.title.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                First Name
              </label>
              <input
                type='text'
                {...register("firstName", {
                  required: "First name is required"
                })}
                placeholder='First name'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
              {errors.firstName && (
                <p className='text-red-500 text-xs'>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Surname
              </label>
              <input
                type='text'
                {...register("surname", {
                  required: "Surname is required"
                })}
                placeholder='Surname'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
              {errors.surname && (
                <p className='text-red-500 text-xs'>{errors.surname.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Email</label>
              <input
                type='email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder='Type email...'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
              {errors.email && (
                <p className='text-red-500 text-xs'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Tel</label>
              <input
                type='tel'
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value:
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: "Invalid phone number"
                  }
                })}
                placeholder='Type your phone number...'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
              {errors.phone && (
                <p className='text-red-500 text-xs'>{errors.phone.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Country
              </label>
              <input
                type='text'
                {...register("country", { required: "Country is required" })}
                placeholder='Country'
                className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
              />
              {errors.country && (
                <p className='text-red-500 text-xs'>{errors.country.message}</p>
              )}
            </div>
          </div>

          {/* Optional fields */}
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>
              Company (Optional)
            </label>
            <input
              type='text'
              {...register("company")}
              placeholder='Company name'
              className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>Message</label>
            <textarea
              {...register("message")}
              placeholder='Message'
              rows={4}
              className='w-full rounded-lg bg-[#F6F6F6] border border-[#BFBFBF] p-3 text-sm placeholder:text-gray-700'
            />
          </div>

          <motion.button
            type='submit'
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className='px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default MultiCityBookingInfosForm;
