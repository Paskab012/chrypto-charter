import { airports } from "@nwpr/airport-codes";

// Define the interface based on the actual data structure from the screenshot
export interface RawAirport {
  id: number;
  name: string;
  city?: string;
  country?: string;
  iata?: string;
  icao?: string;
  altitude?: number;
  latitude?: number;
  longitude?: number;
  timezone?: number;
  dst?: string;
  tz?: string;
  type?: string;
  source?: string;
}

// Define the interface for the adapted airport format
export interface Airport {
  id: string;
  airport_id: string;
  airport_name: string;
  iata_code: string;
  icao_code: string;
  country_iso2: string;
  country_name: string | null;
  city_iata_code: string;
  latitude: string;
  longitude: string;
  phone_number: string | null;
  timezone: string;
  gmt: string;
  geoname_id: string;
}

// Ensure airports array is properly typed
const typedAirports = airports as unknown as RawAirport[];

// Safe string conversion helper
const safeToString = (value: any): string => {
  if (value === undefined || value === null) return "";
  return String(value);
};

// Safe toLowerCase helper
const safeLowerCase = (str: any): string => {
  if (typeof str !== "string" || str === null || str === undefined) return "";
  return str.toLowerCase();
};

// Safe includes helper
const safeIncludes = (str: any, searchValue: string): boolean => {
  if (typeof str !== "string" || str === null || str === undefined)
    return false;
  return str.toLowerCase().includes(searchValue);
};

export const adaptAirport = (airport: RawAirport): Airport => {
  return {
    id: safeToString(airport.id),
    airport_id: safeToString(airport.id),
    airport_name: safeToString(airport.name),
    iata_code: safeToString(airport.iata),
    icao_code: safeToString(airport.icao),
    country_iso2: "", // Not available in new format
    country_name: safeToString(airport.country),
    city_iata_code: "", // Not available in new format
    latitude: safeToString(airport.latitude),
    longitude: safeToString(airport.longitude),
    phone_number: null,
    timezone: safeToString(airport.tz),
    gmt: safeToString(airport.timezone), // Using timezone number as GMT offset
    geoname_id: "" // Not available in new format
  };
};

export const findAirportByCode = (code: string): RawAirport | undefined => {
  if (!code) return undefined;

  const searchTerm = code.toUpperCase();
  return typedAirports.find(
    (airport) =>
      (airport.iata && airport.iata === searchTerm) ||
      (airport.icao && airport.icao === searchTerm)
  );
};

export const searchAirports = (query: string): RawAirport[] => {
  if (!query) return [];

  const searchTerm = query.toLowerCase();
  return typedAirports.filter(
    (airport) =>
      safeIncludes(airport.name, searchTerm) ||
      safeIncludes(airport.country, searchTerm) ||
      safeIncludes(airport.iata, searchTerm) ||
      safeIncludes(airport.icao, searchTerm) ||
      safeIncludes(airport.city, searchTerm)
  );
};

export const getAllAirports = (): RawAirport[] => {
  return typedAirports;
};

export const getAirportsByCountry = (countryName: string): RawAirport[] => {
  if (!countryName) return [];

  const searchTerm = countryName.toLowerCase();
  return typedAirports.filter(
    (airport) =>
      airport.country && safeLowerCase(airport.country).includes(searchTerm)
  );
};

export const getAirportsByTimeZone = (timezone: string): RawAirport[] => {
  if (!timezone) return [];
  return typedAirports.filter((airport) => airport.tz === timezone);
};

// The "Compatible" functions return the Airport interface
export const findAirportByCodeCompatible = (
  code: string
): Airport | undefined => {
  const airport = findAirportByCode(code);
  return airport ? adaptAirport(airport) : undefined;
};

export const searchAirportsCompatible = (query: string): Airport[] => {
  const rawResults = searchAirports(query);
  return rawResults.map(adaptAirport);
};

export const getAllAirportsCompatible = (): Airport[] => {
  const rawResults = getAllAirports();
  return rawResults.map(adaptAirport);
};

export const getAirportsByCountryCompatible = (
  countryName: string
): Airport[] => {
  const rawResults = getAirportsByCountry(countryName);
  return rawResults.map(adaptAirport);
};

export const getAirportsByTimeZoneCompatible = (
  timezone: string
): Airport[] => {
  const rawResults = getAirportsByTimeZone(timezone);
  return rawResults.map(adaptAirport);
};
