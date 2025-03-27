import React, { useState, useEffect, useRef } from "react";
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
  value?: any;
  initialAirport?: {
    code: string;
    name: string;
    location: string | null;
  };
  onChange?: (value: any, airportData?: any) => void;
  disabled?: boolean;
  optional?: boolean; // New optional prop
}

const AirportSearchInput: React.FC<AirportSearchInputProps> = ({
  name,
  label,
  placeholder,
  icon,
  iconAlt,
  value: externalValue,
  initialAirport,
  onChange: externalOnChange,
  disabled = false,
  optional = false // Default to false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { airports, fetchAllAirports, filterAirports } = useAirportSearch();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const hasInitialized = useRef(false);

  const filteredAirports = filterAirports(searchQuery);

  useEffect(() => {
    fetchAllAirports();
  }, [fetchAllAirports]);

  useEffect(() => {
    if (initialAirport?.code && externalOnChange && !hasInitialized.current) {
      hasInitialized.current = true;

      const airportObj = {
        id: initialAirport.code,
        name: initialAirport.name,
        airport_code: initialAirport.code,
        location: initialAirport.location
      };

      setTimeout(() => {
        externalOnChange(airportObj, airportObj);
      }, 0);
    }
  }, [initialAirport, externalOnChange, externalValue]);

  const formatSelectedValue = (value: any) => {
    if (!value) return "";

    try {
      if (
        typeof value === "string" &&
        (value.startsWith("{") || value.startsWith("["))
      ) {
        const parsed = JSON.parse(value);
        return `${parsed.name || parsed.airport_name || ""} (${
          parsed.airport_code || parsed.code || ""
        })`;
      } else if (typeof value === "object" && value !== null) {
        return `${value.name || value.airport_name || ""} (${
          value.airport_code || value.code || ""
        })`;
      } else if (typeof value === "string") {
        const matchingAirport = airports.find(
          (a) => a.icao_code === value || a.id === value
        );
        if (matchingAirport) {
          return `${matchingAirport.airport_name} (${matchingAirport.icao_code})`;
        }
        return value;
      }
      return String(value);
    } catch (error) {
      console.error("Error formatting airport value:", error);
      return String(value);
    }
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium text-gray-900'>{label}</label>
      <div className='relative'>
        <Controller
          name={name}
          control={control}
          rules={{
            required: false
          }}
          render={({ field }) => {
            const currentValue =
              externalValue !== undefined ? externalValue : field.value;

            let selectValue = "";

            if (currentValue) {
              if (typeof currentValue === "string") {
                if (
                  currentValue.startsWith("{") ||
                  currentValue.startsWith("[")
                ) {
                  selectValue = currentValue;
                } else {
                  const matchingAirport = airports.find(
                    (a) => a.icao_code === currentValue || a.id === currentValue
                  );

                  if (matchingAirport) {
                    selectValue = JSON.stringify({
                      id: matchingAirport.id,
                      name: matchingAirport.airport_name,
                      airport_code: matchingAirport.icao_code,
                      location: matchingAirport.country_name
                    });
                  } else {
                    if (
                      initialAirport &&
                      initialAirport.code === currentValue
                    ) {
                      selectValue = JSON.stringify({
                        id: initialAirport.code,
                        name: initialAirport.name,
                        airport_code: initialAirport.code,
                        location: initialAirport.location
                      });
                    } else {
                      selectValue = currentValue;
                    }
                  }
                }
              } else if (
                typeof currentValue === "object" &&
                currentValue !== null
              ) {
                const formattedObj = {
                  id: currentValue.id || currentValue.code || "",
                  name: currentValue.name || currentValue.airport_name || "",
                  airport_code:
                    currentValue.airport_code || currentValue.code || "",
                  location:
                    currentValue.location || currentValue.country_name || ""
                };
                selectValue = JSON.stringify(formattedObj);
              }
            }

            return (
              <Select
                value={selectValue}
                onValueChange={(value) => {
                  if (disabled) return;

                  if (!value) {
                    if (externalOnChange) {
                      externalOnChange(null);
                    } else {
                      field.onChange(null);
                    }
                    return;
                  }

                  try {
                    const selected = JSON.parse(value);
                    if (externalOnChange) {
                      externalOnChange(selected, selected);
                    } else {
                      field.onChange(selected);
                    }
                  } catch (error) {
                    console.error("Error parsing JSON:", value, error);
                    if (externalOnChange) {
                      externalOnChange(value);
                    } else {
                      field.onChange(value);
                    }
                  }
                }}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    "w-full rounded-lg bg-[#F6F6F6] border",
                    errors[name] ? "border-red-500" : "border-[#BFBFBF]",
                    "p-3 pl-3 text-sm h-auto min-h-[44px]",
                    disabled ? "opacity-70 cursor-not-allowed" : ""
                  )}
                >
                  <div className='relative flex items-center w-full md:pl-8 pl-6'>
                    <Image
                      width={4}
                      height={4}
                      alt={iconAlt}
                      src={icon}
                      className='absolute left-0 h-5 w-5 text-gray-900'
                    />
                    <SelectValue placeholder={placeholder}>
                      {currentValue ? formatSelectedValue(currentValue) : ""}
                    </SelectValue>
                  </div>
                </SelectTrigger>
                {!disabled && (
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
                )}
              </Select>
            );
          }}
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
