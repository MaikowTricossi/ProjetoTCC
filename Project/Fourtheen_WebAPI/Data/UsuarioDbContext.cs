using Microsoft.EntityFrameworkCore;
using Fourtheen_WebAPI.Models;
namespace Fourtheen_WebAPI.Models
{
    public class UsuarioDbContext : DbContext
    {
        public UsuarioDbContext(DbContextOptions<UsuarioDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

          var usuario = modelBuilder.Entity<Usuario>();
          usuario.ToTable("usuarios"); 
          usuario.HasKey(e => e.Id);   
          usuario.Property(x => x.Id).HasColumnName("id").ValueGeneratedOnAdd();
          usuario.Property(x => x.Nome).HasColumnName("nome").IsRequired();
          usuario.Property(x => x.DataNascimento).HasColumnName("data_nascimento").IsRequired();
          usuario.Property(x => x.Email).HasColumnName("email").IsRequired();
          usuario.Property(x => x.Apelido).HasColumnName("apelido").IsRequired();
          usuario.Property(x => x.Senha).HasColumnName("senha").IsRequired();
        }
    }
}

