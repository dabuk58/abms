using Application.Features.Users.Commands.AddFavorite;
using Application.Features.Users.Commands.CheckOrAddUser;
using Application.Features.Users.Commands.EditUser;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace QualityManagement.WebApi.Features
{
    public static class UserEndpoints
    {
        public static void MapUsersEndpoints(this WebApplication app)
        {
            var group = app
                .MapGroup("user")
                .WithTags("user")
                .WithOpenApi();

            group.MapPost("checkOrAdd",
                [SwaggerOperation(summary: "Check if user exists or add his if he does not exist.")]
            [SwaggerResponse(200, "User already exists.")]
            async (
                    ISender sender,
                    [FromBody] CheckOrAddUserCommand command,
                    CancellationToken cancellationToken) =>
                        await sender.Send(command, cancellationToken)
                )
                .WithName("checkOrAdd")
                .Produces<CheckOrAddUserResponse>(StatusCodes.Status200OK);

            group.MapPost("favorites",
                [SwaggerOperation(summary: "Add or removes an item within the user's favorites.")]
            [SwaggerResponse(200, "Item added to or removed from favorites.")]
            async (
                    ISender sender,
                    [FromBody] int AccommodationId,
                    HttpContext context,
                    CancellationToken cancellationToken) =>
                {
                    var userId = context.Items["UserId"]?.ToString();
                    var command = new AddFavoriteCommand(AccommodationId, userId);

                    return await sender.Send(command, cancellationToken);
                })
                .WithName("favorites")
                .Produces<AddFavoriteResponse>(StatusCodes.Status200OK);

            group.MapPost("update",
                [SwaggerOperation(summary: "Updates user data.")]
            [SwaggerResponse(200, "User data updated successfully.")]
            async (
                    ISender sender,
                    [FromBody] EditUserDto request,
                    CancellationToken cancellationToken) =>
                {
                    return await sender.Send(
                        new EditUserCommand(
                            request.Email,
                            request.Fullname,
                            request.PhoneNumber),
                        cancellationToken);
                })
                .WithName("update")
                .Produces<EditUserResponse>(StatusCodes.Status200OK);
        }
    }
}