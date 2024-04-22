using System.ComponentModel.DataAnnotations;
namespace Fourtheen_WebAPI.Models
{
    public class Login
    {
        [Key]
        public string Email { get; set; }
 
        public string Senha { get; set; }

        public Login() { }

        public Login(string email, string senha)
        {

            this.Email = email;
            this.Senha = senha;

        }

    }
}