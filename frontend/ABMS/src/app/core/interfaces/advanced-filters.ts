import { AccommodationSort } from '../enums/accommodation-sort.enum';

export interface AdvancedFilters {
  minPrice: number | null;
  maxPrice: number | null;
  rating: number | null;
  amenities: string[] | null;
  sortBy: AccommodationSort | null;
}
