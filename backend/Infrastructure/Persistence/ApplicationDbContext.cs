using Application.Common.Interfaces;
using Domain.Accommodation;
using Domain.Users;
using Infrastructure.Persistence.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Reflection;

namespace Infrastructure.Persistence;
public class ApplicationDbContext(
    DbContextOptions options,
    EntitySaveChangesInterceptor saveChangesInterceptor
    ) : DbContext(options), IApplicationDbContext
{
    public override DatabaseFacade Database => base.Database;
    public DbSet<Accommodation> Accommodations => Set<Accommodation>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Accommodation>(entity => entity.ToTable("accommodations"));
        modelBuilder.Entity<User>(entity => entity.ToTable("users"));
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.AddInterceptors(saveChangesInterceptor);
    }
}
