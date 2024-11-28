using Domain.Common.Base;

namespace Domain.Accommodation;
public class Accommodation : AuditableEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int? Rating { get; set; }
    public required string Street { get; set; }
    public required int StreetNumber { get; set; }
    public required string ZipCode { get; set; }
    public required string City { get; set; }
    public required string Region { get; set; }
    public required decimal Latitude { get; set; }
    public required decimal Longitude { get; set; }
    public required decimal PricePerNight { get; set; }
    public required int MaxGuests { get; set; }
    public virtual ICollection<AccommodationAmenity.AccommodationAmenity>? AccommodationAmenities { get; }
    public virtual ICollection<AccommodationImage.AccommodationImage>? AccommodationImages { get; }
    public virtual ICollection<Review.Review>? Reviews { get; }
    public virtual ICollection<Booking.Booking>? Bookings { get; }
}
