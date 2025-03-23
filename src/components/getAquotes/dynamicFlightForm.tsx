import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import TimeSelect from "./timeSelect";
import AirportSearchInput from "./aiportSearchInput";
import { useEffect, useRef } from "react";

interface FlightForm {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
  time?: string;
  fromAirport?: {
    code: string;
    name: string;
    location: string | null;
  };
  toAirport?: {
    code: string;
    name: string;
    location: string | null;
  };
}

interface DynamicFlightFormProps {
  form: FlightForm;
  index: number;
  updateFlightForm: (
    id: string,
    field: keyof FlightForm,
    value: any,
    airportData?: any
  ) => void;
}

const DynamicFlightForm = ({
  form,
  index,
  updateFlightForm
}: DynamicFlightFormProps) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const key = `flight-${form.id}`;
    localStorage.setItem(key, JSON.stringify(form));
  }, [form]);

  const handleFromAirportChange = (value: any, airportData?: any) => {
    if (value === null) {
      updateFlightForm(form.id, "from", "");
      updateFlightForm(form.id, "fromAirport", undefined);
      return;
    }

    // Ensure we have airport code data
    const airportCode =
      airportData?.airport_code ||
      (typeof value === "object" ? value.airport_code : value);

    // Update the form with the airport code
    updateFlightForm(form.id, "from", airportCode || value);

    // If we have complete airport data, update the fromAirport object
    if (airportData) {
      const airportInfo = {
        code: airportData.airport_code,
        name: airportData.name,
        location: airportData.location
      };

      updateFlightForm(form.id, "fromAirport", airportInfo);
    }
  };

  const handleToAirportChange = (value: any, airportData?: any) => {
    if (value === null) {
      updateFlightForm(form.id, "to", "");
      updateFlightForm(form.id, "toAirport", undefined);
      return;
    }

    // Ensure we have airport code data
    const airportCode =
      airportData?.airport_code ||
      (typeof value === "object" ? value.airport_code : value);

    // Update the form with the airport code
    updateFlightForm(form.id, "to", airportCode || value);

    // If we have complete airport data, update the toAirport object
    if (airportData) {
      const airportInfo = {
        code: airportData.airport_code,
        name: airportData.name,
        location: airportData.location
      };

      updateFlightForm(form.id, "toAirport", airportInfo);
    }
  };

  const isFirstFlight = index === 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 mt-4'>
      <div className='md:col-span-4'>
        <AirportSearchInput
          name={`flight-${form.id}-from`}
          label='From'
          placeholder='Type airport, city or country'
          icon='/charter/takeoff.svg'
          iconAlt='takeoff'
          value={form.from || (form.fromAirport ? form.fromAirport.code : "")}
          initialAirport={form.fromAirport}
          onChange={handleFromAirportChange}
          disabled={!isFirstFlight}
        />
      </div>

      <div className='md:col-span-4'>
        <AirportSearchInput
          name={`flight-${form.id}-to`}
          label='To'
          placeholder='Type airport, city or country'
          icon='/charter/land.svg'
          iconAlt='landing'
          value={form.to || (form.toAirport ? form.toAirport.code : "")}
          initialAirport={form.toAirport}
          onChange={handleToAirportChange}
        />
      </div>

      <div className='space-y-2 md:col-span-1'>
        <label className='text-sm font-medium text-gray-700'>Passengers</label>
        <Select
          value={form.passengers}
          onValueChange={(value) =>
            updateFlightForm(form.id, "passengers", value)
          }
        >
          <SelectTrigger className='w-full rounded-lg bg-[#F6F6F6] border-[#BFBFBF] p-3 text-sm'>
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
      </div>

      <div className='space-y-2 md:col-span-2'>
        <label className='text-sm font-medium text-gray-700'>Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type='button'
              className='w-full flex items-center justify-between rounded-lg bg-[#F6F6F6] border-[#BFBFBF] border p-3 text-sm'
            >
              {form.date ? format(form.date, "dd/MM/yyyy") : "Select date"}
              <CalendarIcon className='h-4 w-4 text-gray-400' />
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={form.date instanceof Date ? form.date : undefined}
              onSelect={(date) => updateFlightForm(form.id, "date", date)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className='space-y-2 md:col-span-1'>
        <TimeSelect
          name={`flight-${form.id}-time`}
          value={form.time}
          onChange={(value) => updateFlightForm(form.id, "time", value)}
        />
      </div>
    </div>
  );
};

export default DynamicFlightForm;
