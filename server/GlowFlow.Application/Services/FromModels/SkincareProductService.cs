using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Core.Interfaces.Services;

namespace GlowFlow.Application.Services.FromModels;

public class SkincareProductService(ISkincareProductRepository repository) : ISkincareProductService
{
    private readonly ISkincareProductRepository _repository = repository;
    
    public async Task<SkincareProduct?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<SkincareProduct>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<SkincareProduct> AddAsync(SkincareProduct entity)
    {
        return await _repository.AddAsync(entity);
    }

    public async Task<SkincareProduct> UpdateAsync(SkincareProduct entity)
    {
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType)
    {
        return await _repository.GetBySkinTypeAsync(skinType);
    }

    public async Task<IEnumerable<SkincareProduct>> GetByNameAsync(string name)
    {
        return await _repository.GetByNameAsync(name);
    }

    public async Task<IEnumerable<SkincareProduct>> GetByIngredientAsync(string ingredientName)
    {
        return await _repository.GetByIngredientAsync(ingredientName);
    }
}