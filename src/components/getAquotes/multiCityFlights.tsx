import { Minus, Plus } from "lucide-react";
import { useCharter } from "@/src/context/charterContext";
import DynamicFlightForm from "./dynamicFlightForm";
import { useEffect } from "react";

interface FlightForm {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
  time: any;
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

const MultiCityFlights = () => {
  const { flightForms, setFlightForms } = useCharter();

  useEffect(() => {
    const savedForms = localStorage.getItem("multiCityFlightData");
    if (savedForms) {
      try {
        const parsedForms = JSON.parse(savedForms);
        if (Array.isArray(parsedForms) && parsedForms.length > 0) {
          const formsWithDates = parsedForms.map((form) => ({
            ...form,
            date: form.date ? new Date(form.date) : undefined
          }));
          setFlightForms(formsWithDates);
        }
      } catch (error) {
        console.error("Error parsing saved flight forms:", error);
      }
    }
  }, [setFlightForms]);

  const addFlightForm = () => {
    if (flightForms.length < 5) {
      const lastForm = flightForms[flightForms.length - 1];

      const newForm = {
        id: String(flightForms.length + 1),
        from: lastForm.to || "",
        to: "",
        passengers: lastForm.passengers || "2",
        date: undefined,
        time: undefined,
        fromAirport: lastForm.toAirport
      };

      const updatedForms: any = [...flightForms, newForm];
      setFlightForms(updatedForms);

      saveFormsToLocalStorage(updatedForms);
    }
  };

  const updateFlightForm = (
    id: string,
    field: keyof FlightForm,
    value: any,
    airportData?: any
  ) => {
    const updatedForms: any = flightForms.map((form) => {
      if (form.id === id) {
        if (field === "from" && airportData) {
          return {
            ...form,
            from: airportData.airport_code || value,
            fromAirport: {
              code: airportData.airport_code,
              name: airportData.name,
              location: airportData.location
            }
          };
        }
        if (field === "to" && airportData) {
          return {
            ...form,
            to: airportData.airport_code || value,
            toAirport: {
              code: airportData.airport_code,
              name: airportData.name,
              location: airportData.location
            }
          };
        }

        return { ...form, [field]: value };
      }
      return form;
    });

    setFlightForms(updatedForms);
    saveFormsToLocalStorage(updatedForms);
  };

  const saveFormsToLocalStorage = (forms: FlightForm[]) => {
    try {
      const formsForStorage = forms.map((form) => ({
        ...form,
        date: form.date ? form.date.toISOString() : undefined
      }));

      localStorage.setItem(
        "multiCityFlightData",
        JSON.stringify(formsForStorage)
      );
    } catch (error) {
      console.error("Error saving flight forms to localStorage:", error);
    }
  };

  const areFormsValid = flightForms.every(
    (form) =>
      form &&
      form.from &&
      form.to &&
      form.date instanceof Date &&
      form.passengers
  );

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
        <div className='flex items-center gap-4'>
          <button
            type='button'
            onClick={addFlightForm}
            className='flex items-center gap-2 text-[#6366F1] hover:text-[#4F46E5] transition-colors text-sm font-medium mt-4'
          >
            <Plus className='w-4 h-4' />
            Add another flight
          </button>
          <button
            type='button'
            onClick={addFlightForm}
            className='flex items-center gap-1 text-[#d54545] hover:text-[#6f2525] transition-colors text-sm font-medium mt-4'
          >
            <Minus className='w-4 h-4' />
            Clear data
          </button>
        </div>
      )}

      <input
        type='hidden'
        name='multiCityFormsValid'
        value={areFormsValid.toString()}
      />
    </>
  );
};

export default MultiCityFlights;
