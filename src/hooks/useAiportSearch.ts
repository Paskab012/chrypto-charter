import { useState } from "react";
import {
  searchAirports,
  findAirportByCode,
  adaptAirport,
  searchAirportsCompatible,
  findAirportByCodeCompatible,
  RawAirport,
  Airport
} from "../data/aiports";

export const useAirportSearch = () => {
  const [searchResults, setSearchResults] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchAirportsWithLimit = (
    query: string,
    limit: number = 50
  ): Airport[] => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setError(null);
      return [];
    }

    try {
      setIsLoading(true);
      // Use the compatible version that returns Airport[] instead of RawAirport[]
      const results = searchAirportsCompatible(query);
      const limitedResults = results.slice(0, limit);
      setSearchResults(limitedResults);
      setError(null);
      return limitedResults;
    } catch (err) {
      setError("Failed to search airports");
      setSearchResults([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const findAirportByIataOrIcao = (code: string): Airport | null => {
    if (!code) return null;

    try {
      // Use the compatible version that returns Airport instead of RawAirport
      const airport = findAirportByCodeCompatible(code);
      return airport || null;
    } catch (err) {
      setError("Failed to find airport");
      return null;
    }
  };

  // Additional utility function if you need the raw airports
  const searchRawAirportsWithLimit = (
    query: string,
    limit: number = 50
  ): RawAirport[] => {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const results = searchAirports(query);
      return results.slice(0, limit);
    } catch (err) {
      return [];
    }
  };

  return {
    searchResults,
    isLoading,
    error,
    searchAirportsWithLimit,
    findAirportByIataOrIcao,
    searchRawAirportsWithLimit
  };
};
