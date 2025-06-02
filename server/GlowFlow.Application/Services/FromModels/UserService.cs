using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Application.Exceptions;
using GlowFlow.Application.Interfaces.Services;
using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;
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
        var user = await _repository.GetByIdAsync(id);
        if (user == null) 
            throw new NotFoundException("Пользователь не найден");
        return user;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<User> AddAsync(User entity)
    {
        return await _repository.AddAsync(entity);
    }

    Task<User> IService<User>.UpdateAsync(User entity)
    {
        throw new NotImplementedException();
    }

    public async Task<User> UpdateAsync(Guid id, UpdateUserDto entity)
    {
        var user = await GetByIdAsync(id);
        if (user == null)
            throw new NotFoundException("Пользователь не найден");

        if (entity.Age is < 0 or > 100)
            throw new ValidationException("Некорректный возраст");
        if (!entity.Email.Contains('@'))
            throw new ValidationException("Некорректный email");
        if (string.IsNullOrWhiteSpace(entity.Name))
            throw new ValidationException("Некорректное имя");
        
        user.Age = entity.Age;
        user.Email = entity.Email;
        user.Name = entity.Name;
        
        return await _repository.UpdateAsync(user);
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
        var user = await GetByIdAsync(id);
        var url = await _fileStorageService.UploadFileAsync(stream, fileName, contentType);
        user!.AvatarUrl = url;
        
        return url;
    }

    public async Task DeleteAvatarAsync(Guid id, string fileName)
    {
        var user = await GetByIdAsync(id);
        if (user == null) throw new NotFoundException("Пользователь не найден");
        user.AvatarUrl = string.Empty;
        await _fileStorageService.DeleteFileAsync(fileName);
    }
}