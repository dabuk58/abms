using Application.Common.Interfaces;
using Ardalis.Specification.EntityFrameworkCore;
using Domain.Booking;
using Domain.Common.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Bookings.Commands;

public record CancelBookingcommand(
    int BookingId
    ) : IRequest<CancelBookingResponse>;
public class CancelBookingCommandHandler(
    IApplicationDbContext _dbContext,
    IHttpContextAccessor _httpContext) : IRequestHandler<CancelBookingcommand, CancelBookingResponse>
{
    public async Task<CancelBookingResponse> Handle(CancelBookingcommand command, CancellationToken cancellationToken)
    {
        var userId = _httpContext.HttpContext?.Items["UserId"] as int?;

        if (userId == null)
        {
            return new CancelBookingResponse(false, "Unauthorized.");
        }

        var booking = await _dbContext.Bookings
            .WithSpecification(new GetBookingByIdSpec(command.BookingId))
            .FirstOrDefaultAsync(cancellationToken);

        if (booking == null)
        {
            return new CancelBookingResponse(false, "Booking not found.");
        }

        booking.BookingStatus = BookingStatus.Cancelled;

        _dbContext.Bookings.Update(booking);
        await _dbContext.SaveChangesAsync();

        return new CancelBookingResponse(true, "Booking cancelled successfully.");
    }
}
