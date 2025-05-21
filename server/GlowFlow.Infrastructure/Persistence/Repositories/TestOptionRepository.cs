using GlowFlow.Core.Entities;
using GlowFlow.Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

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
        return await _dbContext.TestOptions.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id) ?? throw new Exception();
        //TODO: что-то придумать с этой хуйней ненадежной
    }
}