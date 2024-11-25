using Ardalis.Specification;

namespace Domain.Accommodation;
public class GetAccommodationByIdSpec : Specification<Accommodation>
{
    public GetAccommodationByIdSpec(int Id)
    {
        Query.Where(a => a.Id == Id);
    }
}
