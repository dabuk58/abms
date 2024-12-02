using Domain.Booking;
using Domain.Payment;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("booking_id")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.UserId)
            .HasColumnName("user_id")
            .IsRequired();

        builder.HasOne(x => x.User)
            .WithMany(x => x.Bookings)
            .HasForeignKey(x => x.UserId)
            .HasConstraintName("FK_booking_to_user");

        builder.Property(x => x.AccommodationId)
            .HasColumnName("accommodation_id")
            .IsRequired();

        builder.HasOne(x => x.Accommodation)
            .WithMany(x => x.Bookings)
            .HasForeignKey(x => x.AccommodationId)
            .HasConstraintName("FK_booking_to_accommodation");

        builder.Property(x => x.StartDate)
            .HasColumnName("start_date")
            .IsRequired();

        builder.Property(x => x.EndDate)
            .HasColumnName("end_date")
            .IsRequired();

        builder.Property(x => x.BookingStatus)
            .HasColumnName("booking_status")
            .IsRequired();

        builder.Property(x => x.Guests)
            .HasColumnName("guests")
            .IsRequired();

        builder.Property(x => x.PaymentId)
            .HasColumnName("payment_id")
            .IsRequired(false);

        builder.HasOne(x => x.Payment)
            .WithOne(x => x.Booking)
            .HasForeignKey<Payment>(x => x.BookingId)
            .HasConstraintName("FK_booking_to_payment");

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired(false);
    }
}
