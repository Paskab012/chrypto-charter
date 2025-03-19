import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

//    type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface StoredFlightData {
  from: string;
  to: string;
  passengers: string;
  date: string;
  fromAirport: {
    code: string;
    name: string;
    location: string | null;
  };
  toAirport: {
    code: string;
    name: string;
    location: string | null;
  };
}

export interface StoredMultiCityFlightData {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: string | undefined;
}

export const getFlightData = (): StoredFlightData | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("flightFormData");
    if (!data) return null;

    return JSON.parse(data) as StoredFlightData;
  } catch (error) {
    console.error("Error retrieving flight data:", error);
    return null;
  }
};

export const getMultiCityFlightData = ():
  | StoredMultiCityFlightData[]
  | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("multiCityFlightData");
    if (!data) return null;

    return JSON.parse(data) as StoredMultiCityFlightData[];
  } catch (error) {
    console.error("Error retrieving multi-city flight data:", error);
    return null;
  }
};

export const getFlightCalculation = (): any | null => {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("flightCalculation");
    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error("Error retrieving flight calculation:", error);
    return null;
  }
};

export const clearFlightData = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem("flightFormData");
    localStorage.removeItem("multiCityFlightData");
    localStorage.removeItem("flightCalculation");
  } catch (error) {
    console.error("Error clearing flight data:", error);
  }
};
