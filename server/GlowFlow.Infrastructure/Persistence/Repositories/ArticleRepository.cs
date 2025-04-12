using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class ArticleRepository : IArticleRepository
{
    private readonly GlowFlowDbContext _context;

    public ArticleRepository(GlowFlowDbContext context)
    {
        _context = context;
    }

    public async Task<Article?> GetByIdAsync(Guid id)
    {
        return await _context.Articles.FindAsync(id);
    }

    public async Task<IEnumerable<Article>> GetAllAsync()
    {
        return await _context.Articles.ToListAsync();
    }

    public async Task<Article> AddAsync(Article entity)
    {
        await _context.Articles.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<Article> UpdateAsync(Article entity)
    {
        _context.Articles.Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null) return false; //TODO:можно создать нот фаунд эксепшн и изменить возвращаемый тип
        
        _context.Articles.Remove(article);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Article>> SearchByTitleAsync(string title)
    {
        return await _context.Articles.Where(a => a.Name.ToLower().Contains(title.ToLower())).ToListAsync();
    }

    public async Task<IEnumerable<Article>> GetRecentArticlesAsync(int count)
    {
        return await _context.Articles
            .OrderByDescending(a => a.PublishDateTime)
            .Take(count)
            .ToListAsync();
    }
}