using Domain.Accommodation;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DbSet<Accommodation> Accommodations { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
