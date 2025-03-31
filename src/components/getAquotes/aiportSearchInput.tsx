import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { Loader } from "lucide-react"; // Import the Loader icon for the spinner
import {
  searchAirportsCompatible,
  findAirportByCodeCompatible,
  Airport
} from "@/src/data/aiports";

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
  optional = false,
  preventDuplicateWith,
  disabledAirportCode
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<AirportValue | null>(
    null
  );

  const {
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors
  } = useFormContext();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownContentRef = useRef<HTMLDivElement>(null);

  const focusSearchInput = useCallback(() => {
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, []);

  const getDropdownHeight = useCallback(() => {
    if (typeof window !== "undefined") {
      const screenHeight = window.innerHeight;
      const isMobile = screenHeight < 768;

      if (searchResults.length === 0) {
        return isMobile ? 120 : 150;
      }

      const idealHeight = Math.min(
        Math.max(searchResults.length * 48, 150),
        isMobile ? 300 : 400
      );

      return idealHeight;
    }
    return 200;
  }, [searchResults.length]);

  useEffect(() => {
    if (isOpen) {
      focusSearchInput();
    }
  }, [isOpen, focusSearchInput]);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    searchTimeout.current = setTimeout(() => {
      try {
        const results = searchAirportsCompatible(searchQuery);
        setSearchResults(results.slice(0, 50));
      } catch (error) {
        console.error("Error searching airports:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    if (initialAirport?.code && externalOnChange && !hasInitialized.current) {
      hasInitialized.current = true;

      const airportObj: AirportValue = {
        id: initialAirport.code,
        name: initialAirport.name,
        airport_code: initialAirport.code,
        location: initialAirport.location
      };

      setSelectedAirport(airportObj);

      setTimeout(() => {
        externalOnChange(airportObj, airportObj);
      }, 0);
    }
  }, [initialAirport, externalOnChange]);

  const formatSelectedValue = (value: any): string => {
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
        const matchingAirport = findAirportByCodeCompatible(value);
        if (matchingAirport) {
          return `${matchingAirport.airport_name} (${
            matchingAirport.iata_code || ""
          })`;
        }
        return value;
      }
      return String(value);
    } catch (error) {
      console.error("Error formatting airport value:", error);
      return String(value);
    }
  };

  const extractAirportCode = (value: any): string | null => {
    if (!value) return null;

    try {
      if (typeof value === "string") {
        if (value.startsWith("{")) {
          const parsed = JSON.parse(value);
          return parsed.id || parsed.code || parsed.airport_code || null;
        }
        return value;
      }

      if (typeof value === "object" && value !== null) {
        return value.id || value.code || value.airport_code || null;
      }

      return null;
    } catch (error) {
      console.error("Error extracting airport code:", error);
      return null;
    }
  };

  const validateAirportUniqueness = (selected: any): boolean => {
    if (!preventDuplicateWith) return true;

    const otherInputName = preventDuplicateWith.name;
    const otherValue = getValues(otherInputName);

    const selectedAirportCode = extractAirportCode(selected);
    const otherAirportCode = extractAirportCode(otherValue);

    if (
      selectedAirportCode &&
      otherAirportCode &&
      selectedAirportCode === otherAirportCode
    ) {
      const errorMessage = preventDuplicateWith.getMessage
        ? preventDuplicateWith.getMessage(
            typeof selected === "object"
              ? selected.name || selected.airport_name || ""
              : String(selected)
          )
        : `Cannot select the same airport twice`;

      setError(name, {
        type: "manual",
        message: errorMessage
      });
      return false;
    }

    clearErrors(name);
    return true;
  };

  const getCurrentValue = (fieldValue: any): AirportValue | null => {
    const currentValue =
      externalValue !== undefined ? externalValue : fieldValue;

    if (!currentValue) return null;

    let parsedValue: AirportValue = currentValue;

    if (typeof currentValue === "string") {
      if (currentValue.startsWith("{") || currentValue.startsWith("[")) {
        try {
          parsedValue = JSON.parse(currentValue);
        } catch (e) {
          parsedValue = { code: currentValue };
        }
      } else {
        const airport = findAirportByCodeCompatible(currentValue);
        if (airport) {
          parsedValue = {
            id: airport.id,
            name: airport.airport_name,
            airport_code: airport.iata_code,
            location: airport.country_name
          };
        } else {
          parsedValue = { code: currentValue };
        }
      }
    }

    return parsedValue;
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    searchInputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Enter" && searchResults.length > 0) {
      const firstAirport = searchResults[0];
      if (firstAirport) {
        const airportValue = {
          id: firstAirport.id.toString(),
          name: firstAirport.airport_name,
          airport_code: firstAirport.iata_code,
          location: firstAirport.country_name
        };

        if (validateAirportUniqueness(airportValue)) {
          setSelectedAirport(airportValue);

          if (externalOnChange) {
            externalOnChange(airportValue, airportValue);
          } else {
            // field.onChange(airportValue);
          }

          setIsOpen(false);
        }
      }
    }
  };

  const dropdownHeight = getDropdownHeight();

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
            const currentValue = getCurrentValue(field.value);
            let selectValue = "";

            if (currentValue) {
              if (typeof currentValue === "string") {
                selectValue = currentValue;
              } else {
                const formattedObj: AirportValue = {
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
                    setSelectedAirport(null);
                    clearErrors(name);
                    return;
                  }

                  try {
                    const selected = JSON.parse(value);

                    if (!validateAirportUniqueness(selected)) {
                      return;
                    }

                    setSelectedAirport(selected);

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
                onOpenChange={(open) => {
                  setIsOpen(open);
                  if (open) {
                    setSearchQuery("");
                    setTimeout(focusSearchInput, 50);
                  }
                }}
                disabled={disabled}
              >
                <SelectTrigger
                  className={cn(
                    "w-full rounded-lg bg-[#F6F6F6] border",
                    errors[name] ? "border-red-500" : "border-[#BFBFBF]",
                    "p-3 pl-3 text-sm h-auto min-h-[44px]",
                    disabled ? "opacity-70 cursor-not-allowed" : "",
                    "transition-all duration-200 focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 focus:border-transparent"
                  )}
                >
                  <div className='relative flex items-center w-full md:pl-8 pl-6'>
                    <Image
                      width={20}
                      height={20}
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
                  <SelectContent
                    ref={dropdownContentRef}
                    className='p-0 overflow-hidden'
                    align='start'
                    style={{ maxHeight: `${dropdownHeight}px` }}
                  >
                    <div className='sticky top-0 z-10 p-2 bg-white border-b shadow-sm'>
                      <div
                        className='relative flex items-center w-full'
                        onClick={handleSearchClick}
                      >
                        <input
                          ref={searchInputRef}
                          type='text'
                          placeholder='Search airports (min 2 characters)...'
                          className='w-full p-2 pl-8 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                          value={searchQuery}
                          onChange={handleInputChange}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleKeyDown}
                        />
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='absolute left-2 h-4 w-4 text-gray-500'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                          />
                        </svg>
                      </div>
                    </div>

                    <ScrollArea
                      className={`p-2`}
                      style={{ height: `${dropdownHeight - 60}px` }}
                    >
                      {isLoading ? (
                        <div className='flex items-center justify-center h-24'>
                          <Loader className='w-6 h-6 text-purple-600 animate-spin' />
                        </div>
                      ) : searchQuery.length < 2 ? (
                        <div className='flex flex-col items-center justify-center p-6 text-center space-y-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-10 w-10 text-gray-300'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                            />
                          </svg>
                          {/* <p className='text-sm text-gray-500'>
                            Type at least 2 characters to search for airports
                          </p> */}
                        </div>
                      ) : searchResults.length === 0 ? (
                        <div className='flex flex-col items-center justify-center p-6 text-center space-y-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-10 w-10 text-gray-300'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={1.5}
                              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <p className='text-sm text-gray-500'>
                            No airports found matching "{searchQuery}"
                          </p>
                        </div>
                      ) : (
                        <div className='space-y-1'>
                          {searchResults.map((airport) => {
                            const isDisabled = !!(
                              disabledAirportCode &&
                              ((airport.iata_code &&
                                airport.iata_code === disabledAirportCode) ||
                                airport.id.toString() === disabledAirportCode)
                            );

                            return (
                              <SelectItem
                                key={airport.id.toString()}
                                value={JSON.stringify({
                                  id: airport.id.toString(),
                                  name: airport.airport_name,
                                  airport_code: airport.iata_code || "",
                                  location: airport.country_name || ""
                                })}
                                className={cn(
                                  "cursor-pointer rounded-md px-2 py-2 my-1 hover:bg-gray-50 transition-colors",
                                  isDisabled && "opacity-50 pointer-events-none"
                                )}
                                disabled={isDisabled}
                              >
                                <div className='flex flex-col w-full'>
                                  <div className='flex items-center gap-1'>
                                    <span className='font-medium'>
                                      {airport?.airport_name || ""}
                                    </span>
                                    <span className='text-xs font-bold text-purple-600 ml-1'>
                                      ({airport?.iata_code || ""})
                                    </span>
                                  </div>
                                  <div className='text-xs text-gray-500 mt-0.5'>
                                    {airport?.city_iata_code || ""}{" "}
                                    {airport?.country_name || ""}
                                  </div>
                                  {isDisabled && (
                                    <span className='text-xs text-red-500 mt-1'>
                                      (already selected)
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>
                  </SelectContent>
                )}
              </Select>
            );
          }}
        />
        {errors[name] && (
          <span className='text-xs text-red-500 mt-1 block'>
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default AirportSearchInput;
