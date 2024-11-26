using Domain.Common.Base;
using Domain.Users;

namespace Domain.Review;
public class Review : AuditableEntity
{
    public int Id { get; set; }
    public int Rating { get; set; }
    public string? ReviewText { get; set; }
    public int UserId { get; set; }
    public int AccommodationId { get; set; }
    public virtual User User { get; set; } = null!;
    public virtual Accommodation.Accommodation Accommodation { get; set; } = null!;
}
