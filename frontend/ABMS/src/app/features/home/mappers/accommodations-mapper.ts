import { AccommodationDto } from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';

export function mapAccommodations(
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
