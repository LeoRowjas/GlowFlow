using GlowFlow.Core.Enums;

namespace GlowFlow.Application.Interfaces.Security;

public interface IJwtTokenService
{
    string GenerateJwtToken(Guid userId, string username, UserRole role);
}