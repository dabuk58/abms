using Application.Common.Interfaces;
using Domain.Accommodation;
using Domain.AccommodationAmenity;
using Domain.AccommodationImage;
using Domain.Amenity;
using Domain.Booking;
using Domain.Favorite;
using Domain.Payment;
using Domain.Review;
using Domain.User;
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
    public DbSet<Favorite> Favorites => Set<Favorite>();
    public DbSet<AccommodationImage> AccommodationImages => Set<AccommodationImage>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Accommodation>(entity => entity.ToTable("accommodations"));
        modelBuilder.Entity<User>(entity => entity.ToTable("users"));
        modelBuilder.Entity<Amenity>(entity => entity.ToTable("amenities"));
        modelBuilder.Entity<AccommodationAmenity>(entity => entity.ToTable("accommodation_amenities"));
        modelBuilder.Entity<Favorite>(entity => entity.ToTable("favorites"));
        modelBuilder.Entity<AccommodationImage>(entity => entity.ToTable("accommodation_images"));
        modelBuilder.Entity<Review>(entity => entity.ToTable("reviews"));
        modelBuilder.Entity<Booking>(entity => entity.ToTable("bookings"));
        modelBuilder.Entity<Payment>(entity => entity.ToTable("payments"));
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.AddInterceptors(saveChangesInterceptor);
    }
}
