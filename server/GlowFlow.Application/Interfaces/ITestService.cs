using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;

namespace GlowFlow.Application.Interfaces;

public interface ITestService
{
    Task<List<TestQuestion>> GetTestQuestionsAsync();
    Task<SkinType> GetSkinTypeFromAnswersAsync(List<Guid> answers);
    Task<UserDto> UpdateUserSkinType(Guid userId, SkinType skinType);
}