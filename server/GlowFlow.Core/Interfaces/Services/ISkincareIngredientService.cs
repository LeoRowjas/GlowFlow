using System.Collections;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Services;

public interface ISkincareIngredientService : IService<SkincareIngredient>
{
    Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name);
}