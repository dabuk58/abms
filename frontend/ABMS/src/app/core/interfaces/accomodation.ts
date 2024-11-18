export interface Accommodation {
  name: string;
  description: string;
  zipCode: string;
  state: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  unavailableDates: Date[];
  price_per_night: number;
}
