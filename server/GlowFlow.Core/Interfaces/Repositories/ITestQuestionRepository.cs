using System.Collections.Generic;
using System.Threading.Tasks;
using GlowFlow.Core.Entities;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface ITestQuestionRepository
{
    Task<List<TestQuestion>> GetAllQuestionsWithOptionsAsync();
}