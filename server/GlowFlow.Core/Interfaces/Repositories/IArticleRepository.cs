using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface IArticleRepository : IRepository<Article>
{
    Task<IEnumerable<Article>> SearchByTitleAsync(string title);
    Task<IEnumerable<Article>> GetRecentArticlesAsync(int count);
}