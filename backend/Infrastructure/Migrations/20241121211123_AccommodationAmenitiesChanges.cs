using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AccommodationAmenitiesChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmenityId",
                table: "accommodation_amenities",
                newName: "amenity_id");

            migrationBuilder.RenameColumn(
                name: "AccommodationId",
                table: "accommodation_amenities",
                newName: "accommodation_id");

            migrationBuilder.RenameIndex(
                name: "IX_accommodation_amenities_AmenityId",
                table: "accommodation_amenities",
                newName: "IX_accommodation_amenities_amenity_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "amenity_id",
                table: "accommodation_amenities",
                newName: "AmenityId");

            migrationBuilder.RenameColumn(
                name: "accommodation_id",
                table: "accommodation_amenities",
                newName: "AccommodationId");

            migrationBuilder.RenameIndex(
                name: "IX_accommodation_amenities_amenity_id",
                table: "accommodation_amenities",
                newName: "IX_accommodation_amenities_AmenityId");
        }
    }
}
