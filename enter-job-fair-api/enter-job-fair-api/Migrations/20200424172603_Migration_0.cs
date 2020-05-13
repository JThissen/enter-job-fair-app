using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace enter_job_fair_api.Migrations
{
    public partial class Migration_0 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Username = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Universities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Visible = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    EventName = table.Column<string>(nullable: true),
                    EventYear = table.Column<int>(nullable: false),
                    Location = table.Column<string>(nullable: true),
                    Image = table.Column<byte[]>(nullable: true),
                    Icon = table.Column<byte[]>(nullable: true),
                    StudyPrograms = table.Column<List<string>>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Applicants",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    DegreeLevel = table.Column<string>(nullable: true),
                    Track = table.Column<string>(nullable: true),
                    StudyProgram = table.Column<string>(nullable: true),
                    GraduationDate = table.Column<DateTimeOffset>(nullable: true),
                    Availability = table.Column<DateTimeOffset>(nullable: false),
                    Lunch = table.Column<bool>(nullable: false),
                    DutchSpeaking = table.Column<bool>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    SubmissionDate = table.Column<DateTimeOffset>(nullable: true),
                    UniversityId = table.Column<string>(nullable: true),
                    UniversityId1 = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applicants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applicants_Universities_UniversityId1",
                        column: x => x.UniversityId1,
                        principalTable: "Universities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_UniversityId1",
                table: "Applicants",
                column: "UniversityId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Applicants");

            migrationBuilder.DropTable(
                name: "Universities");
        }
    }
}
