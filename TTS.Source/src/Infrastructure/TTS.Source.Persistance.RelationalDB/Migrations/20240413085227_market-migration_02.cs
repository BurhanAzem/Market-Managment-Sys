using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TTS.Source.Persistance.RelationalDB.Migrations
{
    /// <inheritdoc />
    public partial class marketmigration_02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardId",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CardId",
                table: "Users");
        }
    }
}
