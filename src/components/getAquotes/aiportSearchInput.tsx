import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { cn } from "@/src/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useAirportSearch } from "@/src/hooks/useAiportSearch";

interface AirportSearchInputProps {
  name: string;
  label: string;
  placeholder: string;
  icon: string;
  iconAlt: string;
}

const AirportSearchInput: React.FC<AirportSearchInputProps> = ({
  name,
  label,
  placeholder,
  icon,
  iconAlt
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { airports, fetchAllAirports, filterAirports } = useAirportSearch();
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const filteredAirports = filterAirports(searchQuery);

  useEffect(() => {
    fetchAllAirports();
  }, [fetchAllAirports]);

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-900'>{label}</label>
      <div className='relative'>
        <Controller
          name={name}
          control={control}
          rules={{ required: `${label} is required` }}
          render={({ field }) => (
            <Select
              value={field.value ? JSON.stringify(field.value) : ""}
              onValueChange={(value) => {
                const selected = JSON.parse(value);
                field.onChange(selected);
              }}
            >
              <SelectTrigger
                className={cn(
                  "w-full rounded-lg bg-[#F6F6F6] border",
                  errors[name] ? "border-red-500" : "border-[#BFBFBF]",
                  "p-3 pl-3 text-sm h-auto min-h-[44px]"
                )}
              >
                <div className='relative flex items-center w-full  md:pl-8 pl-6'>
                  <Image
                    width={4}
                    height={4}
                    alt={iconAlt}
                    src={icon}
                    className='absolute left-0 h-5 w-5 text-gray-900'
                  />
                  <SelectValue placeholder={placeholder} className='pl-2 ' />
                </div>
              </SelectTrigger>
              <SelectContent className='max-h-[300px] p-0' align='start'>
                <div className='sticky top-0 p-2 bg-white border-b'>
                  <input
                    type='text'
                    placeholder='Search airports...'
                    className='w-full p-2 text-sm bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <ScrollArea className='h-[200px] p-2'>
                  {airports.length === 0 ? (
                    <div className='p-2 text-sm text-center text-gray-500'>
                      Loading airports...
                    </div>
                  ) : filteredAirports.length === 0 ? (
                    <div className='p-2 text-sm text-center text-gray-500'>
                      No airport found matching "{searchQuery}"
                    </div>
                  ) : (
                    filteredAirports.map((airport) => (
                      <SelectItem
                        key={airport.id}
                        value={JSON.stringify({
                          id: airport.id,
                          name: airport.airport_name,
                          airport_code: airport.icao_code,
                          location: airport.country_name
                        })}
                        className='cursor-pointer'
                      >
                        <div className='flex items-center gap-1'>
                          <span className='font-medium'>
                            {airport?.airport_name}
                          </span>
                          <span className='text-xs text-gray-600'>
                            {airport?.country_name},
                          </span>
                          <span className='text-xs text-gray-500'>
                            ({airport?.icao_code})
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
        />
        {errors[name] && (
          <span className='text-xs text-red-500'>
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default AirportSearchInput;
