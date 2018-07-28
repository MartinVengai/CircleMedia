using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CircleMedia.Migrations
{
    public partial class removeCascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Clients_ClientId1",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ClientId1",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ClientId1",
                table: "Projects");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientId1",
                table: "Projects",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ClientId1",
                table: "Projects",
                column: "ClientId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Clients_ClientId1",
                table: "Projects",
                column: "ClientId1",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
