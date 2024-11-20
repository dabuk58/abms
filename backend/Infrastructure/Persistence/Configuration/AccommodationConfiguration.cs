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

        builder.Property(x => x.ZipCode)
            .HasColumnName("zip_code")
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(x => x.Region)
            .HasColumnName("region")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Country)
            .HasColumnName("country")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.City)
            .HasColumnName("city")
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

        builder.Property(x => x.Image)
            .HasColumnName("image")
            .IsRequired(false);

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired(false);

    }
}
