using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User> GetByEmailAsync(string email);
    Task<User> UpdateSkinTypeAsync(Guid id, SkinType skinType);
}