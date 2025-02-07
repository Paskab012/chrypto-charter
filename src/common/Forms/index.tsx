import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { FiArrowRight } from "react-icons/fi";

function ErrorMessage({ message }: { message: string | any }) {
  return <span className='text-sm text-red-500 mt-1'>{message || ""}</span>;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const [charCount, setCharCount] = useState(0);

  const projectDetails = watch("projectDetails", "");

  useEffect(() => {
    setCharCount(projectDetails.length);
  }, [projectDetails]);

  const onSubmit = (data: any) => {
    toast.success("Your project has been submitted successfully!");
  };

  return (
    <>
      <Toaster richColors={true} />
      <div className='bg-white   p-8 max-w-2xl mx-auto'>
        <h2 className='text-2xl text-gray-600 font-bold mb-2'>
          We'd love to work
        </h2>
        <h2 className='text-2xl text-gray-600 font-bold mb-4'>
          about your projects
        </h2>
        <p className='text-gray-600 mb-6'>
          Write to us, we will get back to you as soon as possible
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='flex items-center gap-4 flex-col w-full md:flex-row'>
            <div className='w-full'>
              <input
                type='text'
                placeholder='Full names'
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name should be at least 3 characters long."
                  }
                })}
                className='w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {errors.fullName && (
                <ErrorMessage message={errors.fullName.message} />
              )}
            </div>

            <div className='w-full'>
              <input
                type='email'
                placeholder='Email'
                {...register("email", { required: "Email is required" })}
                className='w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
              />
              {errors.email && <ErrorMessage message={errors.email.message} />}
            </div>
          </div>

          <div>
            <input
              type='text'
              placeholder='Company (optional)'
              {...register("company")}
              className='w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>

          <div>
            <textarea
              placeholder='Project details'
              {...register("projectDetails", {
                required: "Project details are required",
                maxLength: {
                  value: 500,
                  message: "Project details should be less than 500 characters"
                }
              })}
              className='w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none'
            />
            <div className='text-right text-sm text-gray-500 mt-1'>
              {charCount}/500
            </div>
            {errors.projectDetails && (
              <ErrorMessage message={errors.projectDetails.message} />
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-[#615FEB] text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center'
          >
            Submit Your Project <FiArrowRight className='ml-2' />
          </button>
        </form>
      </div>
    </>
  );
}
