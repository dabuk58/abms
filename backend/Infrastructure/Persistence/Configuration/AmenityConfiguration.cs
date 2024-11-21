using Domain.Amenity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;
public class AmenityConfiguration : IEntityTypeConfiguration<Amenity>
{
    public void Configure(EntityTypeBuilder<Amenity> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("amenity_id")
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Name)
            .HasColumnName("name")
            .IsRequired();

        builder.HasMany(a => a.AmenityAccommodations)
            .WithOne(aa => aa.Amenity)
            .HasForeignKey(aa => aa.AmenityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
