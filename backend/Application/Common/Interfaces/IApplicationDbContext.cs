using Domain.Accommodation;
using Domain.AccommodationAmenity;
using Domain.AccommodationImage;
using Domain.Amenity;
using Domain.Favorite;
using Domain.Review;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Application.Common.Interfaces;
public interface IApplicationDbContext
{
    DatabaseFacade Database { get; }
    DbSet<Accommodation> Accommodations { get; }
    DbSet<User> Users { get; }
    DbSet<Amenity> Amenities { get; }
    DbSet<AccommodationAmenity> AccommodationAmenities { get; }
    DbSet<Favorite> Favorites { get; }
    DbSet<AccommodationImage> AccommodationImages { get; }
    DbSet<Review> Reviews { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
