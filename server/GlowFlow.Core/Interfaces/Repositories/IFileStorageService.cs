using System.IO;
using System.Threading.Tasks;

namespace GlowFlow.Core.Interfaces.Repositories;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType);
    Task DeleteFileAsync(string fileName);
}