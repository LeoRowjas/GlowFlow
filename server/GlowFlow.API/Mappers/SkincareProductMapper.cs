using GlowFlow.Core.Entities;
using GlowFlow.DTO;

namespace GlowFlow.Mappers;

public static class SkincareProductMapper
{
    public static SkincareProductDto ToDto(SkincareProduct product)
    {
        return new SkincareProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            ImageLink = product.ImageLink,
            SuitableSkinTypes = product.SuitableSkinTypes.Select(st => (int)st).ToList(),
            Ingredients = product.Ingredients.Select(i => i.Id).ToList()
        };
    }
}