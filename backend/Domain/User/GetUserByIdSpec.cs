using Ardalis.Specification;

namespace Domain.User;
public class GetUserByIdSpec : Specification<User>
{
    public GetUserByIdSpec(int userId)
    {
        Query.Where(user => user.Id == userId);
    }
}
