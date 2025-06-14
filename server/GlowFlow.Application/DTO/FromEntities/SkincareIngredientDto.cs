using System.ComponentModel.DataAnnotations;

namespace GlowFlow.Application.DTO.FromEntities;

public class SkincareIngredientDto
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
    [Required]
    [MaxLength(255)]
    public string Effect { get; set; } = string.Empty;
}