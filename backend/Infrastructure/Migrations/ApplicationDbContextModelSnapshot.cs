﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Accommodation.Accommodation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("city");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(9,6)")
                        .HasColumnName("latitude");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(9,6)")
                        .HasColumnName("longitude");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("name");

                    b.Property<decimal>("PricePerNight")
                        .HasColumnType("decimal(10,2)")
                        .HasColumnName("price_per_night");

                    b.Property<int?>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.Property<string>("Region")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("region");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("street");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("integer")
                        .HasColumnName("street_number");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<string>("ZipCode")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("zip_code");

                    b.HasKey("Id");

                    b.ToTable("accommodations", (string)null);
                });

            modelBuilder.Entity("Domain.AccommodationAmenity.AccommodationAmenity", b =>
                {
                    b.Property<int>("AccommodationId")
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    b.Property<int>("AmenityId")
                        .HasColumnType("integer")
                        .HasColumnName("amenity_id");

                    b.HasKey("AccommodationId", "AmenityId");

                    b.HasIndex("AmenityId");

                    b.ToTable("accommodation_amenities", (string)null);
                });

            modelBuilder.Entity("Domain.AccommodationImage.AccommodationImage", b =>
                {
                    b.Property<int>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("image_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ImageId"));

                    b.Property<int>("AccommodationId")
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("image");

                    b.HasKey("ImageId");

                    b.HasIndex("AccommodationId");

                    b.ToTable("accommodation_images", (string)null);
                });

            modelBuilder.Entity("Domain.Amenity.Amenity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("amenity_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("amenities", (string)null);
                });

            modelBuilder.Entity("Domain.Booking.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("booking_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccommodationId")
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    b.Property<int>("BookingStatus")
                        .HasColumnType("integer")
                        .HasColumnName("booking_status");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<DateTimeOffset>("EndDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("end_date");

                    b.Property<int>("PaymentId")
                        .HasColumnType("integer")
                        .HasColumnName("payment_id");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("AccommodationId");

                    b.HasIndex("UserId");

                    b.ToTable("bookings", (string)null);
                });

            modelBuilder.Entity("Domain.Favorite.Favorite", b =>
                {
                    b.Property<int>("AccommodationId")
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("AccommodationId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("favorites", (string)null);
                });

            modelBuilder.Entity("Domain.Payment.Payment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("payment_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("integer")
                        .HasColumnName("amount");

                    b.Property<int>("BookingId")
                        .HasColumnType("integer")
                        .HasColumnName("booking_id");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<DateTimeOffset?>("PaymentDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("payment_date");

                    b.Property<int>("PaymentMethod")
                        .HasColumnType("integer")
                        .HasColumnName("payment_method");

                    b.Property<int>("PaymentStatus")
                        .HasColumnType("integer")
                        .HasColumnName("payment_status");

                    b.Property<string>("TransactionId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("transaction_id");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id");

                    b.HasIndex("BookingId")
                        .IsUnique();

                    b.ToTable("payments", (string)null);
                });

            modelBuilder.Entity("Domain.Review.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("review_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccommodationId")
                        .HasColumnType("integer")
                        .HasColumnName("accommodation_id");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<int>("Rating")
                        .HasColumnType("integer")
                        .HasColumnName("rating");

                    b.Property<string>("ReviewText")
                        .HasColumnType("text")
                        .HasColumnName("review_text");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("AccommodationId");

                    b.HasIndex("UserId");

                    b.ToTable("reviews", (string)null);
                });

            modelBuilder.Entity("Domain.Users.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthProvider")
                        .HasColumnType("integer")
                        .HasColumnName("auth_provider");

                    b.Property<string>("AuthProviderUserId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("auth_provider_user_id");

                    b.Property<DateTimeOffset>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("email");

                    b.Property<string>("FullName")
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("full_name");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)")
                        .HasColumnName("phone_number");

                    b.Property<DateTimeOffset?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Domain.AccommodationAmenity.AccommodationAmenity", b =>
                {
                    b.HasOne("Domain.Accommodation.Accommodation", "Accommodation")
                        .WithMany("AccommodationAmenities")
                        .HasForeignKey("AccommodationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_accommodation_amenity_to_accommodation");

                    b.HasOne("Domain.Amenity.Amenity", "Amenity")
                        .WithMany("AmenityAccommodations")
                        .HasForeignKey("AmenityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_accommodation_amenity_to_amenity");

                    b.Navigation("Accommodation");

                    b.Navigation("Amenity");
                });

            modelBuilder.Entity("Domain.AccommodationImage.AccommodationImage", b =>
                {
                    b.HasOne("Domain.Accommodation.Accommodation", "Accommodation")
                        .WithMany("AccommodationImages")
                        .HasForeignKey("AccommodationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_accommodation_image_to_accommodation");

                    b.Navigation("Accommodation");
                });

            modelBuilder.Entity("Domain.Booking.Booking", b =>
                {
                    b.HasOne("Domain.Accommodation.Accommodation", "Accommodation")
                        .WithMany("Bookings")
                        .HasForeignKey("AccommodationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_booking_to_accommodation");

                    b.HasOne("Domain.Users.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_booking_to_user");

                    b.Navigation("Accommodation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Favorite.Favorite", b =>
                {
                    b.HasOne("Domain.Accommodation.Accommodation", "Accommodation")
                        .WithMany()
                        .HasForeignKey("AccommodationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_favorite_to_accommodation");

                    b.HasOne("Domain.Users.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_favorite_to_user");

                    b.Navigation("Accommodation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Payment.Payment", b =>
                {
                    b.HasOne("Domain.Booking.Booking", "Booking")
                        .WithOne("Payment")
                        .HasForeignKey("Domain.Payment.Payment", "BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_booking_to_payment");

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("Domain.Review.Review", b =>
                {
                    b.HasOne("Domain.Accommodation.Accommodation", "Accommodation")
                        .WithMany("Reviews")
                        .HasForeignKey("AccommodationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_review_to_accommodation");

                    b.HasOne("Domain.Users.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_review_to_user");

                    b.Navigation("Accommodation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Accommodation.Accommodation", b =>
                {
                    b.Navigation("AccommodationAmenities");

                    b.Navigation("AccommodationImages");

                    b.Navigation("Bookings");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("Domain.Amenity.Amenity", b =>
                {
                    b.Navigation("AmenityAccommodations");
                });

            modelBuilder.Entity("Domain.Booking.Booking", b =>
                {
                    b.Navigation("Payment")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Users.User", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("Reviews");
                });
#pragma warning restore 612, 618
        }
    }
}
