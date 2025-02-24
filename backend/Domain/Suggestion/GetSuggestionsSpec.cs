﻿using Ardalis.Specification;

namespace Domain.Suggestions;
public class GetSuggestionsSpec : Specification<Accommodation.Accommodation>
{
    public record GetSuggestionsSpecQueryParams(string query);

    public GetSuggestionsSpec(GetSuggestionsSpecQueryParams queryParams)
    {
        Query.Where(accommodation =>
                accommodation.City.ToLower().Contains(queryParams.query.ToLower()) ||
                accommodation.Region.ToLower().Contains(queryParams.query.ToLower()) ||
                accommodation.Name.ToLower().Contains(queryParams.query.ToLower()));

        Query.Take(5);
    }
}
