using Ardalis.Specification;

namespace Domain.Accommodation;
public class GetAccommodationsSpec : Specification<Accommodation>
{
    public record GetAccommodationsSpecQueryParams(
        string? City,
        string? Region,
        string? Country,
        decimal? MinLatitude,
        decimal? MaxLatitude,
        decimal? MinLongitude,
        decimal? MaxLongitude,
        int? MinPricePerNight,
        int? MaxPricePerNight);

    public GetAccommodationsSpec(GetAccommodationsSpecQueryParams queryParams)
    {
        Query.Where(
            a => (queryParams.City == null || a.City == queryParams.City)
            && (queryParams.Region == null || a.Region == queryParams.Region)
            && (queryParams.Country == null || a.Country == queryParams.Country)
            && (queryParams.MinLatitude == null || a.Latitude >= queryParams.MinLatitude)
            && (queryParams.MaxLatitude == null || a.Latitude <= queryParams.MaxLatitude)
            && (queryParams.MinLongitude == null || a.Latitude <= queryParams.MinLongitude)
            && (queryParams.MaxLongitude == null || a.Latitude <= queryParams.MaxLongitude)
            && (queryParams.MinPricePerNight == null || a.PricePerNight >= queryParams.MinPricePerNight)
            && (queryParams.MaxPricePerNight == null || a.PricePerNight >= queryParams.MaxPricePerNight)
          );
    }
}
