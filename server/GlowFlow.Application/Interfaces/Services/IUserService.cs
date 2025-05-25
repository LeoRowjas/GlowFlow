using GlowFlow.Core.Entities;
using GlowFlow.Core.Enums;
using GlowFlow.Core.Interfaces.Base;

namespace GlowFlow.Application.Interfaces.Services;

public interface IUserService : IService<User>
{
    Task<User> GetByEmailAsync(string email);
    Task<User> UpdateSkinTypeAsync(Guid id, SkinType skinType);
    Task<string> UploadAvatarAsync(Guid id, Stream stream, string fileName, string contentType);
    Task DeleteAvatarAsync(string filename);
}