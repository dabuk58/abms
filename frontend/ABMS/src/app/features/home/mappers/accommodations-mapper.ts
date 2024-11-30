import {
  AccommodationDto,
  DateRangeDto,
  GetAccommodationsResponse,
} from '../../../../api';
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
    unavailableCheckInDates: mapUnavailableCheckInDates(
      accommodation.unavailableDates
    ),
    unavailableCheckOutDates: mapUnavailableCheckOutDates(
      accommodation.unavailableDates
    ),
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

export function mapUnavailableCheckInDates(dateRanges: DateRangeDto[]): Date[] {
  const unavailableDates: Date[] = [];

  if (!dateRanges || !dateRanges.length) {
    return [];
  }

  dateRanges.forEach((dateRange) => {
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      for (
        let currentDate = new Date(startDate);
        currentDate < endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        unavailableDates.push(new Date(currentDate));
      }
    }
  });

  return unavailableDates;
}

export function mapUnavailableCheckOutDates(
  dateRanges: DateRangeDto[]
): Date[] {
  const unavailableDates: Date[] = [];

  if (!dateRanges || !dateRanges.length) {
    return [];
  }

  dateRanges.forEach((dateRange) => {
    if (dateRange.startDate && dateRange.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      for (
        let currentDate = new Date(startDate.setDate(startDate.getDate() + 1));
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        unavailableDates.push(new Date(currentDate));
      }
    }
  });

  return unavailableDates;
}
