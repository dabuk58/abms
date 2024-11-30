import { AccommodationsParams } from '../../../../api';
import { AccommodationSort } from '../../../core/enums/accommodation-sort.enum';
import { mapToApiDate } from '../../../shared/tools/functions';
import { CombinedFilters } from '../pages/accommodations-search-page/accommodations-search-page.component';

export function mapFiltersToAccommodationsParams(
  filters: CombinedFilters,
  sortBy: AccommodationSort
): AccommodationsParams {
  return {
    Query: filters.query || undefined,
    MinPricePerNight: filters.minPrice || undefined,
    MaxPricePerNight: filters.maxPrice || undefined,
    Amenities: filters.amenities || undefined,
    MinRating: filters.rating || undefined,
    DateFrom: filters.dateFrom || undefined,
    DateTo: filters.dateTo || undefined,
    Guests: filters.guests || undefined,
    SortBy: getSortField(sortBy),
    SortDirection: getSortDirection(sortBy),
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
