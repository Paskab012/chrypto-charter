interface FeaturedWork {
  title: string;
  description: string;
  image: string;
  location?: string;
  style?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: FeaturedWork;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface Project {
  title: string;
  description: string;
  image: string;
}

interface ValueCard {
  title: string;
  description: string;
  icon: string;
}

interface OurServiceCards {
  title: string;
  description: string;
}

interface NavItem {
  name: string;
  href: string;
}

interface FlightDetails {
  from: {
    airport: string;
    code: string;
    departure: string;
    utc: string;
  };
  to: {
    airport: string;
    code: string;
    arrival: string;
    utc: string;
  };
  flightTime: {
    hours: number;
    distance: string;
  };
}

interface BookingFormData {
  email: string;
  phone?: string;
  message: string;
}

interface Airport {
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

interface AirportSearchResponse {
  data: Airport[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

interface AirportResponse {
  pagination: {
    offset: number;
    limit: number;
    count: number;
    total: number;
  };
  data: Airport[];
}

interface FlightCalculatorInput {
  departure_airport: string;
  arrival_airport: string;
  aircraft: string;
  pax: number;
  airway_time: boolean;
}

interface FlightCalculatorResponse {
  time: {
    airway: number;
  };
  airport: {
    arrival_airport: string;
    departure_airport: string;
  };
  aircraft: string;
}

interface CalculationResult {
  success: boolean;
  data?: FlightCalculatorResponse;
  error?: string;
}

interface FlightForm {
  id: string;
  from: string;
  to: string;
  passengers: string;
  date: Date | undefined;
  fromAirport?: {
    code: string;
    name: string;
    location: string | null;
  };
  toAirport?: {
    code: string;
    name: string;
    location: string | null;
  };
}

interface BookingFormData {
  title: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  message: string;
}

interface FlightDetails {
  from: {
    airport: string;
    code: string;
    departure: string;
    utc: string;
  };
  to: {
    airport: string;
    code: string;
    arrival: string;
    utc: string;
  };
  flightTime: {
    hours: number;
    distance: string;
  };
}

interface StoredFlightData {
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
