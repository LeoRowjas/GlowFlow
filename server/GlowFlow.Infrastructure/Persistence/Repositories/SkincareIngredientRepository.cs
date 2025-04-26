using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class SkincareIngredientRepository : ISkincareIngredientRepository
{
    private readonly GlowFlowDbContext _context;

    public SkincareIngredientRepository(GlowFlowDbContext context)
    {
        _context = context;
    }

    public async Task<SkincareIngredient?> GetByIdAsync(Guid id)
    {
        return await _context.SkincareIngredients.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<SkincareIngredient>> GetAllAsync()
    {
        return await _context.SkincareIngredients.AsNoTracking().ToListAsync();
    }

    public async Task<SkincareIngredient> AddAsync(SkincareIngredient entity)
    { 
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        await _context.SkincareIngredients.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
        //TODO: добавить валидацию во все сервисы репозитории и тд, типа вдруг не получается добавить хоть что-то
    }

    public async Task<SkincareIngredient> UpdateAsync(SkincareIngredient entity)
    {
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        _context.SkincareIngredients.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var ingredient = await _context.SkincareIngredients.FindAsync(id);
        if (ingredient == null) return false;

        _context.SkincareIngredients.Remove(ingredient);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<SkincareIngredient>> SearchByNameAsync(string name)
    {
        return await _context.SkincareIngredients.Where(a => 
            a.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
    }
}