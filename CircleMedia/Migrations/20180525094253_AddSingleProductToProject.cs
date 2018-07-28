using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CircleMedia.Migrations
{
    public partial class AddSingleProductToProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_ProjectSources_SourceId",
                table: "Projects");

            migrationBuilder.DropTable(
                name: "ProjectProducts");

            migrationBuilder.RenameColumn(
                name: "SourceId",
                table: "Projects",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_SourceId",
                table: "Projects",
                newName: "IX_Projects_ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Products_ProductId",
                table: "Projects",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Products_ProductId",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Projects",
                newName: "SourceId");

            migrationBuilder.RenameIndex(
                name: "IX_Projects_ProductId",
                table: "Projects",
                newName: "IX_Projects_SourceId");

            migrationBuilder.CreateTable(
                name: "ProjectProducts",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectProducts", x => new { x.ProjectId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ProjectProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectProducts_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectProducts_ProductId",
                table: "ProjectProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_ProjectSources_SourceId",
                table: "Projects",
                column: "SourceId",
                principalTable: "ProjectSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
