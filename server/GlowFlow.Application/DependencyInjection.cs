using GlowFlow.Application.Interfaces;
using GlowFlow.Application.Services;
using GlowFlow.Application.Services.FromModels;
using Microsoft.Extensions.DependencyInjection;
using GlowFlow.Core.Interfaces.Services;

namespace GlowFlow.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IArticleService, ArticleService>();
        services.AddScoped<ISkincareProductService, SkincareProductService>();
        services.AddScoped<ISkincareIngredientService, SkincareIngredientService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}