using Application.Features.Accommodations.Queries.GetAccommodations;

namespace Application.Features.Accommodations.Queries.GetAccommodation;
public class GetAccommodationResponse
{
    public bool Success { get; set; }
    public AccommodationDto? Accommodation { get; set; }

    public GetAccommodationResponse(bool success, AccommodationDto? accommodation)
    {
        Success = success;
        Accommodation = accommodation;
    }
}
