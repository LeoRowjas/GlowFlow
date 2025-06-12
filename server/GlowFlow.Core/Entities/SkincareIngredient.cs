using System.ComponentModel.DataAnnotations;
using GlowFlow.Core.Entities.Base;

namespace GlowFlow.Core.Entities;

public class SkincareIngredient : BaseEntity
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public string Effect { get; set; } = string.Empty;
    public List<SkincareProduct> Products { get; set; } = new();
}