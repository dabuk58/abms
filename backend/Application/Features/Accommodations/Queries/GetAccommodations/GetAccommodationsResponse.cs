namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class GetAccommodationsResponse
{
    public required int TotalRecords { get; set; }
    public required List<AccommodationDto> Accommodations { get; set; }
}