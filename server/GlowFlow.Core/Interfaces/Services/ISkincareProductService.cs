using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Services;

public interface ISkincareProductService : IService<SkincareProduct>
{
    Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType);
    Task<IEnumerable<SkincareProduct>> GetByIngredientAsync(string ingredientName);
}