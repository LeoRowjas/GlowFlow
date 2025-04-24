using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Application.Interfaces;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Application.Services;

public class TestService : ITestService
{
    private readonly ITestOptionRepository _optionRepository;
    private readonly ITestQuestionRepository _questionRepository;
    private readonly IUserRepository _userRepository;

    public TestService(ITestOptionRepository optionRepository, 
        ITestQuestionRepository questionRepository, IUserRepository userRepository)
    {
        _optionRepository = optionRepository;
        _questionRepository = questionRepository;
        _userRepository = userRepository;
    }
    
    public Task<List<TestQuestion>> GetTestQuestionsAsync()
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

    public async Task<UserDto> UpdateUserSkinType(Guid userId, SkinType skinType)
    {
        //TODO: может вылететь ошибка внутри метода, решить вопрос с эксепшнами
        var user = await _userRepository.UpdateSkinTypeAsync(userId, skinType);
        
        var dto = new UserDto()
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Age = user.Age,
            SkinType = skinType
        };
        
        return dto;
    }
}