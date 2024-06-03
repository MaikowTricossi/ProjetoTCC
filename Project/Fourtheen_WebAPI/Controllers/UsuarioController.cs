using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Fourtheen_WebAPI.Models;
using System.Threading.Tasks;
using System.Security.Claims;
using usuario.Repository;
using System.Text;
using BCrypt.Net;
using System; 

namespace Fourtheen_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _repository;
        private readonly IConfiguration _configuration;

        public UsuarioController(IConfiguration configuration, IUsuarioRepository repository)
        {
            _configuration = configuration;
            _repository = repository;
        }

        // API to select all users

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var usuarios = await _repository.BuscaUsuarios();
            return usuarios.Any()
                    ? Ok(usuarios)
                    : NoContent();
        }

        // API to get a user according to a given user

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByiD(string email)
        {
            var usuarios = await _repository.BuscaUsuario(email);
            return usuarios != null
                    ? Ok(usuarios)
                    : NotFound("Usuário não encontrado");
        }

        // add a user to the database

        [HttpPost]
        public async Task<IActionResult> Post(Usuario usuario)
        {
            if (usuario == null || string.IsNullOrWhiteSpace(usuario.Email) || string.IsNullOrWhiteSpace(usuario.Senha))
            {
                return BadRequest(new { message = "Dados de entrada inválidos" });
            }

            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            try
            {
                _repository.AdicionaUsuario(usuario);
                await _repository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao salvar usuário: {ex.Message}" });
            }

            return Ok(new { message = "Usuário registrado com sucesso" });
        }

        // API for user login

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            if (usuario == null || string.IsNullOrWhiteSpace(usuario.Email) || string.IsNullOrWhiteSpace(usuario.Senha))
            {
                return BadRequest(new { message = "Dados de entrada inválidos" });
            }

            try
            {
                var usuarioBanco = await _repository.BuscaLogin(usuario.Email);

                if (usuarioBanco == null || !VerificaSenha(usuario.Senha, usuarioBanco.Senha))
                {
                    return Unauthorized(new { message = "Credenciais inválidas" });
                }

                var token = GerarToken(usuarioBanco, _configuration);
                return Ok(new { message = "Login bem-sucedido", token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erro ao processar sua solicitação: {ex.Message}" });
            }
        }

        // Function to check whether the password entered is the same as the one registered with the bank

        private bool VerificaSenha(string senhaEntrada, string senhaBanco)
        {
            return BCrypt.Net.BCrypt.Verify(senhaEntrada, senhaBanco);
        }

        // Function that generates a token for a specific registration

        private string GerarToken(Usuario usuario, IConfiguration configuration)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.Email),
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // API to update a registration

        [HttpPut("{email}")]
        public async Task<IActionResult> Put(string email, Usuario usuario)
        {
            var usuarioBanco = await _repository.BuscaUsuario(email);
            if(usuarioBanco == null) return NotFound("Usuário não encontrado");

            usuarioBanco.Nome = usuario.Nome ?? usuarioBanco.Nome;
            usuarioBanco.DataNascimento = usuario.DataNascimento != new DateTime()
            ? usuario.DataNascimento : usuarioBanco.DataNascimento;

            _repository.AtualizaUsuario(usuarioBanco);
            
            return await _repository.SaveChangesAsync()
                ? Ok("Usuário atualizado com sucesso")
                : BadRequest("Erro aoa atualizar o ususario");
                    
        }

        // API to delete a user

        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            var usuarioBanco = await _repository.BuscaUsuario(email);
            if (usuarioBanco == null) return NotFound("Usuário não encontrado");

            _repository.DeletaUsuario(usuarioBanco);

            return await _repository.SaveChangesAsync()
                ? Ok("Usuário deletado com sucesso")
                : BadRequest("Erro ao deletar usuario");
        }

    }

}
  
