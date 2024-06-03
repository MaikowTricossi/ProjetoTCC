using System.Collections.Generic;
using System.Threading.Tasks;
using Fourtheen_WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace usuario.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly UsuarioDbContext _context;

        public UsuarioRepository(UsuarioDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Usuario>> BuscaUsuarios()
        {
        
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> BuscaUsuario(string email)
        {
            
            return await _context.Usuarios.Where(x => x.Email == email).FirstOrDefaultAsync();
        }

        public void AdicionaUsuario(Usuario usuario)
        {
            _context.Add(usuario);
        }

        public void AtualizaUsuario(Usuario usuario)
        {
            _context.Update(usuario);
        }
            public void DeletaUsuario(Usuario usuario)
        {
            _context.Remove(usuario);
        }
        
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
        public async Task<Usuario> BuscaLogin(string email)
        {
            return await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == email);
        }
    }
}
