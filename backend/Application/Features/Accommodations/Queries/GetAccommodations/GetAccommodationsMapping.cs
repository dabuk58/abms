using AutoMapper;
using Domain.Accommodation;

namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class GetAccommodationsMapping : Profile
{
    public GetAccommodationsMapping()
    {
        CreateMap<Accommodation, AccommodationDto>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.AccommodationImages.Select(ai => ai.Image).ToArray()));
    }
}
