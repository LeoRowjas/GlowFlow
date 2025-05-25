using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Repositories;

namespace GlowFlow.Application.Services.FromModels;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IFileStorageService _fileStorageService;

    public UserService(IUserRepository repository, IFileStorageService fileService)
    {
        _repository = repository;
        _fileStorageService = fileService;
    }

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
        var user = await GetByIdAsync(id);
        await _fileStorageService.DeleteFileAsync(user.AvatarUrl);
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

    public async Task<string> UploadAvatarAsync(Guid id, Stream stream, string fileName, string contentType)
    {
        var user = await _repository.GetByIdAsync(id);
        var url = await _fileStorageService.UploadFileAsync(stream, fileName, contentType);
        user.AvatarUrl = url;
        
        return url;
    }

    public async Task DeleteAvatarAsync(string fileName)
    {
        await _fileStorageService.DeleteFileAsync(fileName);
    }
}