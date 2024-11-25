using Application.Common.Interfaces;
using Application.Features.Accommodations.Queries.GetAccommodations;
using Ardalis.Specification.EntityFrameworkCore;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Accommodation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Accommodations.Queries.GetAccommodation;
public record GetAccommodationQuery(int Id) : IRequest<GetAccommodationResponse>;

public class GetAccommodationQueryHandler(IMapper mapper, IApplicationDbContext dbContext) : IRequestHandler<GetAccommodationQuery, GetAccommodationResponse>
{
    public async Task<GetAccommodationResponse> Handle(GetAccommodationQuery request, CancellationToken cancellationToken)
    {
        var accommodation = await dbContext.Accommodations
            .WithSpecification(new GetAccommodationByIdSpec(request.Id))
            .ProjectTo<AccommodationDto>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(cancellationToken);

        if (accommodation == null)
        {
            return new GetAccommodationResponse(false, null);
        }
        else
        {
            return new GetAccommodationResponse(true, accommodation);
        }
    }
}
