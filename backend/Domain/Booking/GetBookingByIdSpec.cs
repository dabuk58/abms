using Ardalis.Specification;

namespace Domain.Booking;
public class GetBookingByIdSpec : Specification<Booking>
{
    public GetBookingByIdSpec(int bookingId)
    {
        Query.Where(b => b.Id == bookingId);
    }
}
