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

        DateOnly? dateFrom = null;
        DateOnly? dateTo = null;

        if (DateOnly.TryParse(request.DateFrom, out var parsedDateFrom))
        {
            dateFrom = parsedDateFrom;
        }

        if (DateOnly.TryParse(request.DateTo, out var parsedDateTo))
        {
            dateTo = parsedDateTo;
        }

        var queryParameters = new GetAccommodationsSpec.GetAccommodationsSpecQueryParams(
            request.Query,
            request.City,
            request.Region,
            dateFrom,
            dateTo,
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
            .Include(r => r.Reviews)
            .Include(b => b.Bookings)
            .WithSpecification(new GetAccommodationsSpec(queryParameters))
            .Skip(request.Offset)
            .Take(request.RecordNo ?? int.MaxValue)
            .ProjectTo<AccommodationDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        //var accommodationIds = accommodations.Select(a => a.Id).ToList();

        //var bookings = await dbContext.Bookings
        //    .AsNoTracking()
        //    .WithSpecification(new GetBookingsByAccommodationIdsSpec(accommodationIds))
        //    .ToListAsync(cancellationToken);

        //var datesByAccommodation = bookings
        //    .GroupBy(a => a.AccommodationId)
        //    .ToDictionary(
        //    g => g.Key,
        //    g => g.Select(b => (
        //        new DateRangeDto(b.StartDate, b.EndDate)
        //    )).ToArray());

        //foreach (var accommodation in accommodations)
        //{
        //    accommodation.UnavailableDates = datesByAccommodation.TryGetValue(accommodation.Id, out var dates)
        //        ? dates
        //        : Array.Empty<DateRangeDto>();
        //}

        return new GetAccommodationsResponse
        {
            TotalRecords = totalRecords,
            Accommodations = accommodations
        };
    }
}
