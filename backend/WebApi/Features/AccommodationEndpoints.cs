using Application.Features.Accommodations.Queries.GetAccommodations;
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
        }
    }
}