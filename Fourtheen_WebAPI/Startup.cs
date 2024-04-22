using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using Fourtheen_WebAPI.Models;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<FourtheenDbContext>(options =>
    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        services.AddControllersWithViews();

        services.AddSwaggerGen(); 

        // Configura a política de CORS para permitir solicitações do Angular
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAngular",
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                });
        });

        // Adiciona serviços do controlador
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, FourtheenDbContext dbContext)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage(); 
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fourtheen"); 
                c.RoutePrefix = string.Empty; 
            });
            try
            {
                if (dbContext.Database.CanConnect())
                {
                    Console.WriteLine("Conexão ao banco de dados bem-sucedida.");
                }
                else
                {
                    Console.WriteLine("Não foi possível conectar ao banco de dados.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao conectar ao banco de dados: " + ex.Message);
                throw; 
            }
        }

        app.UseCors("AllowAngular");
        app.UseHttpsRedirection();
        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapDefaultControllerRoute(); 
        });
    }
}