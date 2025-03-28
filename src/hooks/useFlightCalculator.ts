import { useState } from "react";
import axios, { AxiosInstance } from "axios";

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

const createAxiosInstance = (): AxiosInstance => {
  const apiUrl = process.env.NEXT_PUBLIC_FLIGHT_CALCULATOR_API;
  const authToken = process.env.NEXT_PUBLIC_FLIGHT_CALCULATOR_TOKEN;

  return axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`
    },
    timeout: 10000
  });
};

export const useFlightCalculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateFlight = async (
    data: FlightCalculatorInput
  ): Promise<CalculationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const axiosInstance = createAxiosInstance();

      console.log("Making flight calculation request:", {
        url: "/flight_calculator/",
        data: data
      });

      const response = await axiosInstance.post("/flight_calculator/", {
        departure_airport: data.departure_airport,
        arrival_airport: data.arrival_airport,
        aircraft: data.aircraft,
        pax: data.pax,
        airway_time: data.airway_time
      });

      console.log("Flight calculation response:", response.data);

      return {
        success: true,
        data: response.data
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Flight calculation failed:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            data: err.config?.data
          }
        });

        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to calculate flight";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.error("Unexpected error:", err);
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
): Promise<CalculationResult> => {
  try {
    if (!formData.departure_airport || !formData.arrival_airport) {
      throw new Error("Airport codes are required");
    }

    if (!formData.pax || isNaN(Number(formData.pax))) {
      throw new Error("Valid passenger count is required");
    }

    const calculatorInput: FlightCalculatorInput = {
      departure_airport: String(formData.departure_airport).toUpperCase(),
      arrival_airport: String(formData.arrival_airport).toUpperCase(),
      aircraft: "Embraer Legacy 650",
      pax: Number(formData.pax),
      airway_time: true
    };

    console.log("Prepared flight calculation request:", calculatorInput);

    const result = await calculateFlight(calculatorInput);

    console.log("Flight calculation result:", result);

    return result;
  } catch (error) {
    console.error("Flight calculation preparation failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to prepare flight calculation"
    };
  }
};
