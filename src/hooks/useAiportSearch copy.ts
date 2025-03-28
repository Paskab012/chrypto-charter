import { useCallback, useState } from "react";

const AVIATION_API_KEY = process.env.NEXT_PUBLIC_ACCESS_API_KEY;
const AVIATION_API_URL = process.env.NEXT_PUBLIC_AIRPORT_URL;

export const useAirportSearch = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllAirports = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        `${AVIATION_API_URL}?access_key=${AVIATION_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch airports");
      }

      const data: AirportSearchResponse = await response.json();
      setAirports(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setAirports([]);
    }
  }, []);

  const filterAirports = useCallback(
    (query: string): Airport[] => {
      if (!query) return airports;

      return airports.filter(
        (airport) =>
          airport?.airport_name?.toLowerCase().includes(query.toLowerCase()) ||
          airport?.country_name?.toLowerCase().includes(query.toLowerCase()) ||
          airport?.icao_code?.toLowerCase().includes(query.toLowerCase())
      );
    },
    [airports]
  );

  return { airports, fetchAllAirports, filterAirports, error };
};
