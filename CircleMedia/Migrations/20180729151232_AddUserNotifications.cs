using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace CircleMedia.Migrations
{
    public partial class AddUserNotifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_AspNetUsers_AssignedUserId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Products_ProductId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_AssignedUserId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ProductId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "AssignedUserId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "IsRead",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Notifications",
                newName: "ProjectId");

            migrationBuilder.AddColumn<int>(
                name: "NotificationType",
                table: "Notifications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserNotification",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    NotificationId = table.Column<int>(nullable: false),
                    IsRead = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotification", x => new { x.UserId, x.NotificationId });
                    table.ForeignKey(
                        name: "FK_UserNotification_Notifications_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserNotification_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ProjectId",
                table: "Notifications",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserNotification_NotificationId",
                table: "UserNotification",
                column: "NotificationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Projects_ProjectId",
                table: "Notifications",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Projects_ProjectId",
                table: "Notifications");

            migrationBuilder.DropTable(
                name: "UserNotification");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_ProjectId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "NotificationType",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Notifications",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "AssignedUserId",
                table: "Notifications",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Notifications",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRead",
                table: "Notifications",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Notifications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_AssignedUserId",
                table: "Notifications",
                column: "AssignedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ProductId",
                table: "Notifications",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_AspNetUsers_AssignedUserId",
                table: "Notifications",
                column: "AssignedUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Products_ProductId",
                table: "Notifications",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
