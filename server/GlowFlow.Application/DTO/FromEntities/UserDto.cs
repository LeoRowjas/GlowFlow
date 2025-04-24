using GlowFlow.Core.Enums;

namespace GlowFlow.Application.DTO.FromEntities;

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Age { get; set; }
    public SkinType SkinType { get; set; }
}