namespace GlowFlow.Application.Interfaces;

public interface IJwtTokenService
{
    string GenerateJwtToken(Guid userId, string username);
}