using Domain.Accommodation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class AccommodationConfiguration : IEntityTypeConfiguration<Accommodation>
{
    public void Configure(EntityTypeBuilder<Accommodation> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("accommodation_id")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Name)
            .HasColumnName("name")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasColumnName("description")
            .IsRequired(false);

        builder.Property(x => x.Rating)
            .HasColumnName("rating")
            .IsRequired(false);

        builder.Property(x => x.Street)
            .HasColumnName("street")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.StreetNumber)
            .HasColumnName("street_number")
            .IsRequired();

        builder.Property(x => x.ZipCode)
            .HasColumnName("zip_code")
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(x => x.City)
            .HasColumnName("city")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Region)
            .HasColumnName("region")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Latitude)
            .HasColumnName("latitude")
            .HasColumnType("decimal(9,6)")
            .IsRequired();

        builder.Property(x => x.Longitude)
            .HasColumnName("longitude")
            .HasColumnType("decimal(9,6)")
            .IsRequired();

        builder.Property(x => x.PricePerNight)
            .HasColumnName("price_per_night")
            .HasColumnType("decimal(10,2)")
            .IsRequired();

        builder.HasMany(a => a.AccommodationAmenities)
            .WithOne(aa => aa.Accommodation)
            .HasForeignKey(aa => aa.AccommodationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.AccommodationImages)
            .WithOne(a => a.Accommodation)
            .HasForeignKey(a => a.AccommodationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.Reviews)
            .WithOne(a => a.Accommodation)
            .HasForeignKey(a => a.AccommodationId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired(false);

    }
}
