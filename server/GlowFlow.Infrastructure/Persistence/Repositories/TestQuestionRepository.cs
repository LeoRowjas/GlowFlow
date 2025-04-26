using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class TestQuestionRepository : ITestQuestionRepository
{
    private readonly GlowFlowDbContext _dbContext;

    public TestQuestionRepository(GlowFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<TestQuestion>> GetAllQuestionsWithOptionsAsync()
    {
        return await _dbContext.TestQuestions
            .Include(q => q.Options)
            .AsNoTracking()
            .ToListAsync();
    }
}