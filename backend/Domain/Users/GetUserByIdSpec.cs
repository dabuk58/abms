using Ardalis.Specification;
using Domain.Users;

namespace Domain.Accommodation;
public class GetUserByIdSpec : Specification<User>
{
    public GetUserByIdSpec(int userId)
    {
        Query.Where(user => user.Id == userId);
    }
}
