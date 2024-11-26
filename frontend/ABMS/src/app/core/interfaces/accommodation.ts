import { ReviewDto } from '../../../api';

export interface Accommodation {
  id: number;
  name: string;
  description?: string;
  zipCode: string;
  region: string;
  street: string;
  streetNumber: number;
  city: string;
  latitude: number;
  longitude: number;
  unavailableDates: Date[];
  pricePerNight: number;
  images: string[];
  amenities: string[];
  reviews: ReviewDto[];
  isFavorite: boolean;
  rating?: number;
}
