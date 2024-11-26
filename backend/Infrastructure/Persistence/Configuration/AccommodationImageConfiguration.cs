using Domain.AccommodationImage;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class AccommodationImageConfiguration : IEntityTypeConfiguration<AccommodationImage>
{
    public void Configure(EntityTypeBuilder<AccommodationImage> builder)
    {
        builder.HasKey(x => x.ImageId);

        builder.Property(x => x.ImageId)
            .HasColumnName("image_id")
            .IsRequired();

        builder.Property(x => x.Image)
            .HasColumnName("image")
            .IsRequired();

        builder.Property(x => x.AccommodationId)
            .HasColumnName("accommodation_id")
            .IsRequired();

        builder.HasOne(x => x.Accommodation)
            .WithMany(x => x.AccommodationImages)
            .HasForeignKey(x => x.AccommodationId)
            .HasConstraintName("FK_accommodation_image_to_accommodation")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
