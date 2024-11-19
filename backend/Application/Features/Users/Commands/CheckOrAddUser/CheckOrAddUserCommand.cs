using Application.Common.Interfaces;
using AutoMapper;
using Domain.Common.Enums;
using Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Users.Commands.CheckOrAddUser;
public record CheckOrAddUserCommand(
    string AuthProviderUserId,
    int AuthProvider,
    string Email) : IRequest<CheckOrAddUserResponse>;

public class CheckOrAddUserCommandHandler(IApplicationDbContext _dbContext, IMapper _mapper) : IRequestHandler<CheckOrAddUserCommand, CheckOrAddUserResponse>
{
    public async Task<CheckOrAddUserResponse> Handle(CheckOrAddUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users
                    .FirstOrDefaultAsync(u =>
                        (u.AuthProviderUserId == command.AuthProviderUserId
                        && (int)u.AuthProvider == command.AuthProvider),
                        cancellationToken);
        if (user != null)
        {
            var userDto = _mapper.Map<UserDto>(user);
            return new CheckOrAddUserResponse(userDto, true);
        }
        else
        {
            var newUser = new User
            {
                Email = command.Email,
                AuthProvider = (AuthProvider)command.AuthProvider,
                AuthProviderUserId = command.AuthProviderUserId,
            };

            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var userDto = _mapper.Map<UserDto>(newUser);

            return new CheckOrAddUserResponse(userDto, false);
        }

    }
}