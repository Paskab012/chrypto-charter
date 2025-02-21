import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Clock } from "lucide-react";

const TimeSelect = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        slots.push(time);
      }
    }
    return slots;
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-700'>Time</label>
      <Controller
        name='time'
        control={control}
        rules={{ required: "Time is required" }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={`w-full rounded-lg bg-[#F6F6F6] ${
                errors.time ? "border-red-500" : "border-[#BFBFBF]"
              } p-3 text-sm`}
            >
              <div className='flex items-center gap-2'>
                <Clock className='h-4 w-4 text-gray-400' />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className='max-h-[300px]'>
              {generateTimeSlots().map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.time && (
        <span className='text-xs text-red-500'>
          {errors.time.message as string}
        </span>
      )}
    </div>
  );
};

export default TimeSelect;
