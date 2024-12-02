namespace Application.Features.Accommodations.Commands.AddBooking;
public class BookingDto
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public required int AccommodationId { get; set; }
    public required DateOnly StartDate { get; set; }
    public required DateOnly EndDate { get; set; }
    public required int BookingStatus { get; set; }
    public required int Guests { get; set; }
    public int? PaymentId { get; set; }
}
