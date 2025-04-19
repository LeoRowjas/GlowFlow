namespace GlowFlow.Application.Interfaces;

public interface IAuthService
{
    Task RegisterAsync(string username, string password);
}