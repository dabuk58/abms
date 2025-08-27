using Application.Features.Bookings.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace WebApi.Features;

public static class BookingsEndpoints
{
    public static void MapBookingsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("bookings").WithTags("bookings").WithOpenApi();

        group
            .MapPost(
                "{id}/cancel",
                [SwaggerOperation(summary: "Cancel booking with a given id.")]
                [SwaggerResponse(200, "Booking cancelled.")]
                async (ISender sender, [FromRoute] int id, CancellationToken cancellationToken) =>
                    await sender.Send(new CancelBookingcommand(id), cancellationToken)
            )
            .WithName("cancelBooking")
            .Produces<CancelBookingResponse>(StatusCodes.Status200OK);
    }
}
