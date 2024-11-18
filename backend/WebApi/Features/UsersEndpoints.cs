using Application.Features.Users.Commands.CheckOrAddUser;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace QualityManagement.WebApi.Features
{
    public static class UsersEndpoints
    {
        public static void MapUsersEndpoints(this WebApplication app)
        {
            var group = app
                .MapGroup("users")
                .WithTags("users")
                .WithOpenApi();

            group.MapPost("checkOrAddUser",
                [SwaggerOperation(summary: "Check if a user exists or add his if he does not exist.")]
            [SwaggerResponse(200, "User already exists.")]
            [SwaggerResponse(201, "User successfully created.")]
            async (
                    ISender sender,
                    [FromBody] CheckOrAddUserCommand command,
                    CancellationToken cancellationToken) =>
                {

                    var result = await sender.Send(command, cancellationToken);

                    if (result.DidExist)
                    {
                        return Results.Ok(result);
                    }

                    return Results.Created($"/users/{result.UserId}", result);

                }
                )
                .WithName("checkOrAddUser")
                .Produces<CheckOrAddUserResponse>(StatusCodes.Status200OK)
                .Produces<CheckOrAddUserResponse>(StatusCodes.Status201Created);
        }
    }
}