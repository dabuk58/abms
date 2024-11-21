using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAccommodationAmenities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accommodation_amenities",
                columns: table => new
                {
                    AccommodationId = table.Column<int>(type: "integer", nullable: false),
                    AmenityId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_accommodation_amenities", x => new { x.AccommodationId, x.AmenityId });
                    table.ForeignKey(
                        name: "FK_accommodation_amenity_to_accommodation",
                        column: x => x.AccommodationId,
                        principalTable: "accommodations",
                        principalColumn: "accommodation_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_accommodation_amenity_to_amenity",
                        column: x => x.AmenityId,
                        principalTable: "amenities",
                        principalColumn: "amenity_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_accommodation_amenities_AmenityId",
                table: "accommodation_amenities",
                column: "AmenityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accommodation_amenities");
        }
    }
}
