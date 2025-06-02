using GlowFlow.Core.Enums;

namespace GlowFlow.Application.DTO.FromEntities;

public class UpdateUserDto
{
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
}