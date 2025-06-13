using System.ComponentModel.DataAnnotations;

namespace GlowFlow.Requests;

public class CreateArticleRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [StringLength(255)]
    public string PreviewContent { get; set; } = string.Empty;
    
    [Required]
    [Url]
    public string Link { get; set; } = string.Empty;
    
    [Required]
    public DateTime PublishDateTime { get; set; }
    
    [Required]
    [FileExtensions(Extensions = "jpg,jpeg,png", ErrorMessage = "Please upload a valid image file.")]
    public string ImageLink { get; set; } = string.Empty;
}