using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class SkincareProducRepository : ISkincareProductRepository
{
    public Task<SkincareProduct?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<SkincareProduct>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<SkincareProduct> AddAsync(SkincareProduct entity)
    {
        throw new NotImplementedException();
    }

    public Task<SkincareProduct> UpdateAsync(SkincareProduct entity)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<SkincareProduct>> GetByNameAsync(string name)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<SkincareProduct>> GetByIngredientAsync(string ingredientName)
    {
        throw new NotImplementedException();
    }
}