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
    string? City,
    string? Region,
    string? DateFrom,
    string? DateTo,
    int? Guests,
    int? MinPricePerNight,
    int? MaxPricePerNight,
    string? Amenities,
    int? MinRating,
    string? SortBy,
    string? SortDirection,
    int? RecordNo,
    int Offset = 0
    ) : IRequest<GetAccommodationsResponse>;

public class GetAccommodationsQueryHandler(IMapper mapper, IApplicationDbContext dbContext) : IRequestHandler<GetAccommodationsQuery, GetAccommodationsResponse>
{
    public async Task<GetAccommodationsResponse> Handle(GetAccommodationsQuery request, CancellationToken cancellationToken)
    {
        var amenities = request.Amenities?.Split(',', StringSplitOptions.RemoveEmptyEntries);

        var queryParameters = new GetAccommodationsSpec.GetAccommodationsSpecQueryParams(
            request.Query,
            request.City,
            request.Region,
            request.DateFrom,
            request.DateTo,
            request.Guests,
            request.MinPricePerNight,
            request.MaxPricePerNight,
            amenities,
            request.MinRating,
            request.SortBy,
            request.SortDirection
            );

        var totalRecords = await dbContext.Accommodations
            .WithSpecification(new GetAccommodationsSpec(queryParameters))
            .CountAsync(cancellationToken);

        var accommodations = await dbContext.Accommodations
            .Include(aa => aa.AccommodationAmenities)
            .Include(ai => ai.AccommodationImages)
            .Include(ai => ai.Reviews)
            .WithSpecification(new GetAccommodationsSpec(queryParameters))
            .Skip(request.Offset)
            .Take(request.RecordNo ?? int.MaxValue)
            .ProjectTo<AccommodationDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return new GetAccommodationsResponse
        {
            TotalRecords = totalRecords,
            Accommodations = accommodations
        };
    }
}
