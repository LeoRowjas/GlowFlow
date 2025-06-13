using GlowFlow.Application.Interfaces.Security;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GlowFlow.Infrastructure.Persistence;

public class DataSeedInitializer
{
    private readonly GlowFlowDbContext _dbContext;
    private readonly ILogger<DataSeedInitializer> _logger;
    private readonly IPasswordHasher _passwordHasher;

    public DataSeedInitializer(GlowFlowDbContext dbContext, ILogger<DataSeedInitializer> logger,
        IPasswordHasher passwordHasher)
    {
        _dbContext = dbContext;
        _logger = logger;
        _passwordHasher = passwordHasher;
    }

    public async Task SeedDataAsync()
    {
        if (!await _dbContext.Articles.AnyAsync() &&
            !await _dbContext.SkincareProducts.AnyAsync() &&
            !await _dbContext.SkincareIngredients.AnyAsync())
        {
            _logger.LogInformation("Начало заполнения базы данных тестовыми/статическими данными");
            await SeedAdmin();
            await SeedArticlesAsync();
            var ingredients = await SeedIngredientsAsync();
            await SeedProductsAsync(ingredients);
            await SeedTestQuestionsAsync();
            await SeedTestOptionsAsync();
            _logger.LogInformation("База данных успешно заполнена тестовыми/статическими данными");
        }
        else
        {
            if (await _dbContext.TestQuestions.AnyAsync() && !await _dbContext.TestOptions.AnyAsync())
            {
                await SeedTestOptionsAsync();
            }
            _logger.LogInformation("База данных уже содержит данные, пропускаем заполнение");
        }
    }

