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

interface FlightForm {
  id: string;
  from: string;
  to: string;
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
      setFlightForms([
        {
          id: "1",
          from: "",
          to: "",
          passengers: "2",
          date: undefined
        }
      ]);
    } else {
      setFlightForms([]);
    }
  }, [flightType, setFlightForms]);

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

  const createFlightForm = (data: FormInputs): FlightForm => {
    return {
      id: "1",
      from: data.from.airport_code,
      to: data.to.airport_code,
      passengers: data.passengers,
      date: data.date
    };
  };

  const onSubmit = async (data: FormInputs) => {
    if (flightType === "multi-city") {
      if (flightForms.every((form) => form.from && form.to && form.date)) {
        setFlightForms(flightForms);
        router.push("/multicity-booking");
      }
      return;
    }

    const calculatorPayload = validateFormData(data);
    if (!calculatorPayload) return;

    try {
      console.log("calculatorPayload ============:>> ", calculatorPayload);
      const result = await handleFlightCalculation(
        calculatorPayload,
        calculateFlight
      );

      router.push("/flight-booking-info");

      // if (result.success && result.data) {
      //   const singleFlightForm = createFlightForm(data);
      //   setFlightForms([singleFlightForm]);
      //   router.push("/flight-booking-info");
      // } else {
      //   throw new Error(result.error || "Failed to calculate flight");
      // }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while calculating the flight"
      );
    }
  };

  const isFormValid =
    isValid && formValues.from?.airport_code && formValues.to?.airport_code;

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
            ? "Gettin infos..."
            : flightType === "multi-city"
            ? "Get Booking Info"
            : "Get Infos"}
        </motion.button>
      </form>
    </FormProvider>
  );
};

export default BookingForm;
