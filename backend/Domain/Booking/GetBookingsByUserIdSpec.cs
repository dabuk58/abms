using Ardalis.Specification;

namespace Domain.Booking;
public class GetBookingsByUserIdSpec : Specification<Booking>
{
    public GetBookingsByUserIdSpec(int userId)
    {
        Query.Where(b => b.UserId == userId);
    }
}
