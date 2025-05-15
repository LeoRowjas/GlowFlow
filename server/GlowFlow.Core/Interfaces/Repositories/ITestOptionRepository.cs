using GlowFlow.Core.Entities;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface ITestOptionRepository
{
    Task<TestOption> GetByIdAsync(Guid id);
}