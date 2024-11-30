using Application.Features.Accommodations.Commands.AddBooking;

namespace Application.Features.Accommodations.Commands.AddReservation;
public class AddBookingResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public BookingDto? Booking { get; set; }

    public AddBookingResponse(bool success, string message, BookingDto? booking)
    {
        Success = success;
        Message = message;
        Booking = booking;
    }
}
