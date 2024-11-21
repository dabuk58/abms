﻿using Application.Common.Interfaces;
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
    int Offset = 0,
    int RecordNo = 10
    ) : IRequest<IEnumerable<AccommodationDto>>;

public class GetAccommodationsQueryHandler(IMapper mapper, IApplicationDbContext dbContext) : IRequestHandler<GetAccommodationsQuery, IEnumerable<AccommodationDto>>
{
    public async Task<IEnumerable<AccommodationDto>> Handle(GetAccommodationsQuery request, CancellationToken cancellationToken)
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
            request.SortDirection,
            request.Offset,
            request.RecordNo
            );

        var accommodations = await dbContext.Accommodations
            .Include(aa => aa.AccommodationAmenities)
            .WithSpecification(new GetAccommodationsSpec(queryParameters))
            .ProjectTo<AccommodationDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return accommodations;
    }
}
