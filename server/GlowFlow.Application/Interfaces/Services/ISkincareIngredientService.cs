using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Application.Interfaces.Services;

public interface ISkincareIngredientService : IService<SkincareIngredient>
{
    Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name);
}