using Application.Features.Accommodations.Commands.AddBooking;
using AutoMapper;
using Domain.Booking;

namespace Application.Features.Accommodations.Queries.GetAccommodation;
public class BookingMapping : Profile
{
    public BookingMapping()
    {
        CreateMap<Booking, BookingDto>();
    }
}
