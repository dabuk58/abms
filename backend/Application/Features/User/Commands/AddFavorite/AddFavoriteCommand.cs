using Application.Common.Interfaces;
using Application.Features.User.Commands.AddFavorite;
using Domain.Favorite;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record AddFavoriteCommand(int AccommodationId, string? UserId) : IRequest<AddFavoriteResponse>;

public class AddFavoriteCommandHandler(IApplicationDbContext _dbContext) : IRequestHandler<AddFavoriteCommand, AddFavoriteResponse>
{
    public async Task<AddFavoriteResponse> Handle(AddFavoriteCommand command, CancellationToken cancellationToken)
    {
        if (string.IsNullOrEmpty(command.UserId))
        {
            return new AddFavoriteResponse(false, "Unauthorized");
        }

        var userId = int.Parse(command.UserId);

        var existingFavorite = await _dbContext.Favorites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.AccommodationId == command.AccommodationId, cancellationToken);

        if (existingFavorite != null)
        {
            _dbContext.Favorites.Remove(existingFavorite);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new AddFavoriteResponse(true, "Item removed from favorites.");
        }

        var favorite = new Favorite
        {
            UserId = userId,
            AccommodationId = command.AccommodationId
        };

        _dbContext.Favorites.Add(favorite);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new AddFavoriteResponse(true, "Item added to favorites.");
    }
}