using AutoMapper;
using Domain.Review;

namespace Application.Features.Accommodations.Queries.GetAccommodation;
public class ReviewMapping : Profile
{
    public ReviewMapping()
    {
        CreateMap<Review, ReviewDto>();
    }
}
