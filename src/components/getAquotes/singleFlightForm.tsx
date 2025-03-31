import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useCharter } from "@/src/context/charterContext";
import {
  handleFlightCalculation,
  useFlightCalculator
} from "@/src/hooks/useFlightCalculator";
import { toast } from "sonner";
import TimeSelect from "./timeSelect";
import AirportSearchInput from "./aiportSearchInput";
import { useEffect } from "react";

const SingleFlightForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    register,
    setValue
  } = useFormContext();

  const router = useRouter();
  const { flightType, setFlightCalculation } = useCharter();
  const { calculateFlight, isLoading, error } = useFlightCalculator();

  const formValues = watch();
  const isReturnFlight = flightType === "return";

  useEffect(() => {
    if (isReturnFlight) {
      register("return_date");
    }
  }, [register, isReturnFlight]);

  const isFormValid = isReturnFlight
    ? formValues.from &&
      formValues.to &&
      formValues.passengers &&
      formValues.date &&
      formValues.return_date
    : formValues.from &&
      formValues.to &&
      formValues.passengers &&
      formValues.date;

  const fromValue = formValues.from || "";
  const toValue = formValues.to || "";

  const extractAirportCode = (value: any) => {
    if (!value) return null;

    try {
      if (typeof value === "string") {
        if (value.startsWith("{") || value.startsWith("[")) {
          const parsed = JSON.parse(value);
          return parsed.airport_code || parsed.code || null;
        }
        return value;
      }

      if (typeof value === "object" && value !== null) {
        return value.airport_code || value.code || null;
      }

      return null;
    } catch (error) {
      return typeof value === "string" ? value : null;
    }
  };

  const fromAirportCode = extractAirportCode(fromValue);
  const toAirportCode = extractAirportCode(toValue);

  const fromLabel = isReturnFlight ? "To" : "From";
  const toLabel = isReturnFlight ? "From" : "To";

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
      <div className='md:col-span-4'>
        <AirportSearchInput
          name='from'
          label={fromLabel}
          placeholder='Type airport, city or country'
          icon='/charter/takeoff.svg'
          iconAlt='takeoff'
          preventDuplicateWith={{
            name: "to",
            getMessage: (airportName) =>
              `From and To airports cannot be the same (${airportName})`
          }}
          disabledAirportCode={toAirportCode}
        />
      </div>
      <div className='md:col-span-4'>
        <AirportSearchInput
          name='to'
          label={toLabel}
          placeholder='Type airport, city or country'
          icon='/charter/land.svg'
          iconAlt='landing'
          preventDuplicateWith={{
            name: "from",
            getMessage: (airportName) =>
              `From and To airports cannot be the same (${airportName})`
          }}
          disabledAirportCode={fromAirportCode}
        />
      </div>

      <div className='space-y-2 md:col-span-1'>
        <label className='text-sm font-medium text-gray-700'>Passengers</label>
        <Controller
          name='passengers'
          control={control}
          rules={{ required: "Number of passengers is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                className={`w-full rounded-lg bg-[#F6F6F6] ${
                  errors.passengers ? "border-red-500" : "border-[#BFBFBF]"
                } p-3 text-sm`}
              >
                <SelectValue placeholder='Select passengers' />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.passengers && (
          <span className='text-xs text-red-500'>
            {errors.passengers.message as string}
          </span>
        )}
      </div>

      {/* Determine column span based on flight type */}
      <div className={`space-y-2  md:col-span-${isReturnFlight ? "1" : "2"}`}>
        <label className='text-sm font-medium text-gray-700'>
          {isReturnFlight ? "Departure" : "Date"}
        </label>
        <Controller
          name='date'
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  className={`w-full flex items-center justify-between rounded-lg bg-[#F6F6F6] ${
                    errors.date ? "border-red-500" : "border-[#BFBFBF]"
                  } border p-3 text-sm`}
                >
                  {field.value ? format(field.value, "dd/MM/yy") : ""}
                  <CalendarIcon className='h-4 w-4 text-gray-400' />
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && (
          <span className='text-xs text-red-500'>
            {errors.date.message as string}
          </span>
        )}
      </div>

      {/* Show return date input only for return flights */}
      {isReturnFlight && (
        <div className='space-y-2 md:col-span-1 '>
          <label className='text-sm font-medium text-gray-700'>Return</label>
          <Controller
            name='return_date'
            control={control}
            rules={{
              required: isReturnFlight ? "Return date is required" : false
            }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type='button'
                    className={`w-full flex items-center justify-between rounded-lg bg-[#F6F6F6] ${
                      errors.return_date ? "border-red-500" : "border-[#BFBFBF]"
                    } border p-3 text-sm`}
                  >
                    {field.value ? format(field.value, "dd/MM/yy") : ""}
                    <CalendarIcon className='h-4 w-4 text-gray-400' />
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                    }}
                    disabled={(date: number) => {
                      const departureDate = formValues.date;
                      if (!departureDate) return false;
                      return date < departureDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.return_date && (
            <span className='text-xs text-red-500'>
              {errors.return_date.message as string}
            </span>
          )}
        </div>
      )}

      <div className='space-y-2 md:col-span-1'>
        <TimeSelect name='time' />
      </div>
    </div>
  );
};

export default SingleFlightForm;
