import { AccommodationDto, GetAccommodationsResponse } from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';
import { AccommodationsResponse } from '../../../core/interfaces/accommodations-response';

export function mapAccommodationsProposals(
  accommodations: AccommodationDto[]
): Accommodation[] {
  return accommodations.map((accommodation) => mapAccommodation(accommodation));
}

export function mapAccommodation(
  accommodation: AccommodationDto
): Accommodation {
  return {
    ...accommodation,
    id: accommodation.id!,
    unavailableDates: [],
    isFavorite: false,
  };
}

export function mapAccommodations(
  response: GetAccommodationsResponse
): AccommodationsResponse {
  return {
    accommodations: response.accommodations.map((accommodation) =>
      mapAccommodation(accommodation)
    ),
    totalRecords: response.totalRecords,
  };
}
