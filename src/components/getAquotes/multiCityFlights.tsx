import { Plus } from "lucide-react";
import { useCharter } from "@/src/context/charterContext";
import DynamicFlightForm from "./dynamicFlightForm";

interface FlightForm {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
  time: any;
}

const MultiCityFlights = () => {
  const { flightForms, setFlightForms } = useCharter();

  const addFlightForm = () => {
    if (flightForms.length < 5) {
      setFlightForms([
        ...flightForms,
        {
          id: String(flightForms.length + 1),
          from: "",
          to: "",
          passengers: "2",
          date: undefined
          // time: undefined
        }
      ]);
    }
  };

  const updateFlightForm = (
    id: string,
    field: keyof FlightForm,
    value: any
  ) => {
    const updatedForms = flightForms.map((form) =>
      form.id === id ? { ...form, [field]: value } : form
    );
    setFlightForms(updatedForms);
  };

  return (
    <>
      <div className='space-y-4'>
        {flightForms.map((form, index) => (
          <DynamicFlightForm
            key={form.id}
            form={form}
            index={index}
            updateFlightForm={updateFlightForm}
          />
        ))}
      </div>

      {flightForms.length < 5 && (
        <button
          type='button'
          onClick={addFlightForm}
          className='flex items-center gap-2 text-[#6366F1] hover:text-[#4F46E5] transition-colors text-sm font-medium mt-4'
        >
          <Plus className='w-4 h-4' />
          Add another flight
        </button>
      )}
    </>
  );
};

export default MultiCityFlights;
