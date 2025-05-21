using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class SkincareProductRepository : ISkincareProductRepository
{
    private readonly GlowFlowDbContext _context;

    public SkincareProductRepository(GlowFlowDbContext context)
    {
        _context = context;
    }

    public async Task<SkincareProduct?> GetByIdAsync(Guid id)
    {
        return await _context.SkincareProducts.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<SkincareProduct>> GetAllAsync()
    {
        return await _context.SkincareProducts.AsNoTracking().ToListAsync();
    }

    public async Task<SkincareProduct> AddAsync(SkincareProduct entity)
    {
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        await _context.SkincareProducts.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<SkincareProduct> UpdateAsync(SkincareProduct entity)
    {
        if(entity == null) throw new ArgumentNullException(nameof(entity));
        _context.SkincareProducts.Update(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var product = await _context.SkincareProducts.FindAsync(id);
        if (product == null) return false;

        _context.SkincareProducts.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<SkincareProduct>> GetBySkinTypeAsync(SkinType skinType)
    {
        return await _context.SkincareProducts.Where(a => a.SuitableSkinTypes.Contains(skinType)).ToListAsync();
        //TODO: оптимизировать
    }

    public async Task<IEnumerable<SkincareProduct>> GetByNameAsync(string name)
    {
        return await _context.SkincareProducts
            .Where(a => a.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
    }

    public async Task<IEnumerable<SkincareProduct>> GetByIngredientAsync(string ingredientName)
    {
        return await _context.SkincareProducts
            .Where(a => a.Ingredients.Any(i => 
                string.Equals(i.Name, ingredientName, StringComparison.InvariantCultureIgnoreCase)))
            .ToListAsync();
    }
}