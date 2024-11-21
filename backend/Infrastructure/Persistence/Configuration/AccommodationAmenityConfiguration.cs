using Domain.AccommodationAmenity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class AccommodationAmenityConfiguration : IEntityTypeConfiguration<AccommodationAmenity>
{
    public void Configure(EntityTypeBuilder<AccommodationAmenity> builder)
    {
        builder.HasKey(x => new { x.AccommodationId, x.AmenityId });

        builder.Property(x => x.AccommodationId)
            .HasColumnName("accommodation_id")
            .IsRequired();

        builder.HasOne(x => x.Accommodation)
            .WithMany()
            .HasForeignKey(x => x.AccommodationId)
            .HasConstraintName("FK_accommodation_amenity_to_accommodation")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.AmenityId)
            .HasColumnName("amenity_id")
            .IsRequired();

        builder.HasOne(x => x.Amenity)
            .WithMany()
            .HasForeignKey(x => x.AmenityId)
            .HasConstraintName("FK_accommodation_amenity_to_amenity")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
