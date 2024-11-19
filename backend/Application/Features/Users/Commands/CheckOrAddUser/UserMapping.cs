using AutoMapper;
using Domain.Users;

namespace Application.Features.Users.Commands.CheckOrAddUser;
public class UserMapping : Profile
{
    public UserMapping()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
    }
}
