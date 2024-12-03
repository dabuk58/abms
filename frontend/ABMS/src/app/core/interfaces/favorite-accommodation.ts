export interface FavoriteAccommodation {
  id: number;
  city: string;
  description?: string;
  images: string[];
  name: string;
  pricePerNight: number;
  rating?: number;
  region: string;
  street: string;
  streetNumber: number;
  zipCode: string;
}
