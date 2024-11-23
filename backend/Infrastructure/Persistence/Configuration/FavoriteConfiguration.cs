using Domain.Favorite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class FavoriteConfiguration : IEntityTypeConfiguration<Favorite>
{
    public void Configure(EntityTypeBuilder<Favorite> builder)
    {
        builder.HasKey(x => new { x.AccommodationId, x.UserId });

        builder.Property(x => x.AccommodationId)
            .HasColumnName("accommodation_id")
            .IsRequired();

        builder.HasOne(x => x.Accommodation)
            .WithMany()
            .HasForeignKey(x => x.AccommodationId)
            .HasConstraintName("FK_favorite_to_accommodation")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.UserId)
            .HasColumnName("user_id")
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .HasConstraintName("FK_favorite_to_user")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
