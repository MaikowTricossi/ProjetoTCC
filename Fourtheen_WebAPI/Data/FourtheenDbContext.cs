using Microsoft.EntityFrameworkCore;
using Fourtheen_WebAPI.Models;
namespace Fourtheen_WebAPI.Models
{
    public class FourtheenDbContext : DbContext
    {
        public FourtheenDbContext(DbContextOptions<FourtheenDbContext> options) : base(options) { }

        public DbSet<Login> Login { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>().ToTable("usuario");

            base.OnModelCreating(modelBuilder); 
        }
    }
}

