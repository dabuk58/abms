using Application.Features.User.Commands.CheckOrAddUser;

namespace Application.Features.User.Commands.EditUser;
public class EditUserResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public UserDto? User { get; set; }

    public EditUserResponse(bool success, string message, UserDto? user = null)
    {
        Success = success;
        Message = message;
        User = user;
    }
}
