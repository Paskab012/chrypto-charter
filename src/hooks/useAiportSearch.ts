import { useState } from "react";
import { getAllAirports, searchAirports } from "../data/aiports";

export const useAirportSearch = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAirports = () => {
    try {
      const data = getAllAirports();
      setAirports(data);
    } catch (err) {
      setError("Failed to fetch airports");
      setAirports([]);
    }
  };

  const filterAirports = (query: string): Airport[] => {
    if (!query) return airports;
    return searchAirports(query);
  };

  return { airports, fetchAllAirports, filterAirports, error };
};
