using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CircleMedia.Migrations
{
    public partial class RenameTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Products_ProductId",
                table: "VehicleFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Projects_ProjectId",
                table: "VehicleFeatures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures");

            migrationBuilder.RenameTable(
                name: "VehicleFeatures",
                newName: "ProjectProducts");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_ProductId",
                table: "ProjectProducts",
                newName: "IX_ProjectProducts_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectProducts",
                table: "ProjectProducts",
                columns: new[] { "ProjectId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectProducts_Products_ProductId",
                table: "ProjectProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectProducts_Projects_ProjectId",
                table: "ProjectProducts",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectProducts_Products_ProductId",
                table: "ProjectProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectProducts_Projects_ProjectId",
                table: "ProjectProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectProducts",
                table: "ProjectProducts");

            migrationBuilder.RenameTable(
                name: "ProjectProducts",
                newName: "VehicleFeatures");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectProducts_ProductId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VehicleFeatures",
                table: "VehicleFeatures",
                columns: new[] { "ProjectId", "ProductId" });

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Products_ProductId",
                table: "VehicleFeatures",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Projects_ProjectId",
                table: "VehicleFeatures",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
