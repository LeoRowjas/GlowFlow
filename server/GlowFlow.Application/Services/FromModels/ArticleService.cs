using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Core.Interfaces.Services;

namespace GlowFlow.Application.Services.FromModels;

public class ArticleService(IArticleRepository repository) : IArticleService
{
    private readonly IArticleRepository _repository = repository;
    
    public async Task<Article?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Article>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Article> AddAsync(Article entity)
    {
        return await _repository.AddAsync(entity);
    }

    public async Task<Article> UpdateAsync(Article entity)
    {
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<IEnumerable<Article>> SearchByTitleAsync(string title)
    {
        return await _repository.SearchByTitleAsync(title);
    }

    public async Task<IEnumerable<Article>> GetRecentArticlesAsync(int count)
    {
        return await _repository.GetRecentArticlesAsync(count);
    }
}