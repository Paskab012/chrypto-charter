export const airportsData: AirportResponse = {
  pagination: {
    offset: 0,
    limit: 100,
    count: 100,
    total: 6710
  },
  data: [
    {
      id: "2839383",
      gmt: "-10",
      airport_id: "1",
      iata_code: "AAA",
      city_iata_code: "AAA",
      icao_code: "NTGA",
      country_iso2: "PF",
      geoname_id: "6947726",
      latitude: "-17.05",
      longitude: "-145.41667",
      airport_name: "Anaa",
      country_name: "French Polynesia",
      phone_number: null,
      timezone: "Pacific/Tahiti"
    },
    {
      id: "2839384",
      gmt: "10",
      airport_id: "2",
      iata_code: "AAB",
      city_iata_code: "AAB",
      icao_code: "YARY",
      country_iso2: "AU",
      geoname_id: "7730796",
      latitude: "-26.7",
      longitude: "141.04167",
      airport_name: "Arrabury",
      country_name: "Australia",
      phone_number: null,
      timezone: "Australia/Brisbane"
    },
    {
      id: "2839385",
      gmt: "2",
      airport_id: "3",
      iata_code: "AAC",
      city_iata_code: "AAC",
      icao_code: "HEAR",
      country_iso2: "EG",
      geoname_id: "6297289",
      latitude: "31.133333",
      longitude: "33.75",
      airport_name: "El Arish International Airport",
      country_name: "Egypt",
      phone_number: null,
      timezone: "Africa/Cairo"
    },
    {
      id: "2839386",
      gmt: "1",
      airport_id: "4",
      iata_code: "AAE",
      city_iata_code: "AAE",
      icao_code: "DABB",
      country_iso2: "DZ",
      geoname_id: "2570559",
      latitude: "36.821392",
      longitude: "7.811857",
      airport_name: "Les Salines",
      country_name: null,
      phone_number: null,
      timezone: "Africa/Algiers"
    },
    {
      id: "2839387",
      gmt: "-5",
      airport_id: "5",
      iata_code: "AAF",
      city_iata_code: "AAF",
      icao_code: "KAAF",
      country_iso2: "US",
      geoname_id: "4146153",
      latitude: "29.733334",
      longitude: "-84.98333",
      airport_name: "Apalachicola Regional",
      country_name: "United States",
      phone_number: null,
      timezone: "America/New_York"
    },
    {
      id: "2839388",
      gmt: "-3",
      airport_id: "6",
      iata_code: "AAG",
      city_iata_code: "AAG",
      icao_code: "SSYA",
      country_iso2: "BR",
      geoname_id: "3471795",
      latitude: "-24.103611",
      longitude: "-49.79",
      airport_name: "Arapoti",
      country_name: "Brazil",
      phone_number: null,
      timezone: "America/Sao_Paulo"
    },
    {
      id: "2839389",
      gmt: "1",
      airport_id: "7",
      iata_code: "AAH",
      city_iata_code: "AAH",
      icao_code: "EDKA",
      country_iso2: "DE",
      geoname_id: "3207669",
      latitude: "50.75",
      longitude: "6.133333",
      airport_name: "Aachen/Merzbruck",
      country_name: "Germany",
      phone_number: null,
      timezone: "Europe/Berlin"
    },
    {
      id: "2839390",
      gmt: "-3",
      airport_id: "8",
      iata_code: "AAI",
      city_iata_code: "AAI",
      icao_code: "SWRA",
      country_iso2: "BR",
      geoname_id: "7668483",
      latitude: "-12.916667",
      longitude: "-46.933334",
      airport_name: "Arraias",
      country_name: "Brazil",
      phone_number: null,
      timezone: "America/Araguaina"
    }
  ]
};

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
