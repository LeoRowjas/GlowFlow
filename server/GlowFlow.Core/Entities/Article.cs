using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Core.Entities;

[Index(nameof(Name))]
public class Article : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string PreviewContent { get; set; } = string.Empty;
    [Required] 
    public string Link { get; set; } = string.Empty;
    public DateTime PublishDateTime { get; set; }
}