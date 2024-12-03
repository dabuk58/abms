using AutoMapper;
using Domain.Users;

namespace Application.Features.Users.Commands.CheckOrAddUser;
public class UserMapping : Profile
{
    public UserMapping()
    {
        CreateMap<User, UserDto>();
    }
}
