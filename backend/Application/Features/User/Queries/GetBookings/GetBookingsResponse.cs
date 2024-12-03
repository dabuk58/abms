using Application.Features.Accommodations.Commands.AddBooking;

namespace Application.Features.User.Queries.GetBookings;
public class GetBookingsResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public BookingDto[]? Bookings { get; set; }

    public GetBookingsResponse(bool success, string message, BookingDto[]? bookings = null)
    {
        Success = success;
        Message = message;
        Bookings = bookings;
    }
}
