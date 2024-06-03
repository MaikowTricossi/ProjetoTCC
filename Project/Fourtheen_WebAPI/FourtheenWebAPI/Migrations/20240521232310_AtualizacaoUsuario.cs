using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FourtheenWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AtualizacaoUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_usuario",
                table: "usuario");

            migrationBuilder.RenameTable(
                name: "usuario",
                newName: "usuarios");

            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "usuarios",
                newName: "senha");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "usuarios",
                newName: "email");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "usuarios",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "id",
                table: "usuarios",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "apelido",
                table: "usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "data_nascimento",
                table: "usuarios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "nome",
                table: "usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usuarios",
                table: "usuarios",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_usuarios",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "id",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "apelido",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "data_nascimento",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "nome",
                table: "usuarios");

            migrationBuilder.RenameTable(
                name: "usuarios",
                newName: "usuario");

            migrationBuilder.RenameColumn(
                name: "senha",
                table: "usuario",
                newName: "Senha");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "usuario",
                newName: "Email");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "usuario",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_usuario",
                table: "usuario",
                column: "Email");
        }
    }
}
