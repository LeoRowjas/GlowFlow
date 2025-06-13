using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Core.Entities;

namespace GlowFlow.Mappers;

public static class SkincareIngredientMapper
{
    public static SkincareIngredientDto ToDto(SkincareIngredient ingredient)
    {
        return new SkincareIngredientDto
        {
            Name = ingredient.Name,
            Effect = ingredient.Effect
        };
    }

    public static SkincareIngredient ToEntity(SkincareIngredientDto dto)
    {
        return new SkincareIngredient
        {
            Name = dto.Name,
            Effect = dto.Effect
        };
    }
    
    public static void UpdateFromDto(this SkincareIngredient entity, SkincareIngredientDto dto)
    {
        entity.Name = dto.Name;
        entity.Effect = dto.Effect;
    }
}