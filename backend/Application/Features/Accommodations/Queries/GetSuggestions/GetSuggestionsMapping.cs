using Application.Features.Accommodations.Queries.GetSuggestions;
using AutoMapper;
using Domain.Suggestions;

namespace Application.Features.Accommodations.Queries.GetAccommodations;
public class GetSuggestionsMapping : Profile
{
    public GetSuggestionsMapping()
    {
        CreateMap<Suggestion, SuggestionDto>()
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type));
    }
}
