using GlowFlow.Core.Entities.Base;
using GlowFlow.Core.Enums;

namespace GlowFlow.Core.Entities;

public class SkincareProduct : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<SkinType> SuitableSkinTypes { get; set; } = new();
    public List<SkincareIngredient> Ingredients { get; set; } = new();
}