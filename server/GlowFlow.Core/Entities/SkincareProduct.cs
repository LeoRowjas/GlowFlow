using GlowFlow.Core.Entities.Base;
using GlowFlow.Core.Enums;

namespace GlowFlow.Core.Entities;

public class SkincareProduct : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<SkinType> SuitableSkinTypes { get; set; } = [];
    public List<SkincareIngredient> Ingredients { get; set; } = [];
}