using Application.Features.Accommodations.Queries.GetAccommodations;
using Application.Features.Accommodations.Queries.GetSuggestions;
using Application.Features.Suggestions.Queries.GetSuggestions;
using FluentValidation;
using MediatR;
using Swashbuckle.AspNetCore.Annotations;

namespace QualityManagement.WebApi.Features
{
    public static class AccommodationsEndpoints
    {
        public static void MapAccommodationsEndpoints(this WebApplication app)
        {
            var group = app
                .MapGroup("accommodations")
                .WithTags("accommodations")
                .WithOpenApi();

            group.MapGet("",
                [SwaggerOperation(summary: "Get list of accommodations based on input parameters.")]
            [SwaggerResponse(200, "success")]
            async (
                    ISender sender,
                    [AsParameters] GetAccommodationsQuery request,
                    CancellationToken cancellationToken) =>
                        await sender.Send(request, cancellationToken)
                )
                .WithName("accommodations")
                .Produces<IEnumerable<AccommodationDto>>(StatusCodes.Status200OK);

            group.MapGet("suggestions",
                [SwaggerOperation(summary: "Get accommodation suggestions based on search query.")]
            [SwaggerResponse(200, "success")]
            async (
                    ISender sender,
                    [AsParameters] GetSuggestionsQuery request,
                    CancellationToken cancellationToken) =>
                        await sender.Send(request, cancellationToken)
                )
                .WithName("suggestions")
                .Produces<IEnumerable<SuggestionDto>>(StatusCodes.Status200OK);
        }
    }
}