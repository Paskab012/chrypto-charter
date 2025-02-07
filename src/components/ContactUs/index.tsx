import React from "react";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <div className='h-[400px] bg-black/60 animate-pulse' />
});

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"]
});

interface ContactFormData {
  fullNames: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ContactInfo {
  title: string;
  content: string;
}

const contactInfo: Record<string, ContactInfo> = {
  call: {
    title: "Call us",
    content: "+250 736 642 138"
  },
  email: {
    title: "Email us",
    content: "info@bisfay.com"
  },
  visit: {
    title: "Visit us",
    content: "KN 3 Rd, Kigali, Rwanda"
  }
};

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const loadingToast = toast.loading("Sending message...");

    try {
      const result = await emailjs.send(
        SERVICE_ID as string,
        TEMPLATE_ID as string,
        {
          fullNames: data.fullNames,
          email: data.email,
          phoneNumber: data.phoneNumber,
          message: data.message,
          to_name: "BISFAY Studio",
          reply_to: data.email
        },
        PUBLIC_KEY
      );

      if (result.status === 200) {
        toast.success("Message sent successfully!", {
          id: loadingToast
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        id: loadingToast
      });
      console.error("Error sending email:", error);
    }
  };

  return (
    <section id='contact' className='relative w-full py-16 bg-white'>
      <Toaster position='top-center' richColors />
      <div className=''>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='py-6 mb-6 flex items-center justify-center space-x-8 w-full'
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className='w-full h-[2px] bg-gray-300'
          />
          <h1
            className={`text-center whitespace-nowrap text-4xl font-bold text-[#6D6E72] sm:text-5xl md:text-6xl ${roboto.className}`}
          >
            Contact us
          </h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className='w-full h-[2px] bg-gray-300'
          />
        </motion.div>
        <div className='max-w-5xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-12'>
            {Object.entries(contactInfo).map(([key, { title, content }]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='bg-[#F2F1EF] p-4'
              >
                <h3
                  className={`text-lg font-normal text-[#6D6E72] mb-1 ${roboto.className}`}
                >
                  {title}
                </h3>
                <p className='text-[#6D6E72] text-sm'>{content}</p>
              </motion.div>
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                  <input
                    type='text'
                    placeholder='Full names'
                    className={`w-full p-3 text-[#6D6E72] bg-[#F5F5F5] border ${
                      errors.fullNames
                        ? "border-red-500"
                        : "border-[#A6A7AB80]/50"
                    } focus:outline-none focus:border-gray-400`}
                    {...register("fullNames", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.fullNames && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.fullNames.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    className={`w-full p-3 text-[#6D6E72] bg-[#F5F5F5] border ${
                      errors.email ? "border-red-500" : "border-[#A6A7AB80]/50"
                    } focus:outline-none focus:border-gray-400`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type='tel'
                    placeholder='Phone number'
                    className={`w-full p-3 text-[#6D6E72] bg-[#F5F5F5] border ${
                      errors.phoneNumber
                        ? "border-red-500"
                        : "border-[#A6A7AB80]/50"
                    } focus:outline-none focus:border-gray-400`}
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Invalid phone number"
                      }
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    placeholder='Message'
                    rows={6}
                    className={`w-full p-3 text-[#6D6E72] bg-[#F5F5F5] border ${
                      errors.message
                        ? "border-red-500"
                        : "border-[#A6A7AB80]/50"
                    } focus:outline-none focus:border-gray-400`}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                      }
                    })}
                  />
                  {errors.message && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-[#383836] text-white px-8 py-3 hover:bg-[#383836]/80 transition-colors disabled:bg-gray-500'
                >
                  {isSubmitting ? "Sending..." : "SUBMIT"}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='h-[400px] z-10'
            >
              <Map />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
