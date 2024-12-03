using Application.Common.Interfaces;
using Application.Features.Users.Commands.CheckOrAddUser;
using Application.Features.Users.Commands.EditUser;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using Domain.Accommodation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

public record EditUserCommand(
    string Email,
    string? Fullname,
    string? PhoneNumber) : IRequest<EditUserResponse>;

public class EditUserCommandHandler(
    IApplicationDbContext _dbContext,
    IHttpContextAccessor _httpContextAccessor,
    IMapper _mapper) : IRequestHandler<EditUserCommand, EditUserResponse>
{
    public async Task<EditUserResponse> Handle(EditUserCommand command, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.Items["UserId"] as int?;

        if (userId == null)
        {
            return new EditUserResponse(false, "Unauthorized");
        }

        var user = await _dbContext.Users
            .WithSpecification(new GetUserByIdSpec((int)userId))
            .FirstOrDefaultAsync(cancellationToken);

        if (user == null)
        {
            return new EditUserResponse(false, "User not found");
        }

        user.PhoneNumber = command.PhoneNumber;
        user.Email = command.Email;
        user.FullName = command.Fullname;

        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var userDto = _mapper.Map<UserDto>(user);

        return new EditUserResponse(true, "User data updated successfully.", userDto);
    }
}