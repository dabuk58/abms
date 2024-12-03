using Application.Common.Interfaces;
using Application.Features.Accommodations.Queries.GetAccommodations;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Favorite;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.User.Queries.GetFavorites;
public record GetFavoritesQuery() : IRequest<GetFavoritesResponse>;

public class GetFavoritesQueryHandler(
    IApplicationDbContext _dbContext,
    IMapper _mapper,
    IHttpContextAccessor _httpContext) : IRequestHandler<GetFavoritesQuery, GetFavoritesResponse>
{
    public async Task<GetFavoritesResponse> Handle(GetFavoritesQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContext.HttpContext?.Items["UserId"] as int?;

        if (userId == null)
        {
            return new GetFavoritesResponse(false, "Unauthorized.");
        }

        var accommodations = await _dbContext.Favorites
            .WithSpecification(new GetFavoritesByUserIdSpec((int)userId))
            .Select(f => f.Accommodation)
            .ProjectTo<AccommodationDto>(_mapper.ConfigurationProvider)
            .ToArrayAsync(cancellationToken);

        return new GetFavoritesResponse(
            true,
            "Favorite accommodations retrieved successfully",
            accommodations);

    }
}
