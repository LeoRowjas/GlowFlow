using GlowFlow.Application.Interfaces.Security;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Infrastructure.Persistence.Repositories;
using GlowFlow.Infrastructure.Services;
using GlowFlow.Infrastructure.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GlowFlow.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<ISkincareProductRepository, SkincareProductRepository>();
        services.AddScoped<ISkincareIngredientRepository, SkincareIngredientRepository>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IPasswordHasher, PasswordHashService>();
        services.AddScoped<ITestOptionRepository, TestOptionRepository>();
        services.AddScoped<ITestQuestionRepository, TestQuestionRepository>();
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();  
        
        services.Configure<S3Settings>(configuration.GetSection("S3Settings"));
        services.AddScoped<IFileStorageService, S3FileStorageService>();

        return services;
    }
}