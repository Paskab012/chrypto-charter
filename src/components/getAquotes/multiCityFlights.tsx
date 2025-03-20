import { Plus } from "lucide-react";
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

  // Load saved flight forms from localStorage on component mount
  useEffect(() => {
    const savedForms = localStorage.getItem("multiCityFlightData");
    if (savedForms) {
      try {
        const parsedForms = JSON.parse(savedForms);
        if (Array.isArray(parsedForms) && parsedForms.length > 0) {
          // Convert date strings back to Date objects if they exist
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
      // Get the destination from the last flight form
      const lastForm = flightForms[flightForms.length - 1];

      // Create new flight form
      const newForm = {
        id: String(flightForms.length + 1),
        from: lastForm.to || "", // Use the "to" value from last form
        to: "",
        toAirport: "",
        passengers: lastForm.passengers || "2", // Keep same passenger count
        date: undefined,
        time: undefined,
        fromAirport: lastForm.toAirport // Use toAirport object from last form
      };

      const updatedForms = [...flightForms, newForm];
      setFlightForms(updatedForms);

      // Save to localStorage
      saveFormsToLocalStorage(updatedForms as any);
    }
  };

  const updateFlightForm = (
    id: string,
    field: keyof FlightForm,
    value: any,
    airportData?: any
  ) => {
    const updatedForms = flightForms.map((form) => {
      if (form.id === id) {
        // If updating an airport field, also save the airport object
        if (field === "from" && airportData) {
          return {
            ...form,
            [field]: value,
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
            [field]: value,
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

    // Save to localStorage after each update
    saveFormsToLocalStorage(updatedForms as any);
  };

  const saveFormsToLocalStorage = (forms: FlightForm[]) => {
    try {
      // Format dates for storage
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

  // Check if all required fields are filled for validating the form
  const areFormsValid = flightForms.every(
    (form) => form.from && form.to && form.date
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
        <button
          type='button'
          onClick={addFlightForm}
          className='flex items-center gap-2 text-[#6366F1] hover:text-[#4F46E5] transition-colors text-sm font-medium mt-4'
        >
          <Plus className='w-4 h-4' />
          Add another flight
        </button>
      )}

      {/* You might want to pass the validation status to the parent component */}
      <input
        type='hidden'
        name='multiCityFormsValid'
        value={areFormsValid.toString()}
      />
    </>
  );
};

export default MultiCityFlights;
