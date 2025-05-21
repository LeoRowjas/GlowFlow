using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;

namespace GlowFlow.Application.Interfaces;

public interface ITestService
{
    Task<List<TestQuestion>> GetTestQuestionsWithOptionsAsync();
    Task<SkinType> GetSkinTypeFromAnswersAsync(List<Guid> answers);
}