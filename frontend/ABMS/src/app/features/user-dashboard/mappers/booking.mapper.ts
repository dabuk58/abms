import { BookingDto } from '../../../../api';
import { Booking } from '../../../core/interfaces/booking';
import { mapDashedDateToDottedDate } from '../../../shared/tools/functions';

export function mapBookingDtosToBookings(bookings: BookingDto[]): Booking[] {
  return bookings.map((booking) => mapBookingDtoToBooking(booking));
}

export function mapBookingDtoToBooking(booking: BookingDto): Booking {
  return {
    ...booking,
    id: booking.id!,
    startDate: mapDashedDateToDottedDate(booking.startDate),
    endDate: mapDashedDateToDottedDate(booking.endDate),
  };
}
