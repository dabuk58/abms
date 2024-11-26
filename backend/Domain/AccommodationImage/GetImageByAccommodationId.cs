using Ardalis.Specification;

namespace Domain.AccommodationImage;
public class GetImageByAccommodationId : Specification<AccommodationImage>
{
    public GetImageByAccommodationId(int Id)
    {
        Query.Where(i => i.AccommodationId == Id);
    }
}
