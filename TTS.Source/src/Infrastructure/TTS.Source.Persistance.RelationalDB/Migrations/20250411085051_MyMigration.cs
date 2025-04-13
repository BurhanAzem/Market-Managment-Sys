using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TTS.Source.Persistance.RelationalDB.Migrations
{
    /// <inheritdoc />
    public partial class MyMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Debit_Users_CustomerId",
                table: "Debit");

            migrationBuilder.DropForeignKey(
                name: "FK_Product_Supplier_SupplierId",
                table: "Product");

            migrationBuilder.DropIndex(
                name: "IX_Product_SupplierId",
                table: "Product");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Debit",
                table: "Debit");

            migrationBuilder.DropIndex(
                name: "IX_Debit_CustomerId",
                table: "Debit");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                table: "Product");

            migrationBuilder.RenameTable(
                name: "Debit",
                newName: "Debits");

            migrationBuilder.AddColumn<Guid>(
                name: "DebitId",
                table: "Users",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Debits",
                table: "Debits",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "HotProduct",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId1 = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HotProduct_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HotProduct_Product_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "Product",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RapidChangeProduct",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "date", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId1 = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RapidChangeProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RapidChangeProduct_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RapidChangeProduct_Product_ProductId1",
                        column: x => x.ProductId1,
                        principalTable: "Product",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_DebitId",
                table: "Users",
                column: "DebitId");

            migrationBuilder.CreateIndex(
                name: "IX_Debits_CustomerId",
                table: "Debits",
                column: "CustomerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HotProduct_ProductId",
                table: "HotProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_HotProduct_ProductId1",
                table: "HotProduct",
                column: "ProductId1");

            migrationBuilder.CreateIndex(
                name: "IX_RapidChangeProduct_ProductId",
                table: "RapidChangeProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_RapidChangeProduct_ProductId1",
                table: "RapidChangeProduct",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Debits_Users_CustomerId",
                table: "Debits",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Debits_DebitId",
                table: "Users",
                column: "DebitId",
                principalTable: "Debits",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Debits_Users_CustomerId",
                table: "Debits");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Debits_DebitId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "HotProduct");

            migrationBuilder.DropTable(
                name: "RapidChangeProduct");

            migrationBuilder.DropIndex(
                name: "IX_Users_DebitId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Debits",
                table: "Debits");

            migrationBuilder.DropIndex(
                name: "IX_Debits_CustomerId",
                table: "Debits");

            migrationBuilder.DropColumn(
                name: "DebitId",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Debits",
                newName: "Debit");

            migrationBuilder.AddColumn<Guid>(
                name: "SupplierId",
                table: "Product",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Debit",
                table: "Debit",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_SupplierId",
                table: "Product",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Debit_CustomerId",
                table: "Debit",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Debit_Users_CustomerId",
                table: "Debit",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Product_Supplier_SupplierId",
                table: "Product",
                column: "SupplierId",
                principalTable: "Supplier",
                principalColumn: "Id");
        }
    }
}
