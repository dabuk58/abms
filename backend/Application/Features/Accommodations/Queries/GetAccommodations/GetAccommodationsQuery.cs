using Application.Common.Interfaces;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Accommodation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Accommodations.Queries.GetAccommodations;
public record GetAccommodationsQuery(
    string? Query,
    string? Name,
    string? ZipCode,
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
    int Offset = 0,
    int RecordNo = 10
    ) : IRequest<IEnumerable<AccommodationDto>>;

public class GetAccommodationsQueryHandler(IMapper mapper, IApplicationDbContext dbContext) : IRequestHandler<GetAccommodationsQuery, IEnumerable<AccommodationDto>>
{
    public async Task<IEnumerable<AccommodationDto>> Handle(GetAccommodationsQuery request, CancellationToken cancellationToken)
    {
        var queryParameters = new GetAccommodationsSpec.GetAccommodationsSpecQueryParams(
            request.Query,
            request.City,
            request.Region,
            request.Country,
            request.MinLatitude,
            request.MaxLatitude,
            request.MinLongitude,
            request.MaxLongitude,
            request.MinPricePerNight,
            request.MaxPricePerNight,
            request.SortBy,
            request.SortDirection,
            request.Offset,
            request.RecordNo
            );

        var accommodations = await dbContext.Accommodations
            .WithSpecification(new GetAccommodationsSpec(queryParameters))
            .ProjectTo<AccommodationDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return accommodations;
    }
}
