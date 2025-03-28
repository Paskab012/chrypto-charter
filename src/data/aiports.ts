import { airportsData } from "./data";

// const allData = require("airport-iata-codes");

// const airpata = allData();

export const findAirportByCode = (code: string): Airport | undefined => {
  const searchTerm = code.toLowerCase();
  return airportsData.data.find(
    (airport) =>
      airport.iata_code.toLowerCase() === searchTerm ||
      airport.icao_code.toLowerCase() === searchTerm
  );
};

export const searchAirports = (query: string): Airport[] => {
  const searchTerm = query.toLowerCase();
  return airportsData.data.filter(
    (airport) =>
      airport.airport_name.toLowerCase().includes(searchTerm) ||
      airport.country_name?.toLowerCase().includes(searchTerm) ||
      airport.iata_code.toLowerCase().includes(searchTerm) ||
      airport.icao_code.toLowerCase().includes(searchTerm) ||
      airport.city_iata_code.toLowerCase().includes(searchTerm)
  );
};

export const getAllAirports = (): Airport[] => {
  return airportsData.data;
};

export const getAirportsByCountry = (countryCode: string): Airport[] => {
  return airportsData.data.filter(
    (airport) =>
      airport.country_iso2.toLowerCase() === countryCode.toLowerCase()
  );
};

export const getAirportsByTimeZone = (timezone: string): Airport[] => {
  return airportsData.data.filter((airport) => airport.timezone === timezone);
};
