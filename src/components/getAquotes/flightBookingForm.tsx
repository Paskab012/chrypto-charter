import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { useCharter } from "@/src/context/charterContext";
import {
  useFlightCalculator,
  handleFlightCalculation
} from "@/src/hooks/useFlightCalculator";
import SingleFlightForm from "./singleFlightForm";
import MultiCityFlights from "./multiCityFlights";
import FlightTypeSelector from "./flightSelector";

interface Airport {
  airport_code: string;
  id: string;
  location: string | null;
  name: string;
}

interface FormInputs {
  from: Airport;
  to: Airport;
  passengers: string;
  date: Date | undefined;
}

interface FlightCalculatorPayload {
  departure_airport: string;
  arrival_airport: string;
  aircraft: string;
  pax: number;
  airway_time: boolean;
}

const BookingForm = () => {
  const router = useRouter();
  const { flightType, flightForms, setFlightForms } = useCharter();
  const { calculateFlight, isLoading } = useFlightCalculator();

  const methods = useForm<FormInputs>({
    defaultValues: {
      from: undefined,
      to: undefined,
      passengers: "2",
      date: undefined
    },
    mode: "onChange"
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch
  } = methods;

  const formValues = watch();

  useEffect(() => {
    if (flightType === "multi-city") {
      // Initialize with a single flight form if none exists
      if (flightForms.length === 0) {
        setFlightForms([
          {
            id: "1",
            from: "",
            to: "",
            passengers: "2",
            date: undefined,
            fromAirport: undefined,
            toAirport: undefined
          }
        ]);
      }
    } else {
      // Reset flight forms when switching away from multi-city
      setFlightForms([]);
    }
  }, [flightType, setFlightForms, flightForms.length]);

  const validateFormData = (
    data: FormInputs
  ): FlightCalculatorPayload | null => {
    if (!data.from?.airport_code || !data.to?.airport_code) {
      toast.error("Please select valid airports");
      return null;
    }

    if (!data.passengers || isNaN(Number(data.passengers))) {
      toast.error("Please enter a valid number of passengers");
      return null;
    }

    return {
      departure_airport: data.from.airport_code,
      arrival_airport: data.to.airport_code,
      aircraft: "Embraer Legacy 650",
      pax: Number(data.passengers),
      airway_time: true
    };
  };

  const storeFlightData = (data: any) => {
    try {
      const formattedData = {
        ...data,
        date: data.date ? data.date.toISOString() : undefined,
        fromAirport: {
          code: data.from.airport_code,
          name: data.from.name,
          location: data.from.location
        },
        toAirport: {
          code: data.to.airport_code,
          name: data.to.name,
          location: data.to.location
        }
      };

      localStorage.setItem("flightFormData", JSON.stringify(formattedData));
    } catch (error) {
      console.error("Error storing data in localStorage:", error);
      toast.error("Failed to save your booking information");
    }
  };

  const storeMultiCityData = (forms: FlightForm[]) => {
    try {
      const formsForStorage = forms.map((form) => ({
        ...form,
        date: form.date instanceof Date ? form.date.toISOString() : form.date
      }));

      localStorage.setItem(
        "multiCityFlightData",
        JSON.stringify(formsForStorage)
      );
    } catch (error) {
      console.error("Error storing multi-city data:", error);
      toast.error("Failed to save your multi-city booking information");
    }
  };

  const onSubmit = async (data: FormInputs) => {
    if (flightType === "multi-city") {
      const isValid = flightForms.every(
        (form) =>
          form &&
          form.fromAirport?.code &&
          form.toAirport?.code &&
          form.date instanceof Date &&
          form.passengers
      );

      if (isValid) {
        storeMultiCityData(flightForms);
        router.push("/multicity-booking-infos");
        return;
      } else {
        toast.error("Please complete all required flight information");
        return;
      }
    }

    const calculatorPayload = validateFormData(data);
    if (!calculatorPayload) return;

    try {
      const result = await handleFlightCalculation(
        calculatorPayload,
        calculateFlight
      );
      storeFlightData(data);
      if (result && result.data) {
        localStorage.setItem("flightCalculation", JSON.stringify(result.data));
      }

      router.push("/flight-booking-info");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while calculating the flight"
      );
    }
  };

  const isMultiCityValid = flightForms.every(
    (form) =>
      form &&
      form.date instanceof Date &&
      form.passengers &&
      form.fromAirport?.code &&
      form.toAirport?.code
  );

  const isSingleFlightValid =
    isValid &&
    formValues.from?.airport_code &&
    formValues.to?.airport_code &&
    formValues.date instanceof Date;

  const isFormValid =
    flightType === "multi-city" ? isMultiCityValid : isSingleFlightValid;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 text-gray-900'
      >
        <h2 className='text-xl font-semibold mb-6'>Flight information</h2>

        <FlightTypeSelector />

        {flightType !== "multi-city" ? (
          <SingleFlightForm />
        ) : (
          <MultiCityFlights />
        )}

        <motion.button
          type='submit'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isFormValid || isLoading}
          className={`w-auto px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 transition-all duration-200 text-sm font-medium
            ${
              !isFormValid || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
        >
          {isLoading
            ? "Getting infos..."
            : flightType === "multi-city"
            ? "Get Booking Info"
            : "Get Infos"}
        </motion.button>
      </form>
    </FormProvider>
  );
};

export default BookingForm;
