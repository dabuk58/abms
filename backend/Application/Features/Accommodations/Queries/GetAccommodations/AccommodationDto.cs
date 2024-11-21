﻿namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class AccommodationDto
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
    public string? Image { get; set; }
}
