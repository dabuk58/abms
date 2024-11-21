import { AccommodationsParams } from '../../../../api';
import { AdvancedFilters } from '../../../core/interfaces/advanced-filters';
import { BasicFilters } from '../../../core/interfaces/basic-filters';

export function mapFiltersToAccommodationsParams(
  basicFilters: BasicFilters,
  advancedFilters: AdvancedFilters
): AccommodationsParams {
  return {
    Query: basicFilters.query || undefined,
    MinPricePerNight: advancedFilters.minPrice || undefined,
    MaxPricePerNight: advancedFilters.maxPrice || undefined,
    Amenities: advancedFilters.amenities?.join(','),
    MinRating: advancedFilters.rating || undefined,
    Guests: basicFilters.guests || undefined,
  };
}
