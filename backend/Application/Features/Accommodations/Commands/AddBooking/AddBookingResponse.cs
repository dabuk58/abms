using Domain.Booking;

namespace Application.Features.Accommodations.Commands.AddReservation;
public class AddBookingResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public Booking? Booking { get; set; }

    public AddBookingResponse(bool success, string message, Booking? booking)
    {
        Success = success;
        Message = message;
        Booking = booking;
    }
}
