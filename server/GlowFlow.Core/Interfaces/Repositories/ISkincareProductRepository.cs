using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface ISkincareProductRepository : IRepository<SkincareProduct>
{
    Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType);
    Task<IEnumerable<SkincareProduct>> GetByNameAsync(string name);
}