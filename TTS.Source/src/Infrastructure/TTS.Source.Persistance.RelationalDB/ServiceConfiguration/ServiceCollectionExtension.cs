﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TTS.Source.Application.Common.Contracts.Identity;
using TTS.Source.Application.Common.Contracts.Persistance;
using TTS.Source.Domain.Entities;
using TTS.Source.Persistance.RelationalDB.Identity;
using TTS.Source.Persistance.RelationalDB.Identity.Services;
using TTS.Source.Persistance.RelationalDB.Repositories;

namespace TTS.Source.Persistance.RelationalDB.ServiceConfiguration
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRelationalDbServices(this IServiceCollection services
            , IConfiguration configuration
            , IWebHostEnvironment environment)
        {

            services.AddDbContext<TTSDBContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("TTSDatabase"),
                    b => b.MigrationsAssembly(typeof(TTSDBContext).Assembly.FullName))
                .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name })
                .EnableSensitiveDataLogging(environment.IsDevelopment()));

            services.AddIdentityCore<User>()
                    .AddEntityFrameworkStores<TTSDBContext>()
                    .AddTokenProvider<DataProtectorTokenProvider<User>>(TokenOptions.DefaultProvider);

            services.Configure<JwtSettings>(config => configuration.GetSection("JwtSettings"));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = configuration["JwtSettings:Issuer"],
                        ValidAudience = configuration["JwtSettings:Audience"],
                        IssuerSigningKey =
                            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!)),
                    };
                });

            services.AddTransient<IJwtGeneratorService, JwtGeneratorService>();
            services.AddTransient<IUserIdentityService, UserIdentityService>();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<ITicketRepository, TicketRepository>();
            services.AddScoped<IMemberRepository, MemberRepository>();
            services.AddScoped<IProjectMembershipRepository, ProjectMembershipRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            


            return services;
        }
    }
}