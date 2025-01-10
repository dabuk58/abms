using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;

namespace Domain.Common.Extensions;
public static class SortingExtensions
{
    public static ISpecificationBuilder<T> ApplySorting<T>(
            this ISpecificationBuilder<T> query, string? sortBy, string? direction) where T : class
    {
        if (string.IsNullOrEmpty(sortBy))
        {
            return query;
        }

        sortBy = char.ToUpper(sortBy[0]) + sortBy.Substring(1);

        return direction.ToLower() switch
        {
            "asc" => query.OrderBy(e => EF.Property<object>(e, sortBy)),
            "desc" => query.OrderByDescending(e => EF.Property<object>(e, sortBy)),
            _ => query.OrderBy(e => EF.Property<object>(e, sortBy))
        };
    }
}
