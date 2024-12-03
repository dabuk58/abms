using AutoMapper;

namespace Application.Features.User.Commands.CheckOrAddUser;
public class UserMapping : Profile
{
    public UserMapping()
    {
        CreateMap<Domain.User.User, UserDto>();
    }
}
