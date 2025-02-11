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

const SingleFlightForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useFormContext();

  const router = useRouter();
  const { setFlightCalculation } = useCharter();
  const { calculateFlight, isLoading, error } = useFlightCalculator();

  // Watch all fields to enable/disable the submit button
  const formValues = watch();
  const isFormValid =
    formValues.from &&
    formValues.to &&
    formValues.passengers &&
    formValues.date;

  const onSubmit = async (data: any) => {
    try {
      const result = await handleFlightCalculation(data, calculateFlight);

      if (result.success && result.data) {
        setFlightCalculation(result.data);
        router.push("/flight-booking-info");
      } else {
        toast.error(result.error || "Failed to calculate flight details");
      }
    } catch (err) {
      toast.error("An error occurred while calculating flight details");
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-8 gap-4'>
      <div className='space-y-2 md:col-span-3'>
        <label className='text-sm font-medium text-gray-900'>From</label>
        <div className='relative'>
          <Controller
            name='from'
            control={control}
            rules={{ required: "Origin is required" }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder='Type airport, city or country'
                className={`w-full rounded-lg bg-[#F6F6F6] border ${
                  errors.from ? "border-red-500" : "border-[#BFBFBF]"
                } p-3 pl-10 text-sm placeholder:text-gray-700`}
              />
            )}
          />
          <Image
            width={4}
            height={4}
            alt='takeoff'
            src='/charter/takeoff.svg'
            className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900'
          />
        </div>
        {errors.from && (
          <span className='text-xs text-red-500'>
            {errors.from.message as string}
          </span>
        )}
      </div>

      <div className='space-y-2 md:col-span-2'>
        <label className='text-sm font-medium text-gray-900'>To</label>
        <div className='relative'>
          <Controller
            name='to'
            control={control}
            rules={{ required: "Destination is required" }}
            render={({ field }) => (
              <input
                {...field}
                type='text'
                placeholder='Type airport, city or country'
                className={`w-full rounded-lg bg-[#F6F6F6] border ${
                  errors.to ? "border-red-500" : "border-[#BFBFBF]"
                } p-3 pl-10 text-sm placeholder:text-gray-700`}
              />
            )}
          />
          <Image
            width={4}
            height={4}
            alt='landing'
            src='/charter/land.svg'
            className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900'
          />
        </div>
        {errors.to && (
          <span className='text-xs text-red-500'>
            {errors.to.message as string}
          </span>
        )}
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

      <div className='space-y-2 md:col-span-2'>
        <label className='text-sm font-medium text-gray-700'>Date</label>
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
                  {field.value ? format(field.value, "PPP") : "Select date"}
                  <CalendarIcon className='h-4 w-4 text-gray-400' />
                </button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  //   initialFocus
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
    </div>
  );
};

export default SingleFlightForm;
