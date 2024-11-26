using Domain.Payment;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("payment_id")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.BookingId)
            .HasColumnName("booking_id")
            .IsRequired();

        builder.Property(x => x.Amount)
            .HasColumnName("amount")
            .IsRequired();

        builder.Property(x => x.PaymentDate)
            .HasColumnName("payment_date")
            .IsRequired();

        builder.Property(x => x.PaymentMethod)
            .HasColumnName("payment_method")
            .IsRequired();

        builder.Property(x => x.PaymentStatus)
            .HasColumnName("payment_status")
            .IsRequired();

        builder.Property(x => x.TransactionId)
            .HasColumnName("transaction_id")
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnName("updated_at")
            .IsRequired(false);
    }
}
