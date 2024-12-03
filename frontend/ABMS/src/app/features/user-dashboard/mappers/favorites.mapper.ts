import { AccommodationDto } from '../../../../api';
import { FavoriteAccommodation } from '../../../core/interfaces/favorite-accommodation';

export function mapFavoriteAccommodations(
  accommmodations: AccommodationDto[]
): FavoriteAccommodation[] {
  return accommmodations.map((accommodation) =>
    mapFavoriteAccommodation(accommodation)
  );
}

export function mapFavoriteAccommodation(
  accommodation: AccommodationDto
): FavoriteAccommodation {
  return {
    ...accommodation,
    id: accommodation.id!,
  };
}
