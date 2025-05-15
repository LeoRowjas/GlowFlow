using GlowFlow.Core.Entities.Base;

namespace GlowFlow.Core.Entities;

public class SkincareIngredient : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Effect { get; set; } = string.Empty;
}