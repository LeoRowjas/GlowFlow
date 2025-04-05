using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;
using GlowFlow.Core.Interfaces.Repositories;
using GlowFlow.Core.Interfaces.Services;

namespace GlowFlow.Application.Services;

public class UserService(IUserRepository repository) : IUserService
{
    private readonly IUserRepository _repository = repository;
    
    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<User> AddAsync(User entity)
    {
        return await _repository.AddAsync(entity);
    }

    public async Task<User> UpdateAsync(User entity)
    {
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return await _repository.GetByEmailAsync(email);
    }

    public async Task<User> UpdateSkinTypeAsync(Guid id, SkinType skinType)
    {
        return await _repository.UpdateSkinTypeAsync(id, skinType);
    }
}