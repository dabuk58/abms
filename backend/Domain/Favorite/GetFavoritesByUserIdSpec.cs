using Ardalis.Specification;

namespace Domain.Favorite;
public class GetFavoritesByUserIdSpec : Specification<Favorite>
{
    public GetFavoritesByUserIdSpec(int userId)
    {
        Query.Where(f => f.UserId == userId);
    }
}
