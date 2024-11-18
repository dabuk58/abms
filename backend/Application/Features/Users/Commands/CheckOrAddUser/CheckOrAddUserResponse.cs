namespace Application.Features.Users.Commands.CheckOrAddUser;
public class CheckOrAddUserResponse
{
    public int UserId { get; set; }
    public bool DidExist { get; set; }

    public CheckOrAddUserResponse(int id, bool didExist)
    {
        UserId = id;
        DidExist = didExist;
    }
}
