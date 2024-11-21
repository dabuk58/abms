using Application.Common.Interfaces;
using Domain.Accommodation;
using Domain.AccommodationAmenity;
using Domain.Amenity;
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
    public DbSet<Amenity> Amenities => Set<Amenity>();
    public DbSet<AccommodationAmenity> AccommodationAmenities => Set<AccommodationAmenity>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Accommodation>(entity => entity.ToTable("accommodations"));
        modelBuilder.Entity<User>(entity => entity.ToTable("users"));
        modelBuilder.Entity<Amenity>(entity => entity.ToTable("amenities"));
        modelBuilder.Entity<AccommodationAmenity>(entity => entity.ToTable("accommodation_amenities"));
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.AddInterceptors(saveChangesInterceptor);
    }
}
