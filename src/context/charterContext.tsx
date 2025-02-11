"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ServiceType = "jet" | "yacht";
type FlightType = "one-way" | "return" | "multi-city";

interface FlightForm {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
}

interface FlightCalculation {
  time: {
    airway: number;
  };
  airport: {
    arrival_airport: string;
    departure_airport: string;
  };
  aircraft: string;
}

interface CharterContextType {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  flightType: FlightType;
  setFlightType: (type: FlightType) => void;
  flightForms: FlightForm[];
  setFlightForms: (forms: FlightForm[]) => void;
  flightCalculation: FlightCalculation | null;
  setFlightCalculation: (calc: FlightCalculation | null) => void;
}

const CharterContext = createContext<CharterContextType | undefined>(undefined);

export function CharterProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<ServiceType>("jet");
  const [flightType, setFlightType] = useState<FlightType>("one-way");
  const [flightForms, setFlightForms] = useState<FlightForm[]>([]);
  const [flightCalculation, setFlightCalculation] =
    useState<FlightCalculation | null>(null);

  const value = {
    selectedService,
    setSelectedService,
    flightType,
    setFlightType,
    flightForms,
    setFlightForms,
    flightCalculation,
    setFlightCalculation
  };

  return (
    <CharterContext.Provider value={value}>{children}</CharterContext.Provider>
  );
}

export function useCharter() {
  const context = useContext(CharterContext);

  if (context === undefined) {
    throw new Error("useCharter must be used within a CharterProvider");
  }

  return context;
}

export const CHARTER_TITLES = {
  jet: "Private Jet Information",
  yacht: "Yacht Information"
} as const;
