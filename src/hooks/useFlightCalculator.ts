import { useState } from "react";

interface FlightCalculatorInput {
  departure_airport: string;
  arrival_airport: string;
  aircraft: string;
  pax: number;
  airway_time: boolean;
}

interface FlightTime {
  airway: number;
}

interface FlightAirport {
  arrival_airport: string;
  departure_airport: string;
}

interface FlightCalculatorResponse {
  time: FlightTime;
  airport: FlightAirport;
  aircraft: string;
}

interface CalculationResult {
  success: boolean;
  data?: FlightCalculatorResponse;
  error?: string;
}

export const useFlightCalculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateFlight = async (
    data: FlightCalculatorInput
  ): Promise<CalculationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_FLIGHT_CALCULATOR_API;
      const authToken = process.env.NEXT_PUBLIC_FLIGHT_CALCULATOR_TOKEN;

      if (!apiUrl || !authToken) {
        throw new Error("Missing API configuration");
      }

      const response = await fetch(`${apiUrl}/flight_calculator/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to calculate flight");
      }

      const result: FlightCalculatorResponse = await response.json();
      return { success: true, data: result };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    calculateFlight,
    isLoading,
    error
  };
};

export const handleFlightCalculation = async (
  formData: any,
  calculateFlight: any
) => {
  const calculatorInput: FlightCalculatorInput = {
    departure_airport: formData.from,
    arrival_airport: formData.to,
    aircraft: "Embraer Legacy 650",
    pax: parseInt(formData.passengers),
    airway_time: true
  };

  return await calculateFlight(calculatorInput);
};
