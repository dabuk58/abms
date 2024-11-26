namespace Domain.AccommodationImage;
public class AccommodationImage
{
    public int ImageId { get; set; }
    public required string Image { get; set; }
    public int AccommodationId { get; set; }
    public virtual Accommodation.Accommodation Accommodation { get; set; } = null!;

}
