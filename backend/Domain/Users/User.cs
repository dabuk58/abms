using Domain.Common.Base;
using Domain.Common.Enums;

namespace Domain.Users;
public class User : AuditableEntity
{
    public int Id { get; set; }
    public required string AuthProviderUserId { get; set; }
    public required AuthProvider AuthProvider { get; set; }
    public required string Email { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public virtual ICollection<Review.Review>? Reviews { get; set; }
    public virtual ICollection<Booking.Booking>? Bookings { get; set; }
}
