import { useCharter } from "@/src/context/charterContext";

type FlightType = "one-way" | "return" | "multi-city";

interface FlightTypeOption {
  value: FlightType;
  label: string;
}

const FlightTypeSelector = () => {
  const { flightType, setFlightType } = useCharter();

  const flightOptions: FlightTypeOption[] = [
    {
      value: "one-way",
      label: "One way"
    },
    {
      value: "return",
      label: "Return"
    },
    {
      value: "multi-city",
      label: "Multi-city"
    }
  ];

  const handleFlightTypeChange = (value: FlightType) => {
    setFlightType(value);
  };

  return (
    <div className='flex items-center gap-6 mb-6'>
      {flightOptions.map(({ value, label }) => (
        <label
          key={value}
          className='relative flex items-center gap-2 cursor-pointer'
        >
          <input
            type='radio'
            name='flight-type'
            value={value}
            checked={flightType === value}
            onChange={(e) =>
              handleFlightTypeChange(e.target.value as FlightType)
            }
            className='sr-only'
          />
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              flightType === value ? "border-[#6366F1]" : "border-gray-300"
            }`}
          >
            {flightType === value && (
              <div className='w-3 h-3 rounded-full bg-[#6366F1]' />
            )}
          </div>
          <span
            className={`text-sm ${
              flightType === value ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FlightTypeSelector;
