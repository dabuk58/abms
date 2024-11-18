using Application.Common.Interfaces;
using Domain.Common.Enums;
using Domain.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Users.Commands.CheckOrAddUser;
public record CheckOrAddUserCommand(
    string AuthProviderUserId,
    int AuthProvider,
    string Email) : IRequest<CheckOrAddUserResponse>;

public class CheckOrAddUserCommandHandler(IApplicationDbContext _dbContext) : IRequestHandler<CheckOrAddUserCommand, CheckOrAddUserResponse>
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
            return new CheckOrAddUserResponse(user.Id, true);
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
            return new CheckOrAddUserResponse(newUser.Id, false);
        }

    }
}