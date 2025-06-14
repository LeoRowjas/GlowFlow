using GlowFlow.Core.Enums;

namespace GlowFlow.Application.DTO.FromEntities;

public class SkincareProductDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageLink { get; set; } = string.Empty;
    public List<SkinType> SuitableSkinTypes { get; set; } = new();
    public List<Guid> Ingredients { get; set; } = new();
}