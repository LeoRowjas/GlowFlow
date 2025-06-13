using GlowFlow.Core.Entities;
using GlowFlow.Requests;

namespace GlowFlow.Mappers;

public static class ArticleMapper
{
    public static Article ToEntity(CreateArticleRequest request)
    {
        return new Article
        {
            Name = request.Name,
            PreviewContent = request.PreviewContent,
            Link = request.Link,
            PublishDateTime = request.PublishDateTime,
            ImageLink = request.ImageLink
            // Id, CreatedAt, UpdatedAt будут установлены автоматически
        };
    }

    public static Article ToEntity(CreateArticleRequest request, Guid id)
    {
        var article = ToEntity(request);
        article.Id = id;
        return article;
    }
}