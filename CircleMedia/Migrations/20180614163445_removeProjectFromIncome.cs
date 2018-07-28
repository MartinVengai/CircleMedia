using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CircleMedia.Migrations
{
    public partial class removeProjectFromIncome : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_Projects_ProjectId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_ProjectId",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Incomes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Incomes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_ProjectId",
                table: "Incomes",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_Projects_ProjectId",
                table: "Incomes",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
