using System.ComponentModel.DataAnnotations;

namespace GlowFlow.DTO;

public class UploadAvatarRequest
{
    [Required]
    public IFormFile File { get; set; } = null!;
}