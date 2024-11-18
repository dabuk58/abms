using Domain.Accommodation;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DatabaseFacade Database { get; }
    DbSet<Accommodation> Accommodations { get; }
    DbSet<User> Users { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
