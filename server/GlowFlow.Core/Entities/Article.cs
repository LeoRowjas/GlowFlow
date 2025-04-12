using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Core.Entities;

[Index(nameof(Name))]
public class Article : BaseEntity
{
    public string Name { get; set; }
    public string PreviewContent { get; set; }
    [Required]
    public string Link { get; set; }
    public DateTime PublishDateTime { get; set; }
}