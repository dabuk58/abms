using Application.Common.Interfaces;
using Application.Features.Accommodations.Queries.GetSuggestions;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Accommodation;
using Domain.Common.Enums;
using Domain.Suggestions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Suggestions.Queries.GetSuggestions;
public record GetSuggestionsQuery(
        string query
    ) : IRequest<IEnumerable<SuggestionDto>>;

public class GetSuggestionsQueryHandler(IMapper mapper, IApplicationDbContext dbContext) : IRequestHandler<GetSuggestionsQuery, IEnumerable<SuggestionDto>>
{
    public async Task<IEnumerable<SuggestionDto>> Handle(GetSuggestionsQuery request, CancellationToken cancellationToken)
    {
        var queryParameters = new GetSuggestionsSpec.GetSuggestionsSpecQueryParams(request.query);

        var suggestions = await dbContext.Accommodations
            .WithSpecification(new GetSuggestionsSpec(queryParameters))
            .Select(accommodation => new Suggestion
            {
                Type = accommodation.City.Contains(request.query) ? SuggestionType.City :
                       accommodation.Region.Contains(request.query) ? SuggestionType.Region :
                       SuggestionType.Accommodation,
                Name = accommodation.City.Contains(request.query) ? accommodation.City :
                       accommodation.Region.Contains(request.query) ? accommodation.Region :
                       accommodation.Name,
            })
            .ProjectTo<SuggestionDto>(mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        return suggestions;
    }
}
