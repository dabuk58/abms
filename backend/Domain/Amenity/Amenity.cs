namespace Domain.Amenity;
public class Amenity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public virtual ICollection<AccommodationAmenity.AccommodationAmenity>? AmenityAccommodations { get; }
}
