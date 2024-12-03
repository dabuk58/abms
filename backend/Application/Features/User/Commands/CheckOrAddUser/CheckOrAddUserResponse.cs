namespace Application.Features.User.Commands.CheckOrAddUser;
public class CheckOrAddUserResponse
{
    public UserDto User { get; set; }
    public bool DidExist { get; set; }

    public CheckOrAddUserResponse(UserDto user, bool didExist)
    {
        User = user;
        DidExist = didExist;
    }
}
