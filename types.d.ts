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
