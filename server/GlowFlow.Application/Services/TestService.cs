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
        var skinTypeCounts = new Dictionary<SkinType, int>();

        foreach (var id in answers)
        {
            var option = await _optionRepository.GetByIdAsync(id);
            if (!skinTypeCounts.TryAdd(option.SkinType, 1))
            {
                skinTypeCounts[option.SkinType]++;
            }
        }

        return skinTypeCounts.OrderByDescending(kv => kv.Value).First().Key;
    }
}