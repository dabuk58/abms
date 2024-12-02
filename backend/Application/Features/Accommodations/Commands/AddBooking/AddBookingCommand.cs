using Application.Common.Interfaces;
using Application.Features.Accommodations.Commands.AddBooking;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using Domain.Accommodation;
using Domain.Booking;
using Domain.Common.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Accommodations.Commands.AddReservation;

public record AddBookingCommand(
    int AcccommodationId,
    DateOnly CheckInDate,
    DateOnly CheckOutDate,
    string Email,
    string Name,
    string PhoneNumber,
    int Guests
    ) : IRequest<AddBookingResponse>;

public class AddBookingCommandHandler(
    IApplicationDbContext _dbContext,
    IMapper _mapper,
    IHttpContextAccessor _httpContextAccessor) : IRequestHandler<AddBookingCommand, AddBookingResponse>
{
    public async Task<AddBookingResponse> Handle(AddBookingCommand command, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.Items["UserId"] as int?;

        var bookings = await _dbContext.Bookings
            .WithSpecification(new GetBookingsByAccommodationIdsSpec(new List<int> { command.AcccommodationId }))
            .ToListAsync(cancellationToken);

        var isAvailable = !bookings.Any(b =>
                            command.CheckInDate < b.EndDate &&
                            command.CheckOutDate > b.StartDate);

        if (!userId.HasValue)
        {
            return new AddBookingResponse(
                success: false,
                message: "Authorization fail",
                null);
        }

        if (isAvailable)
        {
            var booking = new Booking
            {
                AccommodationId = command.AcccommodationId,
                StartDate = command.CheckInDate,
                EndDate = command.CheckOutDate,
                BookingStatus = BookingStatus.AwaitingPayment,
                UserId = 8,
                Guests = command.Guests
            };

            _dbContext.Bookings.Add(booking);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var bookingDto = _mapper.Map<BookingDto>(booking);

            return new AddBookingResponse(
                success: true,
                message: "Successfully added booking.",
                booking: bookingDto);
        }

        return new AddBookingResponse(
                success: false,
                message: "Given dates are not available.",
                null);
    }
}