    private async Task SeedAdmin()
    {
        if (await _dbContext.Users.AnyAsync(u => u.Role == UserRole.Admin))
        {
            _logger.LogInformation("Админ уже есть, пропускаем");
            return;
        }

        var admin = new User()
        {
            Age = 20,
            Name = "Admin",
            Username = "Admin",
            Email = "admin@admin.com",
            SkinType = SkinType.Normal,
            Role = UserRole.Admin
        };
        admin.PasswordHash = _passwordHasher.HashPassword(admin, "Admin123");
        
        await _dbContext.Users.AddAsync(admin);
        await _dbContext.SaveChangesAsync();
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
                SuitableSkinTypes = new List<SkinType> { SkinType.Combination },
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
                SuitableSkinTypes = new List<SkinType> { SkinType.Normal, SkinType.Dry, SkinType.Combination },
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
                SuitableSkinTypes = new List<SkinType> { SkinType.Dry, SkinType.Normal },
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

    private static readonly List<string> QuestionTexts = new()
    {
        "Как ваша кожа чувствует себя утром после умывания?",
        "Как ваша кожа реагирует на смену погоды?",
        "Как выглядят поры на вашем лице?",
        "Вы пользуетесь увлажняющим кремом. Что происходит через 2-3 часа?",
        "После умывания без крема кожа…",
        "Как часто у вас появляются воспаления и прыщи?",
        "Как ваша кожа выглядит к середине дня?",
        "Как ваша кожа реагирует на декоративную косметику?",
        "Вы часто ощущаете зуд, раздражение или шелушение кожи?",
        "Как ваша кожа реагирует на новые косметические средства?",
        "Как ваша кожа выглядит на фотографиях без фильтров?",
        "Какие проблемы чаще всего вас беспокоят?",
        "Насколько комфортно вы себя чувствуете без крема?",
        "Какой тип кожи у ваших родителей?",
        "Как быстро ваша кожа загорает?",
        "Насколько часто вам нужно умываться, чтобы чувствовать свежесть?",
        "Как кожа ведёт себя в самолёте или в сухом климате?",
        "Как часто у вас появляются черные точки?",
        "Какой у вас тип питания?",
        "Как часто вы пользуетесь матирующими салфетками?"
    };

    private async Task SeedTestQuestionsAsync()
    {
        if (await _dbContext.TestQuestions.AnyAsync())
            return;

        var questions = QuestionTexts.Select(text => new TestQuestion { Text = text }).ToList();
        await _dbContext.TestQuestions.AddRangeAsync(questions);
        await _dbContext.SaveChangesAsync();
    }

    private async Task SeedTestOptionsAsync()
    {
        if (await _dbContext.TestOptions.AnyAsync())
            return;

        var questions = await _dbContext.TestQuestions.ToListAsync();
        if (questions.Count != QuestionTexts.Count) return;

        var allOptions = new List<TestOption>();
        var optionsList = new List<List<(string Text, SkinType SkinType)>>
        {
            new() { ("Стянутая, сухая.", SkinType.Dry), ("Чистая, без особых ощущений.", SkinType.Normal), ("Через пару часов появляется жирный блеск.", SkinType.Oily), ("В некоторых местах сухая, в других — жирная.", SkinType.Combination) },
            new() { ("Часто шелушится в холодную погоду.", SkinType.Dry), ("Практически не меняется.", SkinType.Normal), ("Быстро становится жирной в жару.", SkinType.Oily), ("Зимой сухая, летом жирная.", SkinType.Combination) },
            new() { ("Почти незаметные, суженные.", SkinType.Dry), ("Обычные, средних размеров.", SkinType.Normal), ("Расширенные, особенно в Т-зоне.", SkinType.Oily), ("Разные: на лбу и носу расширенные, на щеках узкие.", SkinType.Combination) },
            new() { ("Кожа снова становится сухой.", SkinType.Dry), ("Всё в порядке, дискомфорта нет.", SkinType.Normal), ("Появляется жирный блеск.", SkinType.Oily), ("Щёки комфортны, но лоб и нос начинают блестеть.", SkinType.Combination) },
            new() { ("Сухая и стянутая.", SkinType.Dry), ("Обычная, без особых изменений.", SkinType.Normal), ("Быстро становится жирной.", SkinType.Oily), ("В одних зонах сухая, в других жирная.", SkinType.Combination) },
            new() { ("Почти никогда.", SkinType.Dry), ("Иногда, перед менструацией или из-за стресса.", SkinType.Normal), ("Часто, особенно на лбу, носу и подбородке.", SkinType.Oily), ("Локально, в Т-зоне.", SkinType.Combination) },
            new() { ("Шелушится, местами сухая.", SkinType.Dry), ("Не меняется.", SkinType.Normal), ("Блестит, особенно в Т-зоне.", SkinType.Oily), ("Жирный блеск на лбу, но сухие щеки.", SkinType.Combination) },
            new() { ("Часто сушит, вызывает раздражение.", SkinType.Dry), ("Держится хорошо, без особых проблем.", SkinType.Normal), ("Через несколько часов появляется жирный блеск.", SkinType.Oily), ("В некоторых местах косметика скатывается, в других остаётся нормально.", SkinType.Combination) },
            new() { ("Да, часто.", SkinType.Dry), ("Редко.", SkinType.Normal), ("Почти никогда.", SkinType.Oily), ("Иногда, но не по всему лицу.", SkinType.Combination) },
            new() { ("Часто вызывает раздражение.", SkinType.Dry), ("Реакция бывает, но редко.", SkinType.Normal), ("Кожа становится жирной, поры засоряются.", SkinType.Oily ), ("В одних местах раздражение, в других — жирность.", SkinType.Combination) },
            new() { ("Тусклая, местами шелушится.", SkinType.Dry), ("Обычная, без выраженных проблем.", SkinType.Normal), ("Блестящая, особенно лоб, нос и подбородок.", SkinType.Oily), ("Разная: лоб блестит, щеки матовые или сухие.", SkinType.Combination) },
            new() { ("Шелушение, стянутость.", SkinType.Dry), ("Почти никаких.", SkinType.Normal), ("Жирный блеск, прыщи.", SkinType.Oily), ("Черные точки и жирность в Т-зоне, сухость на щеках.", SkinType.Combination) },
            new() { ("Не могу, кожа стягивается.", SkinType.Dry), ("Чувствую себя нормально.", SkinType.Normal), ("Через несколько часов кожа становится жирной.", SkinType.Oily), ("В одних местах комфортно, в других сухо.", SkinType.Combination) },
            new() { ("Сухая.", SkinType.Dry), ("Нормальная.", SkinType.Normal), ("Жирная.", SkinType.Oily), ("Комбинированная.", SkinType.Combination) },
            new() { ("Легко обгорает.", SkinType.Dry), ("Загар ложится ровно.", SkinType.Normal), ("Плохо загорает, часто появляются высыпания.", SkinType.Oily), ("Лицо обгорает неравномерно.", SkinType.Combination) },
            new() { ("Один раз в день достаточно.", SkinType.Dry), ("Дважды в день комфортно.", SkinType.Normal), ("Часто хочется умыться, кожа быстро жирнеет.", SkinType.Oily), ("В Т-зоне часто, щеки комфортны весь день.", SkinType.Combination) },
            new() { ("Быстро сохнет, появляются шелушения.", SkinType.Dry), ("Чувствует себя нормально.", SkinType.Normal), ("Начинает жирнеть.", SkinType.Oily), ("В одних местах сохнет, в других жирнеет.", SkinType.Combination) },
            new() { ("Почти никогда.", SkinType.Dry), ("Редко.", SkinType.Normal), ("Часто.", SkinType.Oily), ("В основном в Т-зоне.", SkinType.Combination) },
            new() { ("Диета с минимальным количеством жиров.", SkinType.Dry), ("Сбалансированное питание.", SkinType.Normal), ("Много жирной, сладкой пищи.", SkinType.Oily), ("Разное, без особых предпочтений.", SkinType.Combination) },
            new() { ("Никогда.", SkinType.Dry), ("Иногда.", SkinType.Normal), ("Каждый день.", SkinType.Oily), ("Только в Т-зоне.", SkinType.Combination) },
        };

        for (int i = 0; i < QuestionTexts.Count; i++)
        {
            var questionText = QuestionTexts[i];
            var question = questions.FirstOrDefault(q => q.Text == questionText);
            if (question == null) continue;
            foreach (var (text, skinType) in optionsList[i])
            {
                allOptions.Add(new TestOption
                {
                    Text = text,
                    SkinType = skinType,
                    QuestionId = question.Id
                });
            }
        }
        await _dbContext.TestOptions.AddRangeAsync(allOptions);
        await _dbContext.SaveChangesAsync();
    }

    private List<SkincareIngredient> GetRandomIngredients(List<SkincareIngredient> ingredients, int count)
    {
        var random = new Random();
        return ingredients.OrderBy(_ => random.Next()).Take(count).ToList();
    }
}
