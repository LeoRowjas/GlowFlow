using System.ComponentModel.DataAnnotations;

namespace GlowFlow.Requests;

public class UploadAvatarRequest
{
    [Required]
    public IFormFile File { get; set; } 
}