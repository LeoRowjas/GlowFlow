using GlowFlow.Application.DTO.FromEntities;
using GlowFlow.Core.Entities;

namespace GlowFlow.Mappers;

public static class SkincareProductMapper
{
    public static SkincareProductDto ToDto(SkincareProduct product)
    {
        return new SkincareProductDto
        { 
            Name = product.Name,
            Description = product.Description,
            ImageLink = product.ImageLink,
            SuitableSkinTypes = product.SuitableSkinTypes,
            Ingredients = product.Ingredients.Select(i => i.Id).ToList()
        };
    }
    
    public static SkincareProduct ToEntity(SkincareProductDto dto)
    {
        return new SkincareProduct
        {
            Name = dto.Name,
            Description = dto.Description,
            ImageLink = dto.ImageLink,
            SuitableSkinTypes = dto.SuitableSkinTypes.Select(st => (Core.Enums.SkinType)st).ToList(),
            Ingredients = dto.Ingredients.Select(i => new SkincareIngredient() { Id = i }).ToList()
        };
    }
    
    public static void UpdateFromDto(this SkincareProduct entity, SkincareProductDto dto)
    {
        entity.Name = dto.Name;
        entity.Description = dto.Description;
        entity.ImageLink = dto.ImageLink;
        entity.SuitableSkinTypes = dto.SuitableSkinTypes;
    }
}