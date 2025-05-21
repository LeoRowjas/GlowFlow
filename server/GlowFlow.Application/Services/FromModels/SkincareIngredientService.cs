using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Application.Services.FromModels;

public class SkincareIngredientService(ISkincareIngredientRepository repository) : ISkincareIngredientService
{
    private readonly ISkincareIngredientRepository _repository = repository;
    
    public async Task<SkincareIngredient?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<SkincareIngredient>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<SkincareIngredient> AddAsync(SkincareIngredient entity)
    {
        return await _repository.AddAsync(entity);
    }

    public async Task<SkincareIngredient> UpdateAsync(SkincareIngredient entity)
    {
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
    
    public async Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name)
    {
        return await _repository.SearchByNameAsync(name);
    }
}