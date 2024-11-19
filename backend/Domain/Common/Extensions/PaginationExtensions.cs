using Ardalis.Specification;

namespace Domain.Common.Extensions;
public static class PaginationExtensions
{
    public static ISpecificationBuilder<T> ApplyPagination<T>(this ISpecificationBuilder<T> query, int? offset, int? recordNo)
    {
        if (offset.HasValue)
        {
            query.Skip(offset.Value);
        }
        if (recordNo.HasValue)
        {
            query.Take(recordNo.Value);
        }

        return query;
    }
}
