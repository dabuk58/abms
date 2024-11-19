import { AccommodationDto } from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';

export function mapAccommodationsProposal(
  accommodations: AccommodationDto[]
): Accommodation[] {
  return accommodations.map((accommodation) =>
    mapAccommodationProposal(accommodation)
  );
}

export function mapAccommodationProposal(
  accommodation: AccommodationDto
): Accommodation {
  return {
    ...accommodation,
    id: accommodation.id!,
    unavailableDates: [],
  };
}
