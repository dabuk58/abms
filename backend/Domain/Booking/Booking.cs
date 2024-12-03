using Domain.Common.Base;
using Domain.Common.Enums;

namespace Domain.Booking;
public class Booking : AuditableEntity
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public required int AccommodationId { get; set; }
    public required DateOnly StartDate { get; set; }
    public required DateOnly EndDate { get; set; }
    public required BookingStatus BookingStatus { get; set; }
    public required int Guests { get; set; }
    public int? PaymentId { get; set; }
    public virtual Accommodation.Accommodation Accommodation { get; set; }
    public virtual User.User User { get; set; }
    public virtual Payment.Payment Payment { get; set; }
}
