using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GlowFlow.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CompleteTestModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestOptions_TestQuestions_QuestionId",
                table: "TestOptions");

            migrationBuilder.DropIndex(
                name: "IX_TestOptions_QuestionId",
                table: "TestOptions");

            migrationBuilder.AddColumn<Guid>(
                name: "TestQuestionId",
                table: "TestOptions",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TestOptions_TestQuestionId",
                table: "TestOptions",
                column: "TestQuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestOptions_TestQuestions_TestQuestionId",
                table: "TestOptions",
                column: "TestQuestionId",
                principalTable: "TestQuestions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestOptions_TestQuestions_TestQuestionId",
                table: "TestOptions");

            migrationBuilder.DropIndex(
                name: "IX_TestOptions_TestQuestionId",
                table: "TestOptions");

            migrationBuilder.DropColumn(
                name: "TestQuestionId",
                table: "TestOptions");

            migrationBuilder.CreateIndex(
                name: "IX_TestOptions_QuestionId",
                table: "TestOptions",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestOptions_TestQuestions_QuestionId",
                table: "TestOptions",
                column: "QuestionId",
                principalTable: "TestQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
