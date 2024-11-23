using Domain.Users;

namespace Domain.Favorite;
public class Favorite
{
    public int AccommodationId { get; set; }
    public Accommodation.Accommodation Accommodation { get; set; } = null!;

    public int UserId { get; set; }
    public User User { get; set; } = null!;
}
