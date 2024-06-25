using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Fourtheen_WebAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        public string? Nome { get; set; }

        public string? Apelido { get; set; }

        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime DataNascimento { get; set; }

        public string? Email { get; set; }

        public string? Senha { get; set; }

        public Usuario() { }

        public Usuario(string email, string senha, string apelido, string nome, int id, DateTime dataNascimento)
        {

            this.Email = email;
            this.Senha = senha;
            this.Apelido = apelido;
            this.Id = id;
            this.DataNascimento = dataNascimento;
            this.Nome = Nome;

        }
    }
}