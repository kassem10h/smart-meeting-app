using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Smart_Meeting.Data;
using Smart_Meeting.Models;
using System.Text;

namespace Smart_Meeting
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //  Enable CORS for React frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // your React dev server
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            //  Add controllers, Swagger, AutoMapper
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // Assuming your AutoMapper profile is named 'MappingProfile'
            builder.Services.AddAutoMapper(typeof(Smart_Meeting.DTOs.MappingProfile));

            //  Database connection
            builder.Services.AddDbContext<AppDBContext>(options =>
                // FIX 1: Changed "DevConnection" to "DefaultConnection" to match your appsettings.json
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            //  Identity configuration
            builder.Services.AddIdentity<Employee, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = true;
            })
            .AddEntityFrameworkStores<AppDBContext>()
            .AddDefaultTokenProviders();

            //  JWT Authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
                    ),
                    ValidateLifetime = true
                };
            });

            // FIX 2: Register the GenerateJWT service so the AuthController can use it.
            builder.Services.AddScoped<Smart_Meeting.JWT.GenerateJWT>();

            var app = builder.Build();

            //  Development mode (Swagger)
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //  HTTPS redirection
            app.UseHttpsRedirection();

            //  Middleware pipeline order is important!
            app.UseRouting(); // Not strictly needed in .NET 6+ minimal APIs but good practice

            app.UseCors("AllowReactApp");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}