using Domain.Common.Base;
using Domain.Common.Enums;

namespace Domain.Payment;
public class Payment : AuditableEntity
{
    public int Id { get; set; }
    public required int BookingId { get; set; }
    public required int Amount { get; set; }
    public required DateTimeOffset? PaymentDate { get; set; }
    public required PaymentMethod PaymentMethod { get; set; }
    public required PaymentStatus PaymentStatus { get; set; }
    public string? TransactionId { get; set; }
    public virtual Booking.Booking Booking { get; set; } = null!;
}
