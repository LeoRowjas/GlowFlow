using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Application.Interfaces.Services;

public interface ISkincareProductService : IService<SkincareProduct>
{
    Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType);
    Task<IEnumerable<SkincareProduct>> GetByNameAsync(string name);
    Task<IEnumerable<SkincareProduct>> GetByIngredientAsync(string ingredientName);
}