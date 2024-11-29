using Ardalis.Specification;
using Domain.Common.Enums;

namespace Domain.Accommodation;
public class GetBookingsByAccommodationIdsSpec : Specification<Booking.Booking>
{
    public GetBookingsByAccommodationIdsSpec(IEnumerable<int> accommodationIds)
    {
        Query
            .Where(b => accommodationIds.Contains(b.AccommodationId) && b.BookingStatus == BookingStatus.Confirmed);
    }
}
