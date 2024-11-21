using Ardalis.Specification;
using Domain.Common.Extensions;

namespace Domain.Accommodation;
public class GetAccommodationsSpec : Specification<Accommodation>
{
    public record GetAccommodationsSpecQueryParams(
        string? Query,
        string? City,
        string? Region,
        string? DateFrom,//TODO filtering
        string? DateTo,//TODO filtering
        int? Guests,//TODO add guests number column
        int? MinPricePerNight,
        int? MaxPricePerNight,
        string[]? Amenities,
        int? MinRating,
        string? SortBy,
        string? SortDirection,
        int Offset,
        int RecordNo);

    public GetAccommodationsSpec(GetAccommodationsSpecQueryParams queryParams)
    {
        Query.Where(
            a => (queryParams.Query == null ||
                  a.Region.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.Name.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.City.ToLower().Contains(queryParams.Query.ToLower()))
            && (queryParams.City == null || a.City == queryParams.City)
            && (queryParams.Region == null || a.Region == queryParams.Region)
            && (queryParams.MinPricePerNight == null || a.PricePerNight >= queryParams.MinPricePerNight)
            && (queryParams.MaxPricePerNight == null || a.PricePerNight <= queryParams.MaxPricePerNight)
            && (queryParams.MinRating == null || a.Rating >= queryParams.MinRating)
            && (queryParams.Amenities == null || queryParams.Amenities.All(amenity =>
                a.AccommodationAmenities.Any(aa => aa.Amenity.Name == amenity)))
          );

        Query.ApplySorting(queryParams.SortBy, queryParams.SortDirection);

        Query.ApplyPagination(queryParams.Offset, queryParams.RecordNo);
    }
}
