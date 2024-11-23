import { AccommodationsParams } from '../../../../api';
import { AccommodationSort } from '../../../core/enums/accommodation-sort.enum';
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
    SortBy: getSortField(advancedFilters.sortBy),
    SortDirection: getSortDirection(advancedFilters.sortBy) || undefined,
  };
}

export function getSortField(
  sortData: AccommodationSort | null
): string | undefined {
  if (!sortData) {
    return undefined;
  }

  switch (sortData) {
    case AccommodationSort.PRICE_ASC:
    case AccommodationSort.PRICE_DESC:
      return 'PricePerNight';
    case AccommodationSort.RATING_ASC:
    case AccommodationSort.RATING_DESC:
      return 'Rating';
    default:
      return undefined;
  }
}

export function getSortDirection(
  sortData: AccommodationSort | null
): string | undefined {
  if (!sortData) {
    return undefined;
  }
  if (
    sortData === AccommodationSort.PRICE_ASC ||
    sortData === AccommodationSort.RATING_ASC
  ) {
    return 'asc';
  } else {
    return 'desc';
  }
}
