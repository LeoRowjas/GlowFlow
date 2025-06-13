using GlowFlow.Application.Interfaces;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Application.Services;

public class TestService : ITestService
{
    private readonly ITestOptionRepository _optionRepository;
    private readonly ITestQuestionRepository _questionRepository;

    public TestService(ITestOptionRepository optionRepository, 
        ITestQuestionRepository questionRepository)
    {
        _optionRepository = optionRepository;
        _questionRepository = questionRepository;
    }
    
    public Task<List<TestQuestion>> GetTestQuestionsWithOptionsAsync()
    {
        return _questionRepository.GetAllQuestionsWithOptionsAsync();
    }

    public async Task<SkinType> GetSkinTypeFromAnswersAsync(List<Guid> answers)
    {
        const int EXPECTED_ANSWERS = 20;
    
        if (answers == null || answers.Count == 0)
            throw new ArgumentException("Список ответов не может быть пустым");

        if (answers.Count != EXPECTED_ANSWERS)
            throw new ArgumentException($"Ожидается ровно {EXPECTED_ANSWERS} ответов, получено: {answers.Count}");

        var skinTypeCounts = new Dictionary<SkinType, int>();

        foreach (var optionId in answers)
        {
            var option = await _optionRepository.GetByIdAsync(optionId);
            if (option == null)
                throw new ArgumentException($"Опция с ID {optionId} не найдена");

            skinTypeCounts[option.SkinType] = skinTypeCounts.GetValueOrDefault(option.SkinType, 0) + 1;
        }

        if (skinTypeCounts.Count == 0)
            throw new InvalidOperationException("Не удалось обработать ответы");
        
        return skinTypeCounts
            .OrderByDescending(kv => kv.Value)
            .ThenBy(kv => kv.Key) 
            .First()
            .Key;
    }
}