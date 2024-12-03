export interface Booking {
  id: number;
  bookingStatus: number;
  accommodationId: number;
  accommodationName?: string;
  startDate: string;
  endDate: string;
  guests: number;
  paymentId?: number;
}
