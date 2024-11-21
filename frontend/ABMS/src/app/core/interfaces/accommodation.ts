export interface Accommodation {
  id: number;
  name: string;
  description?: string;
  zipCode: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  unavailableDates: Date[];
  pricePerNight: number;
  image?: string;
}
