using AutoMapper;
using Domain.Accommodation;

namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class GetAccommodationsMapping : Profile
{
    public GetAccommodationsMapping()
    {
        CreateMap<Accommodation, AccommodationDto>()
            .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.AccommodationImages.Select(ai => ai.Image).ToArray()))
            .ForMember(dest => dest.Reviews, opt => opt.MapFrom(src => src.Reviews
                .OrderByDescending(r => r.CreatedAt)
                .Take(10)
                .ToArray()))
            .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => src.AccommodationAmenities.Select(aa => aa.Amenity.Name).ToArray()));
    }
}
