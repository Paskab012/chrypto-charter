import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useCharter } from "@/src/context/charterContext";
import SingleFlightForm from "./singleFlightForm";
import MultiCityFlights from "./multiCityFlights";
import FlightTypeSelector from "./flightSelector";
interface FormInputs {
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
}

const BookingForm = () => {
  const router = useRouter();
  const { flightType, flightForms, setFlightForms } = useCharter();

  const methods = useForm<FormInputs>({
    defaultValues: {
      from: "",
      to: "",
      passengers: "2",
      date: undefined
    },
    mode: "onChange"
  });

  const {
    handleSubmit,
    formState: { isValid }
  } = methods;

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

  const onSubmit = (data: FormInputs) => {
    if (flightType === "multi-city") {
      if (flightForms.every((form) => form.from && form.to && form.date)) {
        setFlightForms(flightForms);
        router.push("/multicity-booking");
      }
    } else {
      const singleFlightForm = {
        id: "1",
        ...data
      };
      setFlightForms([singleFlightForm]);
      router.push("/flight-booking-info");
    }
  };

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
          disabled={!isValid}
          className={` px-6 bg-gradient-to-r from-[#933FFE] via-[#4A5AF1] to-[#0074E4] text-white py-3 transition-all duration-200 text-sm font-medium
            ${!isValid ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
        >
          {flightType === "multi-city" ? "Get Booking Info" : "Calculate"}
        </motion.button>
      </form>
    </FormProvider>
  );
};

export default BookingForm;
