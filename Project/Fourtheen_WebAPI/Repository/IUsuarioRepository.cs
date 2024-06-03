using Fourtheen_WebAPI.Models;

namespace usuario.Repository
{
    public interface IUsuarioRepository
    {
        Task<IEnumerable<Usuario>> BuscaUsuarios();
        Task<Usuario> BuscaUsuario(string email);
        Task<Usuario> BuscaLogin(string email);
        void AdicionaUsuario(Usuario usuario);
        void DeletaUsuario(Usuario usuario);
        void AtualizaUsuario(Usuario usuario);

        Task<bool> SaveChangesAsync();
    
    }
}
