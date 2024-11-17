namespace Domain.Accommodation;
public class Accommodation
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required string ZipCode { get; set; }
    public required string City { get; set; }
    public required string Region { get; set; }
    public required string Country { get; set; }
    public required decimal Latitude { get; set; }
    public required decimal Longitude { get; set; }
    public required decimal PricePerNight { get; set; }
    public required DateTime CreatedAt { get; set; }
}
