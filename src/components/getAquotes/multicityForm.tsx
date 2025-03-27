import React from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useForm, Controller } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import {
  BookingFormData,
  charterRateOptions,
  experienceOptions,
  facilitiesOptions,
  guestOptions,
  lengthOptions,
  regions,
  titleOptions,
  yachtTypeOptions,
  yearBuiltOptions
} from "@/src/constants/multicityform";

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;

const parseRange = (rangeStr: string): { min: string; max: string } => {
  if (rangeStr.startsWith("<")) {
    return { min: "0", max: rangeStr.replace("< ", "") };
  }

  if (rangeStr.endsWith("+")) {
    return { min: rangeStr.replace("+", ""), max: "1000" };
  }

  const parts = rangeStr.split("-");
  return {
    min: parts[0].trim(),
    max: parts[1].trim()
  };
};

const parseYearRange = (rangeStr: string): { min: string; max: string } => {
  if (rangeStr === "Before 2000") {
    return { min: "1900", max: "1999" };
  }

  if (rangeStr === "2021+") {
    return { min: "2021", max: new Date().getFullYear().toString() };
  }

  const parts = rangeStr.split("-");
  return { min: parts[0], max: parts[1] };
};

const MultiCityBookingInfo = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    defaultValues: {
      title: "",
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      message: "",
      filters: {
        guests: "",
        charterRate: "",
        yachtType: "",
        region: "",
        facilities: [],
        experience: [],
        length: { min: "", max: "" },
        yearBuilt: { min: "", max: "" }
      }
    }
  });

  const onSubmit = async (data: BookingFormData) => {
    const loadingToast = toast.loading("Sending booking request...");

    let lengthRange = { min: "", max: "" };
    if (control._formValues.filters.length) {
      lengthRange = parseRange(control._formValues.filters.length as string);
    }

    let yearRange = { min: "", max: "" };
    if (control._formValues.filters.yearBuilt) {
      yearRange = parseYearRange(
        control._formValues.filters.yearBuilt as string
      );
    }

    let facilitiesStr = "";
    if (data.filters.facilities) {
      facilitiesStr = Array.isArray(data.filters.facilities)
        ? data.filters.facilities.join(", ")
        : (data.filters.facilities as unknown as string);
    }

    let experienceStr = "";
    if (data.filters.experience) {
      experienceStr = Array.isArray(data.filters.experience)
        ? data.filters.experience.join(", ")
        : (data.filters.experience as unknown as string);
    }
    const templateData = {
      title: data.title,
      firstName: data.firstName,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      country: data.country,
      company: data.company || "Not specified",
      message: data.message,
      guests: data.filters.guests,
      charterRate: data.filters.charterRate,
      yachtType: data.filters.yachtType,
      region: data.filters.region,
      facilities: facilitiesStr,
      experience: experienceStr,
      lengthRange: `${lengthRange.min}m - ${lengthRange.max}m`,
      yearBuiltRange: `${yearRange.min} - ${yearRange.max}`,
      to_name: "Crypto Charter",
      reply_to: data.email
    };

    try {
      const result = await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        templateData,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Booking request sent successfully!", {
          id: loadingToast
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to send booking request. Please try again.", {
        id: loadingToast
      });
      console.error("Error sending email:", error);
    }
  };
  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8 text-gray-900'>
      <Toaster position='bottom-right' richColors />
      <div className='space-y-6'>
        <h2 className='text-2xl font-medium text-gray-900'>
          Yacht Booking information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Personal Information */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Title</label>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select title' />
                    </SelectTrigger>
                    <SelectContent>
                      {titleOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
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
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
              />
              {errors.surname && (
                <p className='text-red-500 text-xs'>{errors.surname.message}</p>
              )}
            </div>
          </div>

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
                placeholder='Email address'
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
              />
              {errors.email && (
                <p className='text-red-500 text-xs'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>Phone</label>
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
                placeholder='Phone number'
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
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
                className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
              />
              {errors.country && (
                <p className='text-red-500 text-xs'>{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>
              Company (Optional)
            </label>
            <input
              type='text'
              {...register("company")}
              placeholder='Company name'
              className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500'
            />
          </div>

          <h3 className='text-xl font-medium text-gray-900 pt-4'>
            Yacht Preferences
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Guests
              </label>
              <Controller
                name='filters.guests'
                control={control}
                rules={{ required: "Please select number of guests" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              {errors.filters?.guests && (
                <p className='text-red-500 text-xs'>
                  {errors.filters.guests.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Charter rate (weekly)
              </label>
              <Controller
                name='filters.charterRate'
                control={control}
                rules={{ required: "Please select charter rate" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              {errors.filters?.charterRate && (
                <p className='text-red-500 text-xs'>
                  {errors.filters.charterRate.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Yacht type
              </label>
              <Controller
                name='filters.yachtType'
                control={control}
                rules={{ required: "Please select yacht type" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              {errors.filters?.yachtType && (
                <p className='text-red-500 text-xs'>
                  {errors.filters.yachtType.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Region
              </label>
              <Controller
                name='filters.region'
                control={control}
                rules={{ required: "Please select region" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select region' />
                    </SelectTrigger>
                    <SelectContent className='max-h-[280px]'>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.filters?.region && (
                <p className='text-red-500 text-xs'>
                  {errors.filters.region.message}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Facilities
              </label>
              <Controller
                name='filters.facilities'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value as unknown as string}
                    onValueChange={field.onChange}
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
                )}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Experience
              </label>
              <Controller
                name='filters.experience'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value as unknown as string}
                    onValueChange={field.onChange}
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
                )}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Length (M)
              </label>
              <Controller
                name='filters.length'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value as unknown as string}
                    onValueChange={field.onChange}
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
                )}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-900'>
                Year built
              </label>
              <Controller
                name='filters.yearBuilt'
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value as unknown as string}
                    onValueChange={field.onChange}
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
                )}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-900'>Message</label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters"
                }
              })}
              placeholder='Please describe your charter requirements...'
              rows={6}
              className='w-full rounded-lg border border-gray-200 p-3 text-sm placeholder:text-gray-500 resize-none'
            />
            {errors.message && (
              <p className='text-red-500 text-xs'>{errors.message.message}</p>
            )}
          </div>

          <motion.button
            type='submit'
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 hover:opacity-90 transition-opacity duration-200 text-sm font-medium'
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default MultiCityBookingInfo;
