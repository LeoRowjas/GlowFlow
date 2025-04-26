using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Core.Interfaces.Services;

public interface IArticleService : IService<Article>
{
    Task<IEnumerable<Article>> SearchByTitleAsync(string title);
    Task<IEnumerable<Article>> GetRecentArticlesAsync(int count);
}