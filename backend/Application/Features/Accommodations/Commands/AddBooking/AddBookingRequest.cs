namespace Application.Features.Accommodations.Commands.AddBooking;
public class AddBookingRequest
{
    public required DateOnly CheckInDate { get; set; }
    public required DateOnly CheckOutDate { get; set; }
    public required int Guests { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string PhoneNumber { get; set; }
}
