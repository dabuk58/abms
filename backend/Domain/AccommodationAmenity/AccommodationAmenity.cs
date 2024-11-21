namespace Domain.AccommodationAmenity;
public class AccommodationAmenity
{
    public int AccommodationId { get; set; }
    public Accommodation.Accommodation Accommodation { get; set; } = null!;

    public int AmenityId { get; set; }
    public Amenity.Amenity Amenity { get; set; } = null!;
}
