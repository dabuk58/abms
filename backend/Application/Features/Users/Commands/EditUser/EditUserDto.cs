﻿namespace Application.Features.Users.Commands.EditUser;
public class EditUserDto
{
    public required string Email { get; set; }
    public string? Fullname { get; set; }
    public string? PhoneNumber { get; set; }
}
