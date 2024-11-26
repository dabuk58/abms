using Domain.Review;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class ReviewConfiguration : IEntityTypeConfiguration<Review>
{
    public void Configure(EntityTypeBuilder<Review> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("review_id")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Rating)
            .HasColumnName("rating")
            .IsRequired();

        builder.Property(x => x.ReviewText)
            .HasColumnName("review_text")
            .IsRequired(false);

        builder.Property(x => x.UserId)
            .HasColumnName("user_id")
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany(x => x.Reviews)
            .HasForeignKey(x => x.UserId)
            .HasConstraintName("FK_review_to_user")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.AccommodationId)
            .HasColumnName("accommodation_id")
            .IsRequired();

        builder.HasOne(x => x.Accommodation)
            .WithMany(x => x.Reviews)
            .HasForeignKey(x => x.AccommodationId)
            .HasConstraintName("FK_review_to_accommodation")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired(false);
    }
}
