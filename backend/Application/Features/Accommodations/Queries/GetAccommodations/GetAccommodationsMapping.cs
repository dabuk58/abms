using AutoMapper;
using Domain.Accommodation;

namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class GetAccommodationsMapping : Profile
{
    public GetAccommodationsMapping()
    {
        CreateMap<Accommodation, AccommodationDto>();
    }
}
