namespace Application.Features.Bookings.Commands;
public class CancelBookingResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }

    public CancelBookingResponse(bool success, string message)
    {
        Success = success;
        Message = message;
    }
}
