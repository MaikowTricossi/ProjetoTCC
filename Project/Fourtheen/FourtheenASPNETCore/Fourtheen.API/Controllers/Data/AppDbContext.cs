using Microsoft.EntityFrameworkCore;

namespace Fourtheen.API
{
     public class AppDbContext : DbContext
     {
         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
         {
         }

         // Adicione as DbSet para suas entidades
         // public DbSet<NomeDaEntidade> NomePluralDaEntidade { get; set; }
     }
     

}
