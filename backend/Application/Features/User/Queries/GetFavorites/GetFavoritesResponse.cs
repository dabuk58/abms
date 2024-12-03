using Application.Features.Accommodations.Queries.GetAccommodations;

namespace Application.Features.User.Queries.GetFavorites;
public class GetFavoritesResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public AccommodationDto[]? Accommodations { get; set; }

    public GetFavoritesResponse(bool success, string message, AccommodationDto[]? accommodations = null)
    {
        Success = success;
        Message = message;
        Accommodations = accommodations;
    }
}
