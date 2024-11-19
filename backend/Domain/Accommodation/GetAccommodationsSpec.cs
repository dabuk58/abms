using Ardalis.Specification;
using Domain.Common.Extensions;

namespace Domain.Accommodation;
public class GetAccommodationsSpec : Specification<Accommodation>
{
    public record GetAccommodationsSpecQueryParams(
        string? Query,
        string? City,
        string? Region,
        string? Country,
        decimal? MinLatitude,
        decimal? MaxLatitude,
        decimal? MinLongitude,
        decimal? MaxLongitude,
        int? MinPricePerNight,
        int? MaxPricePerNight,
        string? SortBy,
        string? SortDirection,
        int Offset,
        int RecordNo);

    public GetAccommodationsSpec(GetAccommodationsSpecQueryParams queryParams)
    {
        Query.Where(
            a => (queryParams.Query == null ||
                  a.Region.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.Country.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.Name.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.City.ToLower().Contains(queryParams.Query.ToLower()) ||
                  a.ZipCode.ToLower().Contains(queryParams.Query.ToLower()))
            && (queryParams.City == null || a.City == queryParams.City)
            && (queryParams.Region == null || a.Region == queryParams.Region)
            && (queryParams.Country == null || a.Country == queryParams.Country)
            && (queryParams.MinLatitude == null || a.Latitude >= queryParams.MinLatitude)
            && (queryParams.MaxLatitude == null || a.Latitude <= queryParams.MaxLatitude)
            && (queryParams.MinLongitude == null || a.Latitude <= queryParams.MinLongitude)
            && (queryParams.MaxLongitude == null || a.Latitude <= queryParams.MaxLongitude)
            && (queryParams.MinPricePerNight == null || a.PricePerNight >= queryParams.MinPricePerNight)
            && (queryParams.MaxPricePerNight == null || a.PricePerNight >= queryParams.MaxPricePerNight)
          );

        Query.ApplySorting(queryParams.SortBy, queryParams.SortDirection);

        Query.ApplyPagination(queryParams.Offset, queryParams.RecordNo);
    }
}
