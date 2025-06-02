using System;
using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;
using Microsoft.EntityFrameworkCore;

namespace GlowFlow.Core.Entities;

[Index(nameof(Name))]
public class Article : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string PreviewContent { get; set; } = string.Empty;
    [Required] 
    public string Link { get; set; } = string.Empty;
    public DateTime PublishDateTime { get; set; }
    [Required]
    public string ImageLink { get; set; } = string.Empty;
}