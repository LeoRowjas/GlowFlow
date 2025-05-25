using System.Collections.Generic;
using System.Threading.Tasks;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface ISkincareIngredientRepository : IRepository<SkincareIngredient>
{
    Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name);
}