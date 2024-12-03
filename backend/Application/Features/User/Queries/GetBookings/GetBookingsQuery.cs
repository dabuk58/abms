using Application.Common.Interfaces;
using Application.Features.Accommodations.Commands.AddBooking;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Booking;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.User.Queries.GetBookings;

public record GetBookingsQuery() : IRequest<GetBookingsResponse>;

public class GetBookingsQueryHandler(
    IApplicationDbContext _dbContext,
    IHttpContextAccessor _httpContextAccessor,
    IMapper _mapper) : IRequestHandler<GetBookingsQuery, GetBookingsResponse>
{
    public async Task<GetBookingsResponse> Handle(GetBookingsQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.Items["UserId"] as int?;

        if (userId == null)
        {
            return new GetBookingsResponse(false, "Unauthorized.");
        }

        var bookings = await _dbContext.Bookings
            .WithSpecification(new GetBookingsByUserIdSpec((int)userId))
            .ProjectTo<BookingDto>(_mapper.ConfigurationProvider)
            .ToArrayAsync(cancellationToken);

        return new GetBookingsResponse(true, "Bookings returned successfully.", bookings);

    }
}
