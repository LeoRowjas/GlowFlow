using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Infrastructure.Persistence.Repositories;

public class TestOptionRepository : ITestOptionRepository
{
    private readonly GlowFlowDbContext _dbContext;

    public TestOptionRepository(GlowFlowDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<TestOption> GetByIdAsync(Guid id)
    {
        return await _dbContext.TestOptions.FindAsync(id) ?? throw new Exception();
        //TODO: что-то придумать с этой хуйней ненадежной
    }
}