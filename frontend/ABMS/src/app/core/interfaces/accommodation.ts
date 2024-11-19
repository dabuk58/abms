export interface Accommodation {
  id: number;
  name: string;
  description?: string;
  zipCode: string;
  region: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  unavailableDates: Date[];
  pricePerNight: number;
}
