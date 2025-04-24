using GlowFlow.Core.Entities;

namespace GlowFlow.Application.Interfaces;

public interface IPasswordHasher
{
    string HashPassword(User user, string password);
    bool VerifyHashedPassword(User user, string hashedPassword, string providedPassword);
}