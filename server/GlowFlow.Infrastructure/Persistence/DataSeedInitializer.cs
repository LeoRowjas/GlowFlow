using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GlowFlow.Infrastructure.Persistence;

public class DataSeedInitializer
{
    private readonly GlowFlowDbContext _dbContext;
    private readonly ILogger<DataSeedInitializer> _logger;

    public DataSeedInitializer(GlowFlowDbContext dbContext, ILogger<DataSeedInitializer> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task SeedDataAsync()
    {
        // Проверяем наличие существующих данных
        if (!await _dbContext.Articles.AnyAsync() &&
            !await _dbContext.SkincareProducts.AnyAsync() &&
            !await _dbContext.SkincareIngredients.AnyAsync())
        {
            _logger.LogInformation("Начало заполнения базы данных тестовыми данными");

            // Добавляем статьи
            await SeedArticlesAsync();

            // Добавляем ингредиенты
            var ingredients = await SeedIngredientsAsync();

            // Добавляем продукты с ингредиентами
            await SeedProductsAsync(ingredients);

            _logger.LogInformation("База данных успешно заполнена тестовыми данными");
        }
        else
        {
            _logger.LogInformation("База данных уже содержит данные, пропускаем заполнение");
        }
    }

    private async Task SeedArticlesAsync()
    {
        var articles = new List<Article>
        {
            new() { Name = "Статья 1", PreviewContent = "Краткое описание 1", Link = "https://example.com/article1", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-1.jpg" },
            new() { Name = "Статья 2", PreviewContent = "Краткое описание 2", Link = "https://example.com/article2", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-2.jpg" },
            new() { Name = "Статья 3", PreviewContent = "Краткое описание 3", Link = "https://example.com/article3", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-3.jpg" },
            new() { Name = "Статья 4", PreviewContent = "Краткое описание 4", Link = "https://example.com/article4", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-4.jpg" },
            new() { Name = "Статья 5", PreviewContent = "Краткое описание 5", Link = "https://example.com/article5", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-5.jpg" },
            new() { Name = "Статья 6", PreviewContent = "Краткое описание 6", Link = "https://example.com/article6", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-6.jpg" },
            new() { Name = "Статья 7", PreviewContent = "Краткое описание 7", Link = "https://example.com/article7", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-7.jpg" },
            new() { Name = "Статья 8", PreviewContent = "Краткое описание 8", Link = "https://example.com/article8", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-8.jpg" },
            new() { Name = "Статья 9", PreviewContent = "Краткое описание 9", Link = "https://example.com/article9", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-9.jpg" },
            new() { Name = "Статья 10", PreviewContent = "Краткое описание 10", Link = "https://example.com/article10", PublishDateTime = DateTime.UtcNow, ImageLink = "ar-10.jpg" }
        };

        await _dbContext.Articles.AddRangeAsync(articles);
        await _dbContext.SaveChangesAsync();
    }

    private async Task<List<SkincareIngredient>> SeedIngredientsAsync()
    {
        var ingredients = new List<SkincareIngredient>
        {
            new() { Name = "Ингредиент 1", Effect = "Эффект 1" },
            new() { Name = "Ингредиент 2", Effect = "Эффект 2" },
            new() { Name = "Ингредиент 3", Effect = "Эффект 3" },
            new() { Name = "Ингредиент 4", Effect = "Эффект 4" },
            new() { Name = "Ингредиент 5", Effect = "Эффект 5" },
            new() { Name = "Ингредиент 6", Effect = "Эффект 6" },
            new() { Name = "Ингредиент 7", Effect = "Эффект 7" },
            new() { Name = "Ингредиент 8", Effect = "Эффект 8" },
            new() { Name = "Ингредиент 9", Effect = "Эффект 9" },
            new() { Name = "Ингредиент 10", Effect = "Эффект 10" }
        };

        await _dbContext.SkincareIngredients.AddRangeAsync(ingredients);
        await _dbContext.SaveChangesAsync();
        return ingredients;
    }

    private async Task SeedProductsAsync(List<SkincareIngredient> ingredients)
    {
        var products = new List<SkincareProduct>
        {
            new()
            {
                Name = "Крем для лица",
                Description = "Увлажняющий крем для нормальной кожи",
                ImageLink = "pr-1.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Сыворотка",
                Description = "Сыворотка с витамином С для сияния кожи",
                ImageLink = "pr-2.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal, SkinType.Dry },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Тоник",
                Description = "Успокаивающий тоник для чувствительной кожи",
                ImageLink = "pr-3.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Sensitive },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Гель для умывания",
                Description = "Очищающий гель для комбинированной кожи",
                ImageLink = "pr-4.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Combination, SkinType.Oily },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Маска для лица",
                Description = "Питательная маска для сухой кожи",
                ImageLink = "pr-5.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Dry },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Крем для глаз",
                Description = "Крем от темных кругов и отеков",
                ImageLink = "pr-6.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal, SkinType.Dry, SkinType.Sensitive },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Пилинг",
                Description = "Мягкий пилинг для всех типов кожи",
                ImageLink = "pr-7.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal, SkinType.Combination, SkinType.Oily },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Солнцезащитный крем",
                Description = "SPF 50 для чувствительной кожи",
                ImageLink = "pr-8.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Sensitive, SkinType.Normal },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Ночной крем",
                Description = "Восстанавливающий ночной крем",
                ImageLink = "pr-9.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal, SkinType.Dry },
                Ingredients = GetRandomIngredients(ingredients, 4)
            },
            new()
            {
                Name = "Эмульсия",
                Description = "Легкая эмульсия для жирной кожи",
                ImageLink = "pr-10.jpg",
                SuitableSkinTypes = new List<SkinType> { SkinType.Oily },
                Ingredients = GetRandomIngredients(ingredients, 4)
            }
        };

        await _dbContext.SkincareProducts.AddRangeAsync(products);
        await _dbContext.SaveChangesAsync();
    }

    private List<SkincareIngredient> GetRandomIngredients(List<SkincareIngredient> ingredients, int count)
    {
        var random = new Random();
        return ingredients.OrderBy(_ => random.Next()).Take(count).ToList();
    }
}
