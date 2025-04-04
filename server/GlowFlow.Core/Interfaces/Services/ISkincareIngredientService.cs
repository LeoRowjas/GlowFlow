using System.Collections;
using GlowFlow.Core.Entities;

namespace GlowFlow.Core.Interfaces.Services;

public interface ISkincareIngredientService
{
    Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name);
}