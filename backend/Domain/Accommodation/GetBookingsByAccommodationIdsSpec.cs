using Ardalis.Specification;

namespace Domain.Accommodation;
public class GetBookingsByAccommodationIdsSpec : Specification<Booking.Booking>
{
    public GetBookingsByAccommodationIdsSpec(IEnumerable<int> accommodationIds)
    {
        Query
            .Where(b => accommodationIds.Contains(b.AccommodationId));
    }
}
