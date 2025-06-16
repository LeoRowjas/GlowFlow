using GlowFlow.Application.Interfaces;
using GlowFlow.Application.Interfaces.Security;
using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Application.Services;
using GlowFlow.Application.Services.FromModels;
using Microsoft.Extensions.DependencyInjection;

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
        services.AddScoped<ITestService, TestService>();

        return services;
    }
}