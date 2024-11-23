using Domain.Accommodation;
using Domain.AccommodationAmenity;
using Domain.Amenity;
using Domain.Favorite;
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
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
