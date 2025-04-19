using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;

namespace GlowFlow.Core.Interfaces.Services;

public interface ITestService
{
    Task<List<TestQuestion>> GetTestQuestionAsync();
    Task<SkinType> CalculateSkinTypeAsync();
}