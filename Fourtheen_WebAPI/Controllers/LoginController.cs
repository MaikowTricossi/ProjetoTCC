using Microsoft.AspNetCore.Mvc;
using Fourtheen_WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Fourtheen_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly FourtheenDbContext _context;

        public LoginController(FourtheenDbContext context)
        {
            _context = context;
        }

        // [HttpGet("login")]
        // public async Task<IActionResult> GetUsuarios()
        // {
        //     try
        //     {
        //         var login = await _context.Login.ToListAsync();
        //         return Ok(login);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, new { Mensagem = "Erro ao consultar banco de dados", Erro = ex.Message });
        //     }
        // }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            try
            {
                var loginExistente = await _context.Login
                    .FirstOrDefaultAsync(u => u.Email == login.Email && u.Senha == login.Senha);

                if (loginExistente == null)
                {
                    return NotFound(new { Mensagem = "Usuário ou senha inválidos." });
                }
                
                return Ok(new
                {
                    Mensagem = "Login bem-sucedido!",
                    Login = loginExistente
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Erro ao consultar banco de dados", Erro = ex.Message });
            }
        }

    }
}
