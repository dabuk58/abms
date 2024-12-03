namespace Application.Features.Users.Commands.CheckOrAddUser;
public class UserDto
{
    public required int Id { get; set; }
    public required string Email { get; set; }
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
}
