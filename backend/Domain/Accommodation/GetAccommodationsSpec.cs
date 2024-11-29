using Ardalis.Specification;
using Domain.Common.Extensions;

namespace Domain.Accommodation;
public class GetAccommodationsSpec : Specification<Accommodation>
{
    public record GetAccommodationsSpecQueryParams(
        string? Query,
        string? City,
        string? Region,
        DateOnly? DateFrom,
        DateOnly? DateTo,
        int? Guests,
        int? MinPricePerNight,
        int? MaxPricePerNight,
        string[]? Amenities,
        int? MinRating,
        string? SortBy,
        string? SortDirection);

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
            && (queryParams.Guests == null || a.MaxGuests >= queryParams.Guests)
            && (queryParams.DateFrom == null || queryParams.DateTo == null ||
                !a.Bookings.Any(b =>
                    queryParams.DateFrom < b.EndDate &&
                    queryParams.DateTo > b.StartDate))
          );

        Query.ApplySorting(queryParams.SortBy, queryParams.SortDirection);
    }
}
