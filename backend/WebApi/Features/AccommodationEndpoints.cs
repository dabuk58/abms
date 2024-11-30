using Application.Features.Accommodations.Commands.AddBooking;
using Application.Features.Accommodations.Commands.AddReservation;
using Application.Features.Accommodations.Queries.GetAccommodation;
using Application.Features.Accommodations.Queries.GetAccommodations;
using Application.Features.Accommodations.Queries.GetSuggestions;
using Application.Features.Suggestions.Queries.GetSuggestions;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
                .Produces<GetAccommodationsResponse>(StatusCodes.Status200OK);

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

            group.MapGet("{id}",
                [SwaggerOperation(summary: "Get details of a specific accommodation by ID.")]
            [SwaggerResponse(200, "success")]
            async (
                    ISender sender,
                    [FromRoute] int id,
                    CancellationToken cancellationToken) =>
                        await sender.Send(new GetAccommodationQuery(id), cancellationToken)
                )
                .WithName("accommodation")
                .Produces<GetAccommodationResponse>(StatusCodes.Status200OK);

            group.MapPost("{id}/bookings",
                [SwaggerOperation(summary: "Checks if accommodation is available in given dates and adds reservation.")]
            [SwaggerResponse(200, "success")]
            async (
                    ISender sender,
                    [FromRoute] int id,
                    [FromBody] AddBookingRequest command,
                    CancellationToken cancellationToken) =>
                        await sender.Send(new AddBookingCommand(
                            id,
                            command.CheckInDate,
                            command.CheckOutDate,
                            command.Email,
                            command.Name,
                            command.PhoneNumber
                            ), cancellationToken)
                )
                .WithName("addBooking")
                .Produces<AddBookingResponse>(StatusCodes.Status200OK);
        }
    }
}