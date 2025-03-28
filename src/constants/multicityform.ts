export interface BookingFormData {
  title: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
  filters: {
    guests: string;
    charterRate: string;
    yachtType: string;
    region: string;
    facilities: string[];
    experience: string[];
    length: {
      min: string;
      max: string;
    };
    yearBuilt: {
      min: string;
      max: string;
    };
  };
}

export const regions = [
  "Australasia",
  "South Pacific",
  "South America",
  "Central America",
  "Northern Europe",
  "Middle East",
  "Antarctica",
  "Worldwide",
  "Mediterranean",
  "Caribbean",
  "North America",
  "Indian Ocean",
  "South East Asia"
];

export const guestOptions = ["1-4", "5-8", "9-12", "13-20", "21+"];
export const charterRateOptions = [
  "$10,000-$25,000",
  "$25,001-$50,000",
  "$50,001-$100,000",
  "$100,001+"
];
export const yachtTypeOptions = [
  "Motor Yacht",
  "Sailing Yacht",
  "Catamaran",
  "Explorer",
  "Classic"
];
export const facilitiesOptions = [
  "Jacuzzi",
  "Gym",
  "Cinema",
  "Helipad",
  "Swimming Pool",
  "Water Toys"
];
export const experienceOptions = [
  "Luxury",
  "Adventure",
  "Cultural",
  "Family",
  "Romantic"
];
export const lengthOptions = ["< 30m", "30-40m", "40-50m", "50-60m", "60m+"];
export const yearBuiltOptions = [
  "Before 2000",
  "2000-2010",
  "2011-2015",
  "2016-2020",
  "2021+"
];

export const titleOptions = ["Mr", "Mrs", "Ms", "Dr", "Prof"];
