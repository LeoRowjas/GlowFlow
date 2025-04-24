using GlowFlow.Application.Interfaces;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Infrastructure.Persistence.Repositories;
using GlowFlow.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GlowFlow.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<ISkincareProductRepository, SkincareProductRepository>();
        services.AddScoped<ISkincareIngredientRepository, SkincareIngredientRepository>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IPasswordHasher, PasswordHashService>();
        services.AddScoped<ITestOptionRepository, TestOptionRepository>();
        services.AddScoped<ITestQuestionRepository, TestQuestionRepository>();

        return services;
    }
}